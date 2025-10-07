import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Building, 
  Clock,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { mockPolicies } from '../data/mockData';
import Header from './Header';
import './Trends.css';

const Trends = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('2024');

  // Process data for charts
  const processPolicyData = () => {
    const yearlyData = {};
    const categoryData = {};
    const sourceData = {};

    mockPolicies.forEach(policy => {
      const year = new Date(policy.date).getFullYear();
      
      // Yearly data
      if (!yearlyData[year]) {
        yearlyData[year] = 0;
      }
      yearlyData[year]++;

      // Category data
      if (!categoryData[policy.category]) {
        categoryData[policy.category] = 0;
      }
      categoryData[policy.category]++;

      // Source data
      if (!sourceData[policy.source]) {
        sourceData[policy.source] = 0;
      }
      sourceData[policy.source]++;
    });

    return {
      yearly: Object.entries(yearlyData).map(([year, count]) => ({
        year: parseInt(year),
        policies: count
      })).sort((a, b) => a.year - b.year),
      categories: Object.entries(categoryData).map(([category, count]) => ({
        category,
        count
      })).sort((a, b) => b.count - a.count),
      sources: Object.entries(sourceData).map(([source, count]) => ({
        source,
        count
      })).sort((a, b) => b.count - a.count)
    };
  };

  const chartData = processPolicyData();

  // Popular search topics (mock data)
  const searchTopics = [
    { topic: 'Education Policy', searches: 1250, change: 15 },
    { topic: 'Healthcare Schemes', searches: 980, change: 8 },
    { topic: 'Digital India', searches: 850, change: -5 },
    { topic: 'Agriculture Support', searches: 720, change: 12 },
    { topic: 'Startup Initiatives', searches: 650, change: 25 },
    { topic: 'Environmental Protection', searches: 580, change: 18 }
  ];

  // New policy alerts (mock data)
  const policyAlerts = [
    {
      id: 1,
      date: '2024-03-20',
      title: 'National Green Hydrogen Mission - Policy Framework',
      category: 'Energy',
      description: 'New comprehensive framework for green hydrogen development with 5 MMT production target.'
    },
    {
      id: 2,
      date: '2024-03-15',
      title: 'Digital Health Mission - National Health Stack Implementation',
      category: 'Healthcare',
      description: 'Implementation guidelines for national digital health ecosystem with UHID integration.'
    },
    {
      id: 3,
      date: '2024-03-10',
      title: 'Ayushman Bharat - Health Insurance Scheme Guidelines',
      category: 'Healthcare',
      description: 'Updated guidelines for world\'s largest health insurance scheme covering 50 crore beneficiaries.'
    },
    {
      id: 4,
      date: '2024-03-05',
      title: 'Startup India Initiative - Policy Framework and Incentives',
      category: 'Business',
      description: 'Enhanced policy framework supporting startup ecosystem with tax exemptions and funding support.'
    }
  ];

  // Statistics data
  const statistics = [
    {
      title: 'Total Policies (2024)',
      value: '8',
      change: 12,
      icon: BarChart3,
      color: 'blue'
    },
    {
      title: 'Most Active Ministry',
      value: 'Ministry of Health',
      change: 0,
      icon: Building,
      color: 'green'
    },
    {
      title: 'Avg Processing Time',
      value: '45 days',
      change: -8,
      icon: Clock,
      color: 'purple'
    },
    {
      title: 'Policy Updates',
      value: '24',
      change: 15,
      icon: TrendingUp,
      color: 'orange'
    }
  ];

  const pieColors = [
    '#2563eb', '#10b981', '#7c3aed', '#f59e0b', 
    '#ef4444', '#06b6d4', '#ec4899', '#84cc16'
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getChangeIcon = (change) => {
    if (change > 0) return <ArrowUp className="change-icon positive" />;
    if (change < 0) return <ArrowDown className="change-icon negative" />;
    return <Minus className="change-icon neutral" />;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Education': '#2563eb',
      'Healthcare': '#10b981',
      'Infrastructure': '#7c3aed',
      'Agriculture': '#f59e0b',
      'Business': '#6366f1',
      'Environment': '#059669',
      'Finance': '#eab308',
      'Housing': '#ec4899',
      'Energy': '#ef4444',
      'Technology': '#06b6d4',
      'Food Security': '#f59e0b'
    };
    return colors[category] || '#6b7280';
  };

  return (
    <div className="trends-page">
      <Header />
      
      <main className="trends-main">
        <div className="trends-container">
          {/* Page Header */}
          <div className="trends-header">
            <h1 className="trends-title">Policy Trends & Analytics</h1>
            <p className="trends-subtitle">
              Comprehensive insights into government policy patterns, trends, and performance metrics
            </p>
          </div>

          {/* Statistics Grid */}
          <section className="statistics-section">
            <h2 className="section-title">Key Metrics</h2>
            <div className="statistics-grid">
              {statistics.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className={`stat-card stat-card-${stat.color}`}>
                    <div className="stat-header">
                      <div className="stat-icon">
                        <Icon />
                      </div>
                      <div className="stat-change">
                        {getChangeIcon(stat.change)}
                        <span className={`change-value ${stat.change > 0 ? 'positive' : stat.change < 0 ? 'negative' : 'neutral'}`}>
                          {Math.abs(stat.change)}%
                        </span>
                      </div>
                    </div>
                    <div className="stat-content">
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-title">{stat.title}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Charts Section */}
          <section className="charts-section">
            <div className="charts-grid">
              {/* Policy Publications Over Time */}
              {/* Policy Publications Over Time */}
              <div className="chart-card">
                <div className="chart-header">
                  <h3 className="chart-title">Policy Publications Over Time</h3>
                  <div className="chart-controls">
                    <select 
                      value={selectedTimeframe}
                      onChange={(e) => setSelectedTimeframe(e.target.value)}
                      className="timeframe-select"
                    >
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="all">All Years</option>
                    </select>
                  </div>
                </div>
                <div className="chart-content">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData.yearly} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="year" 
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        axisLine={{ stroke: '#e5e7eb' }}
                      />
                      <YAxis 
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        axisLine={{ stroke: '#e5e7eb' }}
                        allowDecimals={false}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          padding: '8px 12px'
                        }}
                      />
                      <Legend wrapperStyle={{ paddingTop: '10px' }} />
                      <Line 
                        type="monotone" 
                        dataKey="policies" 
                        name="Policies"
                        stroke="#2563eb" 
                        strokeWidth={3}
                        dot={{ fill: '#2563eb', strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Policy Distribution by Category */}
              <div className="chart-card">
                <div className="chart-header">
                  <h3 className="chart-title">Policy Distribution by Category</h3>
                </div>
                <div className="chart-content">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={chartData.categories}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {chartData.categories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Most Searched Policy Topics */}
              <div className="chart-card chart-card-full">
                <div className="chart-header">
                  <h3 className="chart-title">Most Searched Policy Topics</h3>
                </div>
                <div className="chart-content">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={searchTopics} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="topic" type="category" width={120} />
                      <Tooltip />
                      <Bar dataKey="searches" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </section>

          {/* New Policy Alerts */}
          <section className="alerts-section">
            <h2 className="section-title">Recent Policy Updates</h2>
            <div className="alerts-timeline">
              {policyAlerts.map((alert, index) => (
                <div key={alert.id} className="alert-item">
                  <div className="alert-timeline">
                    <div className="alert-dot"></div>
                    {index < policyAlerts.length - 1 && <div className="alert-line"></div>}
                  </div>
                  <div className="alert-content">
                    <div className="alert-header">
                      <div className="alert-date">{formatDate(alert.date)}</div>
                      <div className="alert-badge">NEW</div>
                    </div>
                    <h3 className="alert-title">{alert.title}</h3>
                    <p className="alert-description">{alert.description}</p>
                    <div className="alert-category" style={{ backgroundColor: getCategoryColor(alert.category) + '20', color: getCategoryColor(alert.category) }}>
                      {alert.category}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Additional Analytics */}
          <section className="analytics-section">
            <h2 className="section-title">Additional Insights</h2>
            <div className="analytics-grid">
              <div className="analytics-card">
                <h3>Top Policy Sources</h3>
                <div className="source-list">
                  {chartData.sources.slice(0, 5).map((source, index) => (
                    <div key={index} className="source-item">
                      <div className="source-name">{source.source}</div>
                      <div className="source-count">{source.count} policies</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="analytics-card">
                <h3>Policy Growth Rate</h3>
                <div className="growth-metrics">
                  <div className="growth-item">
                    <div className="growth-label">Monthly Average</div>
                    <div className="growth-value">2.3 policies</div>
                  </div>
                  <div className="growth-item">
                    <div className="growth-label">Year-over-Year</div>
                    <div className="growth-value">+18%</div>
                  </div>
                  <div className="growth-item">
                    <div className="growth-label">Peak Month</div>
                    <div className="growth-value">March 2024</div>
                  </div>
                </div>
              </div>

              <div className="analytics-card">
                <h3>Policy Impact Metrics</h3>
                <div className="impact-metrics">
                  <div className="impact-item">
                    <div className="impact-label">Total Beneficiaries</div>
                    <div className="impact-value">500+ Crore</div>
                  </div>
                  <div className="impact-item">
                    <div className="impact-label">Budget Allocation</div>
                    <div className="impact-value">₹2.5 Lakh Cr</div>
                  </div>
                  <div className="impact-item">
                    <div className="impact-label">Implementation Rate</div>
                    <div className="impact-value">87%</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Trends;
