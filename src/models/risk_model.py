import pandas as pd
import xgboost as xgb
import joblib

# load processed feature dataset
df = pd.read_csv("data/processed/security_features.csv")

print("Dataset loaded")
print(df.head())

df["risk_label"] = (
    df["external_ip"] +
    df["s3_event"] +
    df["iam_event"] +
    df["suspicious_event"]
)

df["risk_label"] = df["risk_label"].apply(lambda x: 1 if x > 1 else 0)

X = df[[
    "external_ip",
    "s3_event",
    "iam_event",
    "suspicious_event"
]]

y = df["risk_label"]

model = xgb.XGBClassifier(
    n_estimators=100,
    max_depth=4,
    learning_rate=0.1
)

model.fit(X, y)

print("Risk model trained successfully")

joblib.dump(model, "models/risk_model.pkl")

print("Model saved successfully")