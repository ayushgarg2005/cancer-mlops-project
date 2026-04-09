import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
import joblib
import os

# Create model directory if not exists
os.makedirs("model", exist_ok=True)

# Load dataset
df = pd.read_csv("data/data.csv")

# Convert diagnosis column (M = 0, B = 1)
df['diagnosis'] = df['diagnosis'].map({'M': 0, 'B': 1})

# Drop unnecessary columns
df = df.drop(['id', 'Unnamed: 32'], axis=1)

# Split features & target
X = df.drop('diagnosis', axis=1)
y = df['diagnosis']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scaling
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Train model
model = LogisticRegression()
model.fit(X_train, y_train)

# Accuracy
accuracy = model.score(X_test, y_test)
print(f"✅ Model Accuracy: {accuracy:.4f}")

# Save model & scaler
joblib.dump(model, "model/model.pkl")
joblib.dump(scaler, "model/scaler.pkl")

print("✅ Model and scaler saved successfully!")