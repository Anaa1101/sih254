import React from 'react';
import { Calendar, Building, Tag, ArrowRight } from 'lucide-react';
import './PolicyCard.css';

const PolicyCard = ({ policy, onClick }) => {
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

  const categoryColor = getCategoryColor(policy.category);

  return (
    <div className="policy-card" onClick={onClick}>
      <div className="policy-card-header">
        <div className="policy-meta">
          <div className="policy-date">
            <Calendar className="meta-icon" />
            <span>{formatDate(policy.date)}</span>
          </div>
          <div className="policy-source">
            <Building className="meta-icon" />
            <span>{policy.source}</span>
          </div>
        </div>
        <div className={`policy-category policy-category-${categoryColor}`}>
          <Tag className="category-icon" />
          <span>{policy.category}</span>
        </div>
      </div>

      <div className="policy-card-content">
        <h3 className="policy-title">{policy.title}</h3>
        <p className="policy-summary">{policy.summary}</p>
        
        <div className="policy-keywords">
          {policy.keywords.slice(0, 4).map((keyword, index) => (
            <span key={index} className="policy-keyword">
              {keyword}
            </span>
          ))}
          {policy.keywords.length > 4 && (
            <span className="policy-keyword-more">
              +{policy.keywords.length - 4} more
            </span>
          )}
        </div>
      </div>

      <div className="policy-card-footer">
        <div className="policy-actions">
          <button className="read-more-button">
            Read Full Policy
            <ArrowRight className="arrow-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyCard;
