from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

# Allow frontend to access API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow frontend requests
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load anomaly results
data = pd.read_csv("data/results/anomaly_results.csv")

@app.get("/")
def home():
    return {"message": "Cloud Sentinel API running"}

@app.get("/risks")
def get_risks():
    risky = data[data["anomaly"] == 1]
    return risky.to_dict(orient="records")

@app.get("/all-events")
def get_all():
    return data.to_dict(orient="records")