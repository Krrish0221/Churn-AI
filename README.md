# 🌍 ChurnAI: Customer Churn Prediction Dashboard

ChurnAI is a high-performance, full-stack web application designed to predict customer churn for a travel company. Built with a **FastAPI** backend and a **React (Vite)** frontend, it features a premium dashboard with glassmorphism aesthetics, dual-theme support, and interactive model insights.

## 🚀 Key Features

- **Interactive Churn Predictor**: Real-time predictions powered by a Random Forest machine learning model.
- **Model Performance Dashboard**: Visualizes Accuracy (87%), ROC-AUC (0.94), and Weighted F1 (0.86).
- **Advanced Analytics**:
  - **Confusion Matrix**: Visualizes True/False Positives and Negatives.
  - **Feature Importance**: Bar chart showing which factors (Age, Services, etc.) drive churn.
  - **ROC Curve**: Professional area chart showing the model's classification capability.
- **Dual Theme Support**: Beautifully optimized Dark and Light modes.
- **Responsive Sidebar**: Collapsible navigation for a seamless user experience.

## 🛠️ Technology Stack

- **Frontend**: React, Vite, Recharts, Lucide Icons, Framer Motion.
- **Backend**: FastAPI, Uvicorn, Scikit-Learn, Joblib, Pandas.
- **Styling**: Vanilla CSS (Custom Glassmorphism System).
- **Deployment**: Configured for Render.com.

## 📦 Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js & npm

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Ensure `model.pkl` is present in the `backend` folder.
4. Run the server:
   ```bash
   python main.py
   ```

### Frontend Setup
1. Navigate to the root directory:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## 📊 Model Insights
The underlying model is a **Random Forest Classifier** trained on a dataset of 954 customers.
- **Accuracy**: 87%
- **ROC-AUC Score**: 0.94
- **Precision (Stay)**: 0.92
- **Recall (Churn)**: 0.64

## 👨‍💻 Author
**Krish Prajapati**  
KU2507U0313 | B.Tech CSE-AIML | GenAI-A  
*IBM Final Project Submission*

---
© 2026 ChurnAI Engine
