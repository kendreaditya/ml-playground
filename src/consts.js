export const BASE_URL = "127.0.0.1:8000"
export const colors = ["#729EFD", "#E9796F"]
export const models = {
        "types": ["Suport Vector Machine (SVM)", "Multilayer Perceptron (MLP)", "Logistic Regression", "K-Nearest Neighbors (KNN)", "Decision Tree"],
        "params": {
            "Suport Vector Machine (SVM)": {
                "param": "svm",
                "params": {
                    "Learning Rate": {"option": {"min": 0, "max": 1}, "param": "learning_rate"},
                    "Epochs": {"option": {"min": 0, "max": 100}, "parm": "epoch"},
                    "Batch Size": {"option": [8, 16, 32, 64, 128], "parm": "batch_size"},
                    "Optimizer": {"option": ["Adam", "SGD"], "parm": "optimizer"},
                }
            },
            "Multilayer Perceptron (MLP)": {
                "param": "mlp",
                "params": {
                    "Learning Rate": {"option": {"min": 0, "max": 1}, "param": "learning_rate"},
                    "Epochs": {"option": {"min": 0, "max": 100}, "parm": "epoch"},
                    "Batch Size": {"option": [8, 16, 32, 64, 128], "parm": "batch_size"},
                    "Optimizer": {"option": ["Adam", "SGD"], "parm": "optimizer"},
                }
            },
            "Logistic Regression": {
                "param": "logistic-regression",
                "params": {
                    "Learning Rate": {"option": {"min": 0, "max": 1}, "param": "learning_rate"},
                    "Epochs": {"option": {"min": 0, "max": 100}, "parm": "epoch"},
                    "Batch Size": {"option": [8, 16, 32, 64, 128], "parm": "batch_size"},
                    "Optimizer": {"option": ["Adam", "SGD"], "parm": "optimizer"},
                }
            },
            "K-Nearest Neighbors (KNN)": {
                "param": "knn",
                "params": {
                    "Number of Neighbors": {"option": {"min": 1, "max": 50}, "parm": "n_neibhbors"}
                }
            },
            "Decision Tree": {
                "param": "decision-tree",
                "params": {
                }
            }}
    }