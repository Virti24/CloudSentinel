import pandas as pd

# load cleaned dataset
df = pd.read_csv("data/processed/cleaned_logs.csv")

print("Dataset loaded")
print(df.head())

df["external_ip"] = df["sourceIPAddress"].apply(
    lambda x: 1 if isinstance(x, str) and not x.startswith("192.") else 0
)

df["s3_event"] = df["eventSource"].apply(
    lambda x: 1 if x == "s3.amazonaws.com" else 0
)

df["iam_event"] = df["eventSource"].apply(
    lambda x: 1 if x == "iam.amazonaws.com" else 0
)

suspicious_events = [
    "PutBucketPolicy",
    "DeleteBucketPolicy",
    "CreateAccessKey",
    "AttachUserPolicy"
]

df["suspicious_event"] = df["eventName"].apply(
    lambda x: 1 if x in suspicious_events else 0
)

features = df[[
    "eventName",
    "external_ip",
    "s3_event",
    "iam_event",
    "suspicious_event"
]]

print(features.head())

features.to_csv("data/processed/security_features.csv", index=False)

print("Feature engineering completed")