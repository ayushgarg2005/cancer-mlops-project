# 🧠 Breast Cancer Prediction (MLOps Project)

## 📌 Overview

This project predicts whether a tumor is **malignant (cancerous)** or **benign (non-cancerous)** using the **WDBC (Breast Cancer Wisconsin Diagnostic) dataset**.

It demonstrates a complete **MLOps pipeline**, including:

* Model training
* API deployment
* Containerization using Docker

---

## 🚀 Features

* 📊 Machine Learning model (Logistic Regression)
* ⚙️ Data preprocessing & scaling
* 🚀 FastAPI for real-time predictions
* 🐳 Docker for containerized deployment
* 📄 Interactive API testing using Swagger UI
* 🎨 Beautiful HTML/Vanilla JS Frontend UI for end-users
* 🔄 CI pipeline automated via GitHub Actions

---

## 🏗️ Project Structure

```
project/
│
├── .github/workflows/  # CI pipeline config (ci.yml)
│
├── data/
│   └── data.csv
│
├── frontend/           # Modern web interface
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── model/              # Auto-created after training
│   ├── model.pkl
│   └── scaler.pkl
│
├── train.py            # Model training script
├── app.py              # FastAPI app
├── requirements.txt
├── Dockerfile
└── README.md
```

---

## ▶️ How to Run (Local Setup)

### 1️⃣ Install Dependencies

```
pip install -r requirements.txt
```

### 2️⃣ Train the Model

```
python train.py
```

👉 This will:

* Train the model
* Save `model.pkl` and `scaler.pkl` inside `model/`

---

### 3️⃣ Run the API Server

```
uvicorn app:app --reload
```

---

### 4️⃣ Open Swagger UI

👉 Visit:

```
http://127.0.0.1:8000/docs
```

---

### 5️⃣ Test Prediction

Use this sample input:

```json
{
  "data": [
    17.99,10.38,122.8,1001,0.1184,0.2776,0.3001,0.1471,0.2419,
    0.07871,1.095,0.9053,8.589,153.4,0.006399,0.04904,
    0.05373,0.01587,0.03003,0.006193,25.38,17.33,184.6,
    2019,0.1622,0.6656,0.7119,0.2654,0.4601,0.1189
  ]
}
```

---

### 6️⃣ Use the Web UI (Recommended)

Instead of manually entering 30 features into Swagger UI, you can use the beautiful graphical interface! 
While your API is running natively or in Docker (listening on port 8000), simply open the `frontend/index.html` file in your favorite web browser (Chrome, Edge, etc.).

---

## 🐳 Run Using Docker (Full Automation)

### 1️⃣ Build Docker Image

```
docker build -t cancer-app .
```

### 2️⃣ Run Container

```
docker run -p 8000:8000 cancer-app
```

👉 Then open:

```
http://localhost:8000/docs
```

---

## ⚠️ Important Notes

* The model requires **exactly 30 input features**
* If running without Docker, you must run `train.py` first
* In Docker setup, model training is automated

---

## 🧠 Tech Stack

* Python
* Scikit-learn
* FastAPI
* Docker

---

## 🎯 MLOps Concepts Used

* Model training pipeline
* API deployment
* Containerization
* Reproducibility

---

## 🎤 Viva Explanation (Short)

> This project demonstrates an MLOps pipeline where a machine learning model is trained on the WDBC dataset and deployed using FastAPI. The application is containerized using Docker, enabling consistent and portable deployment.

---

## 🚀 Future Improvements
* Add model monitoring
* Deploy on cloud (Render / AWS)

---

## 👨‍💻 Author

Ayush Garg
