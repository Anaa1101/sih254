import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Users,
  Target,
  Award,
  BookOpen,
  GraduationCap,
  School,
  Building,
  DollarSign,
  Activity
} from 'lucide-react';
import { mockPolicies } from '../data/mockData';
import Header from './Header';
import './doc_trends.css';

const DocTrends = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedChart, setSelectedChart] = useState('bar');
  const [selectedTimeframe, setSelectedTimeframe] = useState('5years');
  const [animationProgress, setAnimationProgress] = useState(0);

  // Find the policy by ID
  const policy = mockPolicies.find(p => p.id === parseInt(id));

  // Hardcoded education policy trends data
  const educationTrendsData = {
    policyAdoption: {
      labels: ['2020', '2021', '2022', '2023', '2024'],
      datasets: [
        {
          label: 'Policy Implementation Rate (%)',
          data: [15, 35, 60, 80, 95],
          backgroundColor: 'rgba(37, 99, 235, 0.8)',
          borderColor: 'rgba(37, 99, 235, 1)',
          borderWidth: 2
        },
        {
          label: 'Budget Allocation (₹ Crores)',
          data: [500, 1200, 2500, 4000, 6000],
          backgroundColor: 'rgba(16, 185, 129, 0.8)',
          borderColor: 'rgba(16, 185, 129, 1)',
          borderWidth: 2,
          yAxisID: 'y1'
        }
      ]
    },
    categoryDistribution: {
      labels: ['Primary Education', 'Secondary Education', 'Higher Education', 'Vocational Training', 'Digital Literacy'],
      data: [35, 25, 20, 15, 5],
      backgroundColor: [
        'rgba(37, 99, 235, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ]
    },
    regionalPerformance: {
      labels: ['North', 'South', 'East', 'West', 'Central', 'Northeast'],
      data: [85, 92, 78, 88, 82, 75],
      backgroundColor: 'rgba(37, 99, 235, 0.6)'
    },
    impactMetrics: {
      studentEnrollment: { current: 28500000, target: 30000000, growth: 12.5 },
      teacherTraining: { current: 450000, target: 500000, growth: 8.3 },
      digitalInfrastructure: { current: 85000, target: 100000, growth: 15.2 },
      budgetUtilization: { current: 85, target: 100, growth: 5.8 }
    }
  };

  useEffect(() => {
    // Animate progress bars
    const timer = setTimeout(() => {
      setAnimationProgress(100);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!policy) {
    return (
      <div className="doc-trends-page">
        <Header />
        <div className="trends-not-found">
          <h2>Policy not found</h2>
          <p>The requested policy document could not be found.</p>
          <button 
            className="back-button"
            onClick={() => navigate('/results')}
          >
            <ArrowLeft className="back-icon" />
            Back to Results
          </button>
        </div>
      </div>
    );
  }

  const renderBarChart = () => (
    <div className="chart-container">
      <div className="chart-header">
        <BarChart3 className="chart-icon" />
        <h3>Policy Implementation Trends</h3>
      </div>
      <div className="bar-chart">
        {educationTrendsData.policyAdoption.labels.map((year, index) => (
          <div key={year} className="bar-group">
            <div className="bar-wrapper">
              <div 
                className="bar bar-primary"
                style={{ 
                  height: `${(educationTrendsData.policyAdoption.datasets[0].data[index] / 100) * 200}px`,
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <span className="bar-value">{educationTrendsData.policyAdoption.datasets[0].data[index]}%</span>
              </div>
              <div 
                className="bar bar-secondary"
                style={{ 
                  height: `${(educationTrendsData.policyAdoption.datasets[1].data[index] / 6000) * 200}px`,
                  animationDelay: `${index * 0.2 + 0.1}s`
                }}
              >
                <span className="bar-value">₹{educationTrendsData.policyAdoption.datasets[1].data[index]}Cr</span>
              </div>
            </div>
            <div className="bar-label">{year}</div>
          </div>
        ))}
      </div>
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color primary"></div>
          <span>Implementation Rate (%)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color secondary"></div>
          <span>Budget Allocation (₹ Crores)</span>
        </div>
      </div>
    </div>
  );

  const renderPieChart = () => (
    <div className="chart-container">
      <div className="chart-header">
        <PieChart className="chart-icon" />
        <h3>Education Category Distribution</h3>
      </div>
      <div className="pie-chart">
        <div className="pie-visual">
          <svg viewBox="0 0 200 200" className="pie-svg">
            {educationTrendsData.categoryDistribution.labels.map((label, index) => {
              const percentage = educationTrendsData.categoryDistribution.data[index];
              const angle = (percentage / 100) * 360;
              const startAngle = educationTrendsData.categoryDistribution.data
                .slice(0, index)
                .reduce((sum, val) => sum + (val / 100) * 360, 0);
              
              const x1 = 100 + 80 * Math.cos((startAngle * Math.PI) / 180);
              const y1 = 100 + 80 * Math.sin((startAngle * Math.PI) / 180);
              const x2 = 100 + 80 * Math.cos(((startAngle + angle) * Math.PI) / 180);
              const y2 = 100 + 80 * Math.sin(((startAngle + angle) * Math.PI) / 180);
              
              const largeArcFlag = angle > 180 ? 1 : 0;
              
              return (
                <path
                  key={label}
                  d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  fill={educationTrendsData.categoryDistribution.backgroundColor[index]}
                  className="pie-segment"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              );
            })}
          </svg>
        </div>
        <div className="pie-legend">
          {educationTrendsData.categoryDistribution.labels.map((label, index) => (
            <div key={label} className="pie-legend-item">
              <div 
                className="pie-legend-color"
                style={{ backgroundColor: educationTrendsData.categoryDistribution.backgroundColor[index] }}
              ></div>
              <div className="pie-legend-content">
                <span className="pie-legend-label">{label}</span>
                <span className="pie-legend-value">{educationTrendsData.categoryDistribution.data[index]}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLineChart = () => (
    <div className="chart-container">
      <div className="chart-header">
        <LineChart className="chart-icon" />
        <h3>Regional Performance Trends</h3>
      </div>
      <div className="line-chart">
        <div className="line-chart-grid">
          {educationTrendsData.regionalPerformance.labels.map((region, index) => (
            <div key={region} className="line-point">
              <div 
                className="line-dot"
                style={{ 
                  bottom: `${(educationTrendsData.regionalPerformance.data[index] / 100) * 200}px`,
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <span className="dot-value">{educationTrendsData.regionalPerformance.data[index]}%</span>
              </div>
              <div className="line-label">{region}</div>
            </div>
          ))}
        </div>
        <svg className="line-svg" viewBox="0 0 600 200">
          <polyline
            points={educationTrendsData.regionalPerformance.labels.map((_, index) => 
              `${(index * 100) + 50},${200 - (educationTrendsData.regionalPerformance.data[index] / 100) * 200}`
            ).join(' ')}
            fill="none"
            stroke="rgba(37, 99, 235, 1)"
            strokeWidth="3"
            className="trend-line"
          />
        </svg>
      </div>
    </div>
  );

  const renderProgressCard = (title, icon, current, target, growth, unit = '') => (
    <div className="progress-card">
      <div className="progress-header">
        {icon}
        <h4>{title}</h4>
      </div>
      <div className="progress-stats">
        <div className="progress-current">
          <span className="progress-value">{current.toLocaleString()}{unit}</span>
          <span className="progress-label">Current</span>
        </div>
        <div className="progress-target">
          <span className="progress-value">{target.toLocaleString()}{unit}</span>
          <span className="progress-label">Target</span>
        </div>
        <div className="progress-growth">
          <TrendingUp className="growth-icon" />
          <span className="growth-value">+{growth}%</span>
        </div>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ 
            width: `${(current / target) * 100}%`,
            animationDelay: '0.5s'
          }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="doc-trends-page">
      <Header />
      
      <main className="trends-main">
        <div className="trends-container">
          {/* Header */}
          <div className="trends-header">
            <button 
              className="trends-back-button"
              onClick={() => navigate(`/document/${id}`)}
            >
              <ArrowLeft className="back-icon" />
              Back to Document
            </button>
            
            <div className="trends-title-section">
              <h1 className="trends-title">Document Trends Analysis</h1>
              <p className="trends-subtitle">{policy.title}</p>
              <div className="trends-meta">
                <span className="trends-category">{policy.category}</span>
                <span className="trends-date">{new Date(policy.date).getFullYear()}</span>
              </div>
            </div>
          </div>

          {/* Chart Controls */}
          <div className="chart-controls">
            <div className="chart-type-selector">
              <button 
                className={`chart-type-btn ${selectedChart === 'bar' ? 'active' : ''}`}
                onClick={() => setSelectedChart('bar')}
              >
                <BarChart3 className="btn-icon" />
                Bar Chart
              </button>
              <button 
                className={`chart-type-btn ${selectedChart === 'pie' ? 'active' : ''}`}
                onClick={() => setSelectedChart('pie')}
              >
                <PieChart className="btn-icon" />
                Pie Chart
              </button>
              <button 
                className={`chart-type-btn ${selectedChart === 'line' ? 'active' : ''}`}
                onClick={() => setSelectedChart('line')}
              >
                <LineChart className="btn-icon" />
                Line Chart
              </button>
            </div>
            
            <div className="timeframe-selector">
              <select 
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="timeframe-select"
              >
                <option value="1year">Last Year</option>
                <option value="3years">Last 3 Years</option>
                <option value="5years">Last 5 Years</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>

          {/* Main Content */}
          <div className="trends-content">
            {/* Chart Section */}
            <div className="chart-section">
              {selectedChart === 'bar' && renderBarChart()}
              {selectedChart === 'pie' && renderPieChart()}
              {selectedChart === 'line' && renderLineChart()}
            </div>

            {/* Progress Cards */}
            <div className="progress-section">
              <h2 className="section-title">Key Performance Indicators</h2>
              <div className="progress-grid">
                {renderProgressCard(
                  'Student Enrollment',
                  <Users className="progress-icon" />,
                  educationTrendsData.impactMetrics.studentEnrollment.current,
                  educationTrendsData.impactMetrics.studentEnrollment.target,
                  educationTrendsData.impactMetrics.studentEnrollment.growth
                )}
                {renderProgressCard(
                  'Teacher Training',
                  <GraduationCap className="progress-icon" />,
                  educationTrendsData.impactMetrics.teacherTraining.current,
                  educationTrendsData.impactMetrics.teacherTraining.target,
                  educationTrendsData.impactMetrics.teacherTraining.growth
                )}
                {renderProgressCard(
                  'Digital Infrastructure',
                  <Building className="progress-icon" />,
                  educationTrendsData.impactMetrics.digitalInfrastructure.current,
                  educationTrendsData.impactMetrics.digitalInfrastructure.target,
                  educationTrendsData.impactMetrics.digitalInfrastructure.growth
                )}
                {renderProgressCard(
                  'Budget Utilization',
                  <DollarSign className="progress-icon" />,
                  educationTrendsData.impactMetrics.budgetUtilization.current,
                  educationTrendsData.impactMetrics.budgetUtilization.target,
                  educationTrendsData.impactMetrics.budgetUtilization.growth,
                  '%'
                )}
              </div>
            </div>

            {/* Insights Section */}
            <div className="insights-section">
              <h2 className="section-title">Trend Insights</h2>
              <div className="insights-grid">
                <div className="insight-card positive">
                  <div className="insight-header">
                    <TrendingUp className="insight-icon" />
                    <h3>Positive Trends</h3>
                  </div>
                  <ul className="insight-list">
                    <li>95% policy implementation rate achieved in 2024</li>
                    <li>Student enrollment increased by 12.5% year-over-year</li>
                    <li>Digital infrastructure expanded by 15.2%</li>
                    <li>Budget utilization efficiency improved to 85%</li>
                  </ul>
                </div>
                
                <div className="insight-card neutral">
                  <div className="insight-header">
                    <Activity className="insight-icon" />
                    <h3>Areas for Improvement</h3>
                  </div>
                  <ul className="insight-list">
                    <li>Northeast region performance at 75% (below average)</li>
                    <li>Vocational training allocation at 15% (target: 20%)</li>
                    <li>Teacher training completion at 90% of target</li>
                    <li>Digital literacy programs need expansion</li>
                  </ul>
                </div>
                
                <div className="insight-card recommendation">
                  <div className="insight-header">
                    <Target className="insight-icon" />
                    <h3>Recommendations</h3>
                  </div>
                  <ul className="insight-list">
                    <li>Increase focus on Northeast region development</li>
                    <li>Enhance vocational training infrastructure</li>
                    <li>Accelerate teacher training programs</li>
                    <li>Expand digital literacy initiatives</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocTrends;
