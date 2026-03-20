import json
import pandas as pd

# load merged logs
with open("data/aws_logs.json", "r") as f:
    logs = json.load(f)

# convert json -> dataframe
df = pd.json_normalize(logs)

print("Total logs:", len(df))
print("Columns available:")
print(df.columns)

print("\nSample Data:")
print(df.head())