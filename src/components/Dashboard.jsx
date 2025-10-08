import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  FileText, 
  TrendingUp, 
  Users, 
  Award,
  Calendar,
  ArrowRight,
  BookOpen,
  Shield,
  Globe
} from 'lucide-react';
import { mockPolicies, quickStats, categories, years } from '../data/mockData';
import Header from './Header';
import PolicyCard from './PolicyCard';
import './Dashboard.css';

const Dashboard = () => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: 'All Categories',
    year: 'All Years'
  });
  const { searchQuery, setSearchQuery } = useAppContext();
  const navigate = useNavigate();

  // Get featured policies (latest 6)
  const featuredPolicies = mockPolicies
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/results');
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleQuickSearch = (query) => {
    setSearchQuery(query);
    navigate('/results');
  };

  const stats = [
    {
      title: 'Total Policies',
      value: quickStats.totalPolicies,
      icon: FileText,
      color: 'blue',
      change: '+12%'
    },
    {
      title: 'Recent Updates',
      value: quickStats.recentUpdates,
      icon: Calendar,
      color: 'green',
      change: '+8%'
    },
    {
      title: 'Categories',
      value: quickStats.categories,
      icon: BookOpen,
      color: 'purple',
      change: '+3%'
    },
    {
      title: 'Beneficiaries',
      value: quickStats.totalBeneficiaries,
      icon: Users,
      color: 'orange',
      change: '+15%'
    }
  ];

  const quickSearches = [
    'Education Policy',
    'Healthcare Schemes',
    'Digital India',
    'Agriculture Support',
    'Startup Initiatives',
    'Environmental Protection'
  ];

  return (
    <div className="dashboard">
      <Header />
      
      <main className="dashboard-main">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-background">
            <div className="hero-pattern"></div>
          </div>
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Welcome to Government Policy Portal
              </h1>
              <p className="hero-subtitle">
                Discover, analyze, and understand government policies with AI-powered insights
              </p>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <Shield className="hero-stat-icon" />
                <div className="hero-stat-content">
                  <div className="hero-stat-number">15+</div>
                  <div className="hero-stat-label">Active Policies</div>
                </div>
              </div>
              <div className="hero-stat">
                <Globe className="hero-stat-icon" />
                <div className="hero-stat-content">
                  <div className="hero-stat-number">500+</div>
                  <div className="hero-stat-label">Crore Beneficiaries</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="search-section">
          <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-wrapper">
              <div className="search-bar">
  <Search className="search-icon" />
  <input
    type="text"
    placeholder="Search policies, documents, or keywords..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="search-input"
  />
</div>

                <button type="submit" className="search-button">
                  Search
                </button>
              </div>
            </form>

            {/* Advanced Filters */}
            <div className="advanced-filters">
              <button
                className="filters-toggle"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              >
                <Filter className="filter-icon" />
                Advanced Filters
                <ChevronDown className={`chevron ${showAdvancedFilters ? 'open' : ''}`} />
              </button>

              {showAdvancedFilters && (
                <div className="filters-content">
                  <div className="filter-group">
                    <label className="filter-label">Category</label>
                    <select
                      value={filters.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="filter-select"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="filter-group">
                    <label className="filter-label">Year</label>
                    <select
                      value={filters.year}
                      onChange={(e) => handleFilterChange('year', e.target.value)}
                      className="filter-select"
                    >
                      {years.map(year => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    className="apply-filters-button"
                    onClick={() => navigate('/results')}
                  >
                    Apply Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="stats-section">
          <div className="stats-container">
            <h2 className="section-title">Platform Overview</h2>
            <div className="stats-grid">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className={`stat-card stat-card-${stat.color}`}>
                    <div className="stat-icon">
                      <Icon />
                    </div>
                    <div className="stat-content">
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-title">{stat.title}</div>
                      <div className="stat-change">
                        <TrendingUp className="change-icon" />
                        <span>{stat.change}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quick Search Suggestions */}
        <section className="quick-search-section">
          <div className="quick-search-container">
            <h2 className="section-title">Popular Searches</h2>
            <div className="quick-search-grid">
              {quickSearches.map((search, index) => (
                <button
                  key={index}
                  className="quick-search-item"
                  onClick={() => handleQuickSearch(search)}
                >
                  <Search className="quick-search-icon" />
                  <span>{search}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Policies */}
        <section className="featured-section">
          <div className="featured-container">
            <div className="section-header">
              <h2 className="section-title">Recent Policy Updates</h2>
              <button
                className="view-all-button"
                onClick={() => navigate('/results')}
              >
                View All
                <ArrowRight className="arrow-icon" />
              </button>
            </div>
            
            <div className="policies-grid">
              {featuredPolicies.map(policy => (
                <PolicyCard
                  key={policy.id}
                  policy={policy}
                  onClick={() => navigate(`/document/${policy.id}`)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;