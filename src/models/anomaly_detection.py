import pandas as pd
from sklearn.ensemble import IsolationForest
import joblib
import os

# -----------------------------
# Step 1 — Load processed dataset
# -----------------------------
df = pd.read_csv("data/processed/security_features.csv")

print("Dataset loaded successfully")
print(df.head())

# -----------------------------
# Step 2 — Select features for anomaly detection
# -----------------------------
features = df[[
    "external_ip",
    "s3_event",
    "iam_event",
    "suspicious_event"
]]

print("\nFeatures selected for anomaly detection:")
print(features.head())

# -----------------------------
# Step 3 — Train Isolation Forest Model
# -----------------------------
model = IsolationForest(
    contamination=0.05,   # Assume 5% anomalies
    random_state=42
)

model.fit(features)

print("\nIsolation Forest model trained successfully")

# -----------------------------
# Step 4 — Predict anomalies
# -----------------------------
df["anomaly"] = model.predict(features)

# Convert predictions
# -1 = anomaly
# 1 = normal

df["anomaly"] = df["anomaly"].apply(lambda x: 1 if x == -1 else 0)

print("\nAnomaly detection results:")
print(df["anomaly"].value_counts())

# -----------------------------
# Step 5 — Save anomaly results
# -----------------------------
os.makedirs("data/results", exist_ok=True)

df.to_csv("data/results/anomaly_results.csv", index=False)

print("\nAnomaly results saved to:")
print("data/results/anomaly_results.csv")

# -----------------------------
# Step 6 — Save trained model
# -----------------------------
os.makedirs("models", exist_ok=True)

joblib.dump(model, "models/anomaly_model.pkl")

print("\nModel saved successfully:")
print("models/anomaly_model.pkl")
