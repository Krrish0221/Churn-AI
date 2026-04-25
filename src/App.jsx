import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  AreaChart, Area, Line, ComposedChart
} from 'recharts';
import {
  Activity, Database, Cpu, LayoutPanelLeft, ChevronRight,
  CheckCircle2, AlertCircle, Info, Zap, User, GraduationCap,
  Binary, TrendingUp, Microscope, Menu, X, Sun, Moon,
  Plane, Wallet, Globe, Hotel, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Replace this with your actual Render backend URL after deployment
const BACKEND_URL = "http://localhost:10000";

const App = () => {
  const [formData, setFormData] = useState({
    Age: 30,
    FrequentFlyer: 'No',
    AnnualIncomeClass: 'Middle Income',
    ServicesOpted: 3,
    AccountSyncedToSocialMedia: 'No',
    BookedHotelOrNot: 'No'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // Model Performance Data (from USER request)
  const accuracy = 87;
  const roc_auc = 0.94;
  const f1_stay = 0.92;
  const f1_churn = 0.64;
  const weighted_f1 = 0.86;

  // Data for Charts
  const classData = [
    { name: 'Stay (0)', value: 654, color: '#3B82F6' },
    { name: 'Churn (1)', value: 300, color: '#ef4444' },
  ];

  const cvData = [
    { fold: 'Fold 1', score: 0.86 },
    { fold: 'Fold 2', score: 0.88 },
    { fold: 'Fold 3', score: 0.87 },
    { fold: 'Fold 4', score: 0.89 },
    { fold: 'Fold 5', score: 0.86 },
  ];

  const featureImportanceData = [
    { name: 'Age', value: 0.31, color: '#3B82F6' },
    { name: 'ServicesOpted', value: 0.22, color: '#60A5FA' },
    { name: 'FrequentFlyer_Yes', value: 0.16, color: '#93C5FD' },
    { name: 'SocialMedia_Yes', value: 0.10, color: '#BFDBFE' },
    { name: 'Income_Middle', value: 0.08, color: '#DBEAFE' },
    { name: 'Income_Low', value: 0.06, color: '#EFF6FF' },
    { name: 'HotelBooked_Yes', value: 0.05, color: '#F8FAFC' },
    { name: 'Flyer_NoRecord', value: 0.01, color: '#FFFFFF' },
  ];

  const rocCurveData = [
    { fpr: 0.0, tpr: 0.0 },
    { fpr: 0.0, tpr: 0.53 },
    { fpr: 0.02, tpr: 0.74 },
    { fpr: 0.05, tpr: 0.87 },
    { fpr: 0.10, tpr: 0.92 },
    { fpr: 0.15, tpr: 0.97 },
    { fpr: 0.20, tpr: 1.0 },
    { fpr: 1.0, tpr: 1.0 },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'Age' || name === 'ServicesOpted' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Backend server is not responding. Please start the backend.');
      }

      const data = await response.json();
      setResult(data.churn);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={`app-container ${!sidebarOpen ? 'full-width' : ''}`}>
      {/* Theme Toggle */}
      <button className="theme-toggle-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Sidebar Toggle */}
      <button className="sidebar-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav className={`sidebar-nav ${!sidebarOpen ? 'closed' : ''}`}>
        <div style={{ marginBottom: '2.5rem', paddingLeft: '1rem', marginTop: '1rem' }}>
          <h2 style={{ fontFamily: 'Orbitron', fontSize: '1.4rem', color: 'var(--text-main)', letterSpacing: '0.05em' }}>ChurnAI</h2>
          <span style={{ fontSize: '0.6rem', color: 'var(--accent-primary)', letterSpacing: '0.15em', fontWeight: 800 }}>V1.0 PRO</span>
        </div>
        <a href="#hero" className="nav-link active">Home</a>
        <a href="#metrics" className="nav-link">Performance</a>
        <a href="#dataset" className="nav-link">Analytics</a>
        <a href="#insights" className="nav-link">Insights</a>
        <a href="#prediction" className="nav-link">Predictor</a>

        <div style={{ marginTop: 'auto', padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Developed by</div>
          <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>Krish Prajapati</div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section" style={{ minHeight: '40vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <ShieldCheck size={48} color="var(--accent-primary)" />
          <TrendingUp size={48} color="var(--accent-secondary)" style={{ opacity: 0.5 }} />
        </div>
        <h1>Churn <span style={{ fontWeight: 300, fontSize: '0.8em', color: 'var(--accent-primary)' }}>Predictor</span></h1>
        <p style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
          Advanced Customer Retention Analytics powered by Random Forest Classifier.
        </p>

        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: theme === 'light' ? '#1e293b' : 'var(--text-muted)' }}>
            <User size={18} /> <span style={{ color: theme === 'light' ? '#1e293b' : 'var(--text-main)', fontSize: '0.9rem' }}>Krish Prajapati | KU2507U0313</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: theme === 'light' ? '#475569' : 'var(--text-muted)' }}>
            <GraduationCap size={18} /> <span style={{ color: theme === 'light' ? '#475569' : 'var(--text-main)', fontSize: '0.9rem' }}>B.Tech GenAI-A</span>
          </div>
        </div>
      </section>

      {/* Metrics Dashboard */}
      <section id="metrics" className="dashboard-grid">
        <div className="stat-card">
          <span className="stat-label">Model Accuracy</span>
          <span className="stat-value">{accuracy}%</span>
          <span className="stat-trend">High Reliability</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">ROC-AUC Score</span>
          <span className="stat-value">{roc_auc}</span>
          <span className="stat-trend">94% Separability</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Weighted F1</span>
          <span className="stat-value">{weighted_f1}</span>
          <span className="stat-trend">Overall Balance</span>
        </div>
        <div className="stat-card" style={{ borderColor: 'var(--accent-primary)' }}>
          <span className="stat-label">Stay Class F1</span>
          <span className="stat-value" style={{ color: 'var(--accent-primary)' }}>{f1_stay}</span>
          <span className="stat-trend">Perfect Retention ID</span>
        </div>
      </section>

      {/* Analytics Section */}
      <section id="dataset" className="main-card">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
          {/* Class Distribution Chart */}
          <div>
            <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Database size={20} /> Dataset Composition
            </h3>
            <div style={{ height: '250px', width: '100%' }}>
              <ResponsiveContainer>
                <BarChart data={classData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="var(--chart-axis)" fontSize={12} />
                  <YAxis axisLine={false} tickLine={false} stroke="var(--chart-axis)" fontSize={12} />
                  <Tooltip
                    contentStyle={{ 
                      background: theme === 'light' ? '#fff' : '#0f172a', 
                      border: '1px solid var(--border-color)', 
                      borderRadius: '12px', 
                      color: 'var(--text-main)' 
                    }}
                    itemStyle={{ color: 'var(--text-main)' }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={60}>
                    {classData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={theme === 'light' ? (index === 0 ? '#2563eb' : '#dc2626') : entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '1rem', textAlign: 'center' }}>
              Total Records: 954 Customers | 6 Features
            </p>
          </div>

          {/* Confusion Matrix (Simplified for 2x2) */}
          <div>
            <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <LayoutPanelLeft size={20} /> Confusion Matrix
            </h3>
            <div className="matrix-container">
              <div className="matrix-grid" style={{ gridTemplateColumns: 'auto repeat(2, 1fr)' }}>
                <div></div>
                <div className="matrix-header">Stay</div>
                <div className="matrix-header">Churn</div>

                <div className="matrix-label">Actual Stay</div>
                <div className="matrix-cell cell-high" title="Correctly Predicted Stay">
                  <span>144</span>
                </div>
                <div className="matrix-cell cell-low" title="Incorrectly Predicted Churn">
                  <span>9</span>
                </div>

                <div className="matrix-label">Actual Churn</div>
                <div className="matrix-cell cell-mid" title="Incorrectly Predicted Stay">
                  <span>16</span>
                </div>
                <div className="matrix-cell cell-high" style={{ background: '#ef4444', border: '1px solid #ef4444' }} title="Correctly Predicted Churn">
                  <span>22</span>
                </div>
              </div>
              <div style={{ textAlign: 'center', marginTop: '1rem' }} className="stat-label">Predicted Class</div>
            </div>
          </div>
        </div>
      </section>

      {/* Model Insights Section - NEW */}
      <section id="insights" className="main-card">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
          {/* Feature Importance Chart */}
          <div>
            <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={20} color="var(--accent-primary)" /> Feature Importance
            </h3>
            <div style={{ height: '300px', width: '100%' }}>
              <ResponsiveContainer>
                <BarChart data={featureImportanceData} layout="vertical" margin={{ left: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} stroke="var(--chart-axis)" fontSize={11} width={100} />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ 
                      background: theme === 'light' ? '#fff' : '#0f172a', 
                      border: '1px solid var(--border-color)', 
                      borderRadius: '12px', 
                      color: 'var(--text-main)' 
                    }}
                    itemStyle={{ color: 'var(--text-main)' }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                    {featureImportanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={theme === 'light' ? '#2563eb' : entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ROC Curve Chart */}
          <div>
            <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={20} color="var(--accent-secondary)" /> ROC Curve (AUC: 0.94)
            </h3>
            <div style={{ height: '300px', width: '100%' }}>
              <ResponsiveContainer>
                <ComposedChart data={rocCurveData}>
                  <defs>
                    <linearGradient id="colorRoc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                  <XAxis 
                    dataKey="fpr" 
                    type="number"
                    domain={[0, 1]}
                    label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -5, fill: theme === 'light' ? '#64748b' : '#94a3b8', fontSize: 10 }} 
                    tick={{ fontSize: 10 }} 
                    stroke="var(--chart-axis)" 
                  />
                  <YAxis label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft', fill: theme === 'light' ? '#64748b' : '#94a3b8', fontSize: 10 }} tick={{ fontSize: 10 }} stroke="var(--chart-axis)" />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div style={{background:'#1e293b', color:'white', padding:'6px 10px', borderRadius:'6px', fontSize:'12px', border: '1px solid rgba(255,255,255,0.1)'}}>
                            FPR: {payload[0]?.payload?.fpr?.toFixed(2)} | TPR: {payload[0]?.value?.toFixed(2)}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area type="monotone" dataKey="tpr" stroke={theme === 'light' ? '#1d4ed8' : 'var(--accent-primary)'} strokeWidth={3} fillOpacity={1} fill="url(#colorRoc)" />
                  {/* Diagonal Line for Random Guess */}
                  <Line type="monotone" dataKey={(d) => d.fpr} stroke={theme === 'light' ? '#94a3b8' : '#475569'} strokeDasharray="5 5" dot={false} />
                  {theme === 'light' && (
                    <text x="50%" y="20" textAnchor="middle" fill="#1d4ed8" style={{ fontSize: '12px', fontWeight: 'bold' }}>
                      ROC Curve (AUC: 0.94)
                    </text>
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Prediction Section */}
      <section id="prediction" className="main-card" style={{ border: '2px solid rgba(59, 130, 246, 0.2)' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Interactive Predictor</h2>
          <p style={{ color: 'var(--text-muted)' }}>Input customer profile details to analyze churn risk.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="input-group">
              <label><User size={14} style={{ marginRight: '5px' }} /> Age (27-38)</label>
              <input type="number" name="Age" min="27" max="38" value={formData.Age} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label><Plane size={14} style={{ marginRight: '5px' }} /> Frequent Flyer</label>
              <select name="FrequentFlyer" value={formData.FrequentFlyer} onChange={handleChange}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="No Record">No Record</option>
              </select>
            </div>
            <div className="input-group">
              <label><Wallet size={14} style={{ marginRight: '5px' }} /> Income Class</label>
              <select name="AnnualIncomeClass" value={formData.AnnualIncomeClass} onChange={handleChange}>
                <option value="Low Income">Low Income</option>
                <option value="Middle Income">Middle Income</option>
                <option value="High Income">High Income</option>
              </select>
            </div>
            <div className="input-group">
              <label><Globe size={14} style={{ marginRight: '5px' }} /> Services (1-6)</label>
              <input type="number" name="ServicesOpted" min="1" max="6" value={formData.ServicesOpted} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label><Binary size={14} style={{ marginRight: '5px' }} /> Social Sync</label>
              <select name="AccountSyncedToSocialMedia" value={formData.AccountSyncedToSocialMedia} onChange={handleChange}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="input-group">
              <label><Hotel size={14} style={{ marginRight: '5px' }} /> Booked Hotel</label>
              <select name="BookedHotelOrNot" value={formData.BookedHotelOrNot} onChange={handleChange}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? <span className="loader"></span> : 'Analyze Churn Risk'}
          </button>
        </form>

        {error && (
          <div style={{ marginTop: '2rem', padding: '1rem', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', textAlign: 'center' }}>
            <AlertCircle size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
            {error}
          </div>
        )}

        <AnimatePresence>
          {result !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="result-container"
              style={{
                background: theme === 'light' 
                  ? (result === 1 ? '#fef2f2' : '#f0fdf4')
                  : (result === 1 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)'),
                borderColor: theme === 'light'
                  ? (result === 1 ? '#dc2626' : '#16a34a')
                  : (result === 1 ? '#ef4444' : '#22c55e'),
                borderStyle: 'solid',
                borderWidth: theme === 'light' ? '2px' : '1px'
              }}
            >
              <div className="result-header" style={{ color: theme === 'light' ? (result === 1 ? '#dc2626' : '#16a34a') : 'inherit' }}>Analysis Result</div>
              <div className="result-value" style={{ color: result === 1 ? (theme === 'light' ? '#dc2626' : '#ef4444') : (theme === 'light' ? '#16a34a' : '#22c55e') }}>
                {result === 1 ? 'High Churn Risk' : 'Low Churn Risk'}
              </div>
              <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
                {result === 1
                  ? '⚠️ This customer is likely to leave the service.'
                  : '✅ This customer is likely to stay loyal.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Footer */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center', opacity: 0.8 }}>
        <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '0.9rem', lineHeight: 1.6, color: theme === 'light' ? '#475569' : 'var(--text-muted)' }}>
          <b>Model Summary:</b> The Random Forest Classifier achieved an Accuracy of 87%.
          The ROC-AUC of 0.94 indicates exceptional capability in distinguishing between churn and retention patterns.
        </p>
        <div style={{ marginTop: '3rem', fontSize: '0.9rem', color: theme === 'light' ? '#2563eb' : 'var(--accent-primary)', fontWeight: 600 }}>
          CHURNAI ENGINE © 2026<br />
          <span style={{ fontSize: '0.75rem', color: theme === 'light' ? '#475569' : '#94a3b8', fontWeight: 400 }}>Krish Prajapati KU2507U0313 | B.Tech CSE-AIML | GenAI-A | IBM Final Project</span>
        </div>
      </section>
    </main>
  );
};

export default App;
