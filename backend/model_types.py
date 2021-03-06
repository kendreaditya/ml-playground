from sqlite3.dbapi2 import connect
import numpy as np
import torch
import torch.nn as nn
from sklearn import tree, neighbors, manifold, metrics
import time


optimizer_function = {"SGD": torch.optim.SGD, "adam": torch.optim.Adam}


class BaseModel():
    def __init__(self):
        super().__init__()
        self.name = int(time.time())

    def accuracy(self, y_true, y_pred):
        # https://scikit-learn.org/stable/modules/generated/sklearn.metrics.accuracy_score.html
        return metrics.accuracy_score(y_true, y_pred)

    def heatmap(self, x_lim=(-5, 5), y_lim=(5, -5), resolution=320):
        self.model.eval()

        with torch.no_grad():
            x = np.linspace(x_lim[0], x_lim[1], resolution)
            y = np.linspace(y_lim[0], y_lim[1], resolution)
            xy = np.array(np.meshgrid(x, y))

            z = []

            # for x_i in x:
            #     for y_i in y:
            #         z_i = self.forward(torch.tensor([[x_i, y_i]]).float())
            #         z_i = torch.sigmoid(z_i).tolist()[0][0]
            #         z.append(z_i)

            for i in range(resolution):
                x_batch = torch.from_numpy(xy[:, i, 0:].T).float()
                y_batch = self.forward(x_batch)
                y_batch = torch.sigmoid(y_batch).flatten().tolist()
                z.append(y_batch)

        self.model.train()
        return z

    def tsne(self, x_train):
        self.model.eval()

        with torch.no_grad():
            x_raw = self.forward(x_train)
            if isinstance(x_raw, torch.Tensor):
                x_raw = x_raw.detach().numpy()
            xy_tsne = manifold.TSNE(
                n_components=2, random_state=100).fit_transform(x_raw)

        self.model.train()
        return xy_tsne.tolist()


class mlp(BaseModel, torch.nn.Module):
    def __init__(self, learning_rate=0.001, epoch=10, batch_size=32, optimizer="adam"):
        super().__init__()
        self.model = nn.Linear(2, 1)
        self.learning_rate = learning_rate
        self.epoch = epoch
        self.batch_size = batch_size

        self.optimizer = optimizer_function[optimizer](
            self.model.parameters(), lr=self.learning_rate)

    def train(self, X, y):
        criterion = torch.nn.BCELoss()
        dataset = torch.utils.data.TensorDataset(X, y)
        dataloader = torch.utils.data.DataLoader(
            dataset, batch_size=self.batch_size)

        self.model.train()
        for e in range(self.epoch):
            for x_batch, y_batch in dataloader:
                self.optimizer.zero_grad()
                # Why do I have to flatten here
                output = self.forward(x_batch).flatten()
                loss = criterion(output, y_batch.float())
                loss.backward()  # Backpropagation
                self.optimizer.step()  # Optimize and adjust weights

                yield loss.item()

    def forward(self, x):
        return torch.sigmoid(self.model(x))

    def predict(self, x):
        x = self.model(x)
        x = torch.sigmoid(x)
        x = [0 if x_i < 0.5 else 1 for x_i in x]
        return x


class svm(BaseModel, torch.nn.Module):
    # https://github.com/kazuto1011/svm-pytorch/blob/master/main.py

    def __init__(self, learning_rate=0.01, epoch=10, batch_size=32, optimizer="adam"):
        super().__init__()

        self.model = nn.Linear(2, 1)
        self.learning_rate = learning_rate
        self.epoch = epoch
        self.batch_size = batch_size

        self.optimizer = optimizer_function[optimizer](
            self.model.parameters(), lr=self.learning_rate)

    def train(self, X, Y):
        X = torch.tensor(X).float()
        Y = torch.tensor(Y).float()
        N = len(Y)

        optimizer = torch.optim.SGD(
            self.model.parameters(), lr=self.learning_rate)

        self.model.train()
        for epoch in range(self.epoch):
            perm = torch.randperm(N)

            for i in range(0, N, self.batch_size):
                x = X[perm[i: i + self.batch_size]]
                y = Y[perm[i: i + self.batch_size]]

                optimizer.zero_grad()
                output = self.model(x).squeeze()
                weight = self.model.weight.squeeze()

                loss = torch.mean(torch.clamp(1 - y * output, min=0))
                loss += (weight.t() @ weight) / 2.0

                loss.backward()
                optimizer.step()

                yield float(loss)

    def forward(self, x):
        x = self.model(x)
        return x

    def predict(self, x):
        x = self.model(x)
        x = torch.sigmoid(x)
        x = [0 if x_i < 0.5 else 1 for x_i in x]
        return x


class logistic_regression(BaseModel, torch.nn.Module):
    # https://github.com/AnupamMicrosoft/PyTorch-Classification/blob/master/LogisticsRegressionPyTorch.py
    def __init__(self, learning_rate=0.01, epoch=10, batch_size=32, optimizer="adam"):
        super().__init__()
        self.learning_rate = learning_rate
        self.epoch = epoch
        self.batch_size = batch_size
        self.optimizer = optimizer

        self.model = nn.Linear(2, 1)
        self.optimizer = optimizer_function[optimizer](
            self.model.parameters(), lr=self.learning_rate)

    def loss(self, outputs, labels):
        return torch.sum(torch.log(1 + torch.exp(-(outputs.t()*labels))))/(outputs.size()[0])

    def train(self, x, y):
        dataset = torch.utils.data.TensorDataset(x, y)
        train_loader = torch.utils.data.DataLoader(
            dataset, batch_size=self.batch_size)

        for e in range(self.epoch):
            for i, (inputs, labels) in enumerate(train_loader):
                # Reshape images to (batch_size, input_size)
                labels = torch.autograd.Variable(2*(labels.float()-0.5))

                outputs = self.forward(inputs)
                loss = self.loss(outputs, labels)

                # Backward and optimize
                self.optimizer.zero_grad()
                loss.backward()
                self.optimizer.step()

                yield loss.item()

    def forward(self, x):
        return self.model(x)

    def predict(self, x):
        x = self.model(x)
        x = torch.sigmoid(x)
        x = [0 if x_i < 0.5 else 1 for x_i in x]
        return x


class knn(BaseModel, torch.nn.Module):
    # https://scikit-learn.org/stable/auto_examples/neighbors/plot_classification.html
    def __init__(self, n_neighbors=2):
        super().__init__()
        self.clf = neighbors.KNeighborsClassifier(n_neighbors=n_neighbors)

    def train(self, x, y):
        self.clf.fit(x, y)

    def forward(self, x):
        x = self.clf.predict(x)
        return x

    def predict(self, x):
        return self.forward(x)


class decision_tree(BaseModel):
    # https://scikit-learn.org/stable/modules/tree.html#classification
    def __init__(self):
        super().__init__()
        self.clf = tree.DecisionTreeClassifier()

    def train(self, x, y):
        self.clf.fit(x, y)

    def forward(self, x):
        x = self.clf.predict(x)
        return x

    def predict(self, x):
        return self.forward(x)


class naive_bayes(BaseModel):
    def __init__(self) -> None:
        super().__init__()
        pass
