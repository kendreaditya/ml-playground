import sqlite3


class Database:
    def __init__(self, table_name="models"):
        self.conn = sqlite3.connect(":memory:", check_same_thread=False)
        self.db = self.conn.cursor()
        self.table_name = table_name

        self.db.execute(f"""CREATE TABLE {self.table_name} (
                id integer primary key,
                model_type text,
                model_path text,
                x_train text,
                y_train text,
                x_test text,
                y_test text
            )""")

    def insert(self, row):
        self.db.execute(
            f"""INSERT INTO {self.table_name} VALUES ({repr(row["id"])}, {repr(row["model_type"])}, {repr(row["model_path"])}, '{str(row["x_train"])}', '{str(row["y_train"])}', '{str(row["x_test"])}', '{str(row["y_train"])}')""")
        self.conn.commit()
        return self.db.lastrowid

    def retrieve(self, key):
        self.db.execute(
            f"SELECT * FROM {self.table_name} WHERE id={repr(key)}")
        return self.db.fetchone()


if __name__ == "__main__":
    database = Database()
    row = {"id": 1234567890,
           "model_type": "svm",
           "model_path": "./data.pt",
           "x_train": [[-1, -1], [-2, -1], [1, 1], [2, 1]],
           "y_train": [0.0, 0.0, 1.0, 1.0],
           "x_test": [[-1, -1], [-2, -1], [1, 1], [2, 1]],
           "y_test": [0.0, 0.0, 1.0, 1.0]}
    id = database.insert(row)
    print("id:", id)
    result = database.retrieve(id)
    print("row", result)
