import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { 
  Search, 
  Filter, 
  X, 
  Calendar, 
  Building, 
  Tag, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  ArrowRight
} from 'lucide-react';
import { mockPolicies, categories, sources, years } from '../data/mockData';
import Header from './Header';
import './Results.css';

const Results = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: 'All Categories',
    source: 'All Sources',
    year: 'All Years'
  });
  const { searchQuery, setSearchQuery } = useAppContext();
  const navigate = useNavigate();
  
  const resultsPerPage = 6;

  // Filter and search logic
  const filteredResults = useMemo(() => {
    let filtered = mockPolicies;

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(policy => 
        policy.title.toLowerCase().includes(query) ||
        policy.summary.toLowerCase().includes(query) ||
        policy.fullText.toLowerCase().includes(query) ||
        policy.keywords.some(keyword => keyword.toLowerCase().includes(query))
      );
    }

    // Apply filters
    if (filters.category !== 'All Categories') {
      filtered = filtered.filter(policy => policy.category === filters.category);
    }

    if (filters.source !== 'All Sources') {
      filtered = filtered.filter(policy => policy.source === filters.source);
    }

    if (filters.year !== 'All Years') {
      filtered = filtered.filter(policy => {
        const policyYear = new Date(policy.date).getFullYear().toString();
        return policyYear === filters.year;
      });
    }

    return filtered;
  }, [searchQuery, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentResults = filteredResults.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already handled by the context
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'All Categories',
      source: 'All Sources',
      year: 'All Years'
    });
    setSearchQuery('');
  };

  const highlightText = (text, query) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="highlight">{part}</mark>
      ) : (
        part
      )
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Education': 'blue',
      'Healthcare': 'green',
      'Infrastructure': 'purple',
      'Agriculture': 'orange',
      'Business': 'indigo',
      'Environment': 'emerald',
      'Finance': 'yellow',
      'Housing': 'pink',
      'Energy': 'red',
      'Technology': 'cyan',
      'Food Security': 'amber'
    };
    return colors[category] || 'gray';
  };

  return (
    <div className="results-page">
      <Header />
      
      <main className="results-main">
        {/* Search Header */}
        <section className="search-header">
          <div className="search-header-container">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-wrapper">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search policies, documents, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  Search
                </button>
              </div>
            </form>

            <div className="search-info">
              <div className="results-count">
                {filteredResults.length} results found
                {searchQuery && ` for "${searchQuery}"`}
              </div>
              <button
                className="filters-toggle-mobile"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              >
                <Filter className="filter-icon" />
                Filters
                <Menu className="menu-icon" />
              </button>
            </div>
          </div>
        </section>

        <div className="results-content">
          {/* Filters Sidebar */}
          <aside className={`filters-sidebar ${isFiltersOpen ? 'open' : ''}`}>
            <div className="filters-header">
              <h3>Filters</h3>
              <button
                className="clear-filters"
                onClick={clearFilters}
              >
                Clear All
              </button>
            </div>

            <div className="filter-section">
              <h4 className="filter-title">Category</h4>
              <div className="filter-options">
                {categories.slice(1).map(category => (
                  <label key={category} className="filter-option">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={filters.category === category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="filter-radio"
                    />
                    <span className="filter-label">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4 className="filter-title">Source</h4>
              <div className="filter-options">
                {sources.slice(1).map(source => (
                  <label key={source} className="filter-option">
                    <input
                      type="radio"
                      name="source"
                      value={source}
                      checked={filters.source === source}
                      onChange={(e) => handleFilterChange('source', e.target.value)}
                      className="filter-radio"
                    />
                    <span className="filter-label">{source}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4 className="filter-title">Year</h4>
              <div className="filter-options">
                {years.slice(1).map(year => (
                  <label key={year} className="filter-option">
                    <input
                      type="radio"
                      name="year"
                      value={year}
                      checked={filters.year === year}
                      onChange={(e) => handleFilterChange('year', e.target.value)}
                      className="filter-radio"
                    />
                    <span className="filter-label">{year}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Results List */}
          <div className="results-list">
            {currentResults.length === 0 ? (
              <div className="no-results">
                <div className="no-results-icon">
                  <Search />
                </div>
                <h3>No results found</h3>
                <p>Try adjusting your search terms or filters to find what you're looking for.</p>
                <button className="clear-search-button" onClick={clearFilters}>
                  Clear Search & Filters
                </button>
              </div>
            ) : (
              <>
                <div className="results-grid">
                  {currentResults.map(policy => {
                    const categoryColor = getCategoryColor(policy.category);
                    return (
                      <div
                        key={policy.id}
                        className="result-card"
                        onClick={() => navigate(`/document/${policy.id}`)}
                      >
                        <div className="result-header">
                          <div className="result-meta">
                            <div className="result-date">
                              <Calendar className="meta-icon" />
                              <span>{formatDate(policy.date)}</span>
                            </div>
                            <div className="result-source">
                              <Building className="meta-icon" />
                              <span>{policy.source}</span>
                            </div>
                          </div>
                          <div className={`result-category result-category-${categoryColor}`}>
                            <Tag className="category-icon" />
                            <span>{policy.category}</span>
                          </div>
                        </div>

                        <div className="result-content">
                          <h3 className="result-title">
                            {highlightText(policy.title, searchQuery)}
                          </h3>
                          <p className="result-summary">
                            {highlightText(policy.summary, searchQuery)}
                          </p>
                          
                          <div className="result-keywords">
                            {policy.keywords.slice(0, 3).map((keyword, index) => (
                              <span key={index} className="result-keyword">
                                {highlightText(keyword, searchQuery)}
                              </span>
                            ))}
                            {policy.keywords.length > 3 && (
                              <span className="result-keyword-more">
                                +{policy.keywords.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="result-footer">
                          <button className="read-full-button">
                            Read Full Policy
                            <ArrowRight className="arrow-icon" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      className="pagination-button"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="pagination-icon" />
                      Previous
                    </button>

                    <div className="pagination-pages">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          className={`pagination-page ${currentPage === page ? 'active' : ''}`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      className="pagination-button"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="pagination-icon" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filters Overlay */}
      {isFiltersOpen && (
        <div 
          className="filters-overlay"
          onClick={() => setIsFiltersOpen(false)}
        />
      )}
    </div>
  );
};

export default Results;
