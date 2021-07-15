import { List } from "@material-ui/core"
import { range } from "d3"

export const BASE_URL = "127.0.0.1:8000"
export const colors = ["#729EFD", "#E9796F", "#647FC7", "#A95F56"]
export const models = {
        "types": ["Suport Vector Machine (SVM)", "Multilayer Perceptron (MLP)", "Logistic Regression", "K-Nearest Neighbors (KNN)", "Decision Tree"],
        "params": {
            "Suport Vector Machine (SVM)": {
                "param": "svm",
                "params": {
                    "Learning Rate": {"option": [0.1, 0.01, 0.001, 0.0001, 0.00001], "param": "learning_rate"},
                    "Epochs": {"option": [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], "param": "epoch"},
                    "Batch Size": {"option": [8, 16, 32, 64, 128], "param": "batch_size"},
                    "Optimizer": {"option": ["adam", "SGD"], "param": "optimizer"},
                }
            },
            "Multilayer Perceptron (MLP)": {
                "param": "mlp",
                "params": {
                    "Learning Rate": {"option": [0.1, 0.01, 0.001, 0.0001, 0.00001], "param": "learning_rate"},
                    "Epochs": {"option": [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], "param": "epoch"},
                    "Batch Size": {"option": [8, 16, 32, 64, 128], "param": "batch_size"},
                    "Optimizer": {"option": ["adam", "SGD"], "param": "optimizer"},
                }
            },
            "Logistic Regression": {
                "param": "logistic-regression",
                "params": {
                    "Learning Rate": {"option": [0.1, 0.01, 0.001, 0.0001, 0.00001], "param": "learning_rate"},
                    "Epochs": {"option": [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], "param": "epoch"},
                    "Batch Size": {"option": [8, 16, 32, 64, 128], "param": "batch_size"},
                    "Optimizer": {"option": ["adam", "SGD"], "param": "optimizer"},
                }
            },
            "K-Nearest Neighbors (KNN)": {
                "param": "knn",
                "params": {
                    "Number of Neighbors": {"option": Array.from({length: 20}, (_, i) => i+1), "param": "n_neighbors"}
                }
            },
            "Decision Tree": {
                "param": "decision-tree",
                "params": {
                }
            }}
    }