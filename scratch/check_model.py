import joblib
import pandas as pd
import os

model_path = os.path.join('backend', 'model.pkl')

try:
    model = joblib.load(model_path)
    if hasattr(model, 'feature_names_in_'):
        print("Features expected by model:")
        print(list(model.feature_names_in_))
    else:
        print("Model does not have feature_names_in_ attribute.")
        # Try to inspect the model's first tree or something if possible
except Exception as e:
    print(f"Error loading model: {e}")
