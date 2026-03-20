import pandas as pd
import json

with open("data/aws_logs.json") as f:
    logs = json.load(f)

df = pd.json_normalize(logs)

# remove columns with too many null values
df = df.dropna(axis=1, thresh=len(df)*0.2)

print("Remaining columns:", len(df.columns))

df.to_csv("data/processed/cleaned_logs.csv", index=False)

print("Cleaned dataset saved")