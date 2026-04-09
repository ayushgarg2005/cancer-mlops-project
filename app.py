from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputData(BaseModel):
    data: list

model = joblib.load("model/model.pkl")
scaler = joblib.load("model/scaler.pkl")

@app.post("/predict")
def predict(input_data: InputData):
    data = np.array(input_data.data).reshape(1, -1)
    data = scaler.transform(data)
    prediction = model.predict(data)[0]

    result = "Benign (Safe)" if prediction == 1 else "Malignant (Cancer)"

    return {
        "prediction": int(prediction),
        "result": result
    }