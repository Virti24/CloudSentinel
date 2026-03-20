import pandas as pd
import json

# load merged logs
with open("data/aws_logs.json", "r") as f:
    logs = json.load(f)

df = pd.json_normalize(logs)

# -------- Security Features -------- #

# external IP detection
df["external_ip"] = df["sourceIPAddress"].apply(
    lambda x: 0 if "AWS Internal" in str(x) else 1
)

# detect S3 related events
df["s3_event"] = df["eventSource"].apply(
    lambda x: 1 if "s3" in str(x).lower() else 0
)

# detect IAM events
df["iam_event"] = df["eventSource"].apply(
    lambda x: 1 if "iam" in str(x).lower() else 0
)

# detect sensitive event names
suspicious_events = [
    "CreateUser",
    "DeleteUser",
    "PutBucketPolicy",
    "AuthorizeSecurityGroupIngress",
    "CreateAccessKey"
]

df["suspicious_event"] = df["eventName"].apply(
    lambda x: 1 if str(x) in suspicious_events else 0
)

# -------- Save features -------- #

features = df[
    [
        "eventName",
        "eventSource",
        "sourceIPAddress",
        "external_ip",
        "s3_event",
        "iam_event",
        "suspicious_event"
    ]
]

features.to_csv("data/processed/security_features.csv", index=False)

print("Feature engineering completed")
print(features.head())