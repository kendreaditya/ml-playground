from time import sleep, time
from ast import literal_eval as eval
import model_types as model_types
import torch
import numpy as np
from pydantic import BaseModel
from fastapi import FastAPI, WebSocket
from database import Database
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Model(BaseModel):
    model_type: str
    x_train: list
    y_train: list
    x_test: list
    y_test: list
    params: dict


models = {"svm": model_types.svm, "mlp": model_types.mlp, "knn": model_types.knn, "decision-tree": model_types.decision_tree,
          "logistic-regression": model_types.logistic_regression, "naive-bayes": model_types.naive_bayes}

db = Database()


@app.post("/model/create")
def create_model(request: Model):
    model = models[request.model_type]
    model = model(**request.params)
    model_dir = f"./models/{model.name}.pt"

    torch.save(model, model_dir)

    row = {"id": model.name,
           "model_type": request.model_type,
           "model_path": model_dir,
           "x_train": request.x_train,
           "y_train": request.y_train,
           "x_test": request.x_test,
           "y_test": request.y_test
           }

    db.insert(row)
    return model.name


@app.websocket("/model/train/{model_id}")
async def train_model(websocket: WebSocket, model_id: str):
    await websocket.accept()

    (_, model_type, model_dir, x_train, y_train,
     x_test, y_test) = db.retrieve(model_id)

    model = torch.load(model_dir)
    x_train = torch.tensor(eval(x_train)).float()
    y_train = torch.tensor(eval(y_train))
    x_test = torch.tensor(eval(x_test)).float()
    y_test = torch.tensor(eval(y_test))

    for loss in model.train(x_train, y_train) or []:
        heatmap = model.heatmap()
        tsne = model.tsne(x_train)
        y_pred = model.predict(x_test)
        accuracy = model.accuracy(y_pred, y_test)
        await websocket.send_json({"loss": loss,
                                   "heatmap": heatmap,
                                   "tsne": tsne,
                                   "accuracy": accuracy
                                   })

    # Deletes model + row in database to save memory
    db.delete(model_id)

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app)
