from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
import os

app = FastAPI(title="Customer Churn Prediction API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
# Note: The user mentioned they will add model.pkl manually to the backend folder
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.pkl")
model = None

@app.on_event("startup")
def load_model():
    global model
    if os.path.exists(MODEL_PATH):
        model = joblib.load(MODEL_PATH)
    else:
        print(f"Warning: Model file not found at {MODEL_PATH}")

class ChurnInput(BaseModel):
    Age: int
    FrequentFlyer: str       # "Yes", "No", "No Record"
    AnnualIncomeClass: str   # "Low Income", "Middle Income", "High Income"
    ServicesOpted: int
    AccountSyncedToSocialMedia: str  # "Yes", "No"
    BookedHotelOrNot: str            # "Yes", "No"

# Mappings for categorical values
MAPPINGS = {
    "FrequentFlyer": {"No": 0, "No Record": 1, "Yes": 2},
    "AnnualIncomeClass": {"Low Income": 0, "Middle Income": 1, "High Income": 2},
    "AccountSyncedToSocialMedia": {"No": 0, "Yes": 1},
    "BookedHotelOrNot": {"No": 0, "Yes": 1}
}

@app.get("/")
def health_check():
    return {"status": "API is running"}

@app.post("/predict")
def predict(data: ChurnInput):
    global model
    if model is None:
        if os.path.exists(MODEL_PATH):
            model = joblib.load(MODEL_PATH)
        else:
            raise HTTPException(status_code=503, detail="Model not loaded.")

    try:
        input_dict = data.dict()
        
        # Initialize features in the exact order the model expects
        # Features: Age, ServicesOpted, FrequentFlyer_No Record, FrequentFlyer_Yes, 
        # AnnualIncomeClass_Low Income, AnnualIncomeClass_Middle Income, 
        # AccountSyncedToSocialMedia_Yes, BookedHotelOrNot_Yes
        
        features = {
            "Age": input_dict["Age"],
            "ServicesOpted": input_dict["ServicesOpted"],
            "FrequentFlyer_No Record": 1 if input_dict["FrequentFlyer"] == "No Record" else 0,
            "FrequentFlyer_Yes": 1 if input_dict["FrequentFlyer"] == "Yes" else 0,
            "AnnualIncomeClass_Low Income": 1 if input_dict["AnnualIncomeClass"] == "Low Income" else 0,
            "AnnualIncomeClass_Middle Income": 1 if input_dict["AnnualIncomeClass"] == "Middle Income" else 0,
            "AccountSyncedToSocialMedia_Yes": 1 if input_dict["AccountSyncedToSocialMedia"] == "Yes" else 0,
            "BookedHotelOrNot_Yes": 1 if input_dict["BookedHotelOrNot"] == "Yes" else 0
        }
        
        # Convert to DataFrame with specific column order
        feature_order = [
            'Age', 'ServicesOpted', 'FrequentFlyer_No Record', 'FrequentFlyer_Yes',
            'AnnualIncomeClass_Low Income', 'AnnualIncomeClass_Middle Income',
            'AccountSyncedToSocialMedia_Yes', 'BookedHotelOrNot_Yes'
        ]
        
        df = pd.DataFrame([features])[feature_order]
        
        # Make prediction
        prediction = model.predict(df)
        churn_result = int(prediction[0])
        
        return {"churn": churn_result}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    print("\n" + "="*50)
    print("CHURN PREDICTOR BACKEND STARTING...")
    print("Visit in browser: http://localhost:10000")
    print("="*50 + "\n")
    uvicorn.run(app, host="0.0.0.0", port=10000)
