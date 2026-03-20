import os
import json

folder_path = "aws_dataset-main/aws_dataset-main/CloudTrail"
output_file = "data/aws_logs.json"

all_logs = []

for root, dirs, files in os.walk(folder_path):
    for file in files:
        if file.endswith(".json"):
            file_path = os.path.join(root, file)

            with open(file_path, "r") as f:
                data = json.load(f)

                if "Records" in data:
                    all_logs.extend(data["Records"])
                else:
                    all_logs.append(data)

with open(output_file, "w") as f:
    json.dump(all_logs, f, indent=4)

print("Total logs merged:", len(all_logs))