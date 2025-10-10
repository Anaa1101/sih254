import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Building, 
  Tag, 
  Download, 
  Share2, 
  Bookmark, 
  BarChart3,
  ArrowLeft,
  FileText,
  Bot,
  TrendingUp
} from 'lucide-react';
import { mockPolicies } from '../data/mockData';
import Header from './Header';
import ChatPanel from './ChatPanel';
import './Document.css';

const Document = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [confidence, setConfidence] = useState(85);

  // Find the policy by ID
  const policy = mockPolicies.find(p => p.id === parseInt(id));

  useEffect(() => {
    // Simulate loading confidence score
    const timer = setTimeout(() => {
      setConfidence(Math.floor(Math.random() * 20) + 80); // Random between 80-100
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  if (!policy) {
    return (
      <div className="document-page">
        <Header />
        <div className="document-not-found">
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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

  const handleDownload = () => {
    // Simulate PDF download
    const element = document.createElement('a');
    const file = new Blob([policy.fullText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${policy.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: policy.title,
        text: policy.summary,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const highlightKeywords = (text) => {
    return text.split(' ').map((word, index) => {
      const isKeyword = policy.keywords.some(keyword => 
        word.toLowerCase().includes(keyword.toLowerCase())
      );
      return isKeyword ? (
        <span key={index} className="keyword-highlight">{word} </span>
      ) : (
        <span key={index}>{word} </span>
      );
    });
  };

  return (
    <div className="document-page">
      <Header />
      
      <main className="document-main">
        <div className="document-container">
          {/* Back Button */}
          <button 
            className="document-back-button"
            onClick={() => navigate('/results')}
          >
            <ArrowLeft className="back-icon" />
            Back to Results
          </button>

          <div className="document-layout">
            {/* Main Content */}
            <div className="document-content">
              {/* Document Header */}
              <div className="document-header">
                <div className="document-meta">
                  <div className="document-date">
                    <Calendar className="meta-icon" />
                    <span>{formatDate(policy.date)}</span>
                  </div>
                  <div className="document-source">
                    <Building className="meta-icon" />
                    <span>{policy.source}</span>
                  </div>
                </div>
                <div className={`document-category document-category-${categoryColor}`}>
                  <Tag className="category-icon" />
                  <span>{policy.category}</span>
                </div>
              </div>

              <h1 className="document-title">{policy.title}</h1>

              {/* Document Actions */}
              <div className="document-actions">
                <button className="action-button download-button" onClick={handleDownload}>
                  <Download className="action-icon" />
                  <span>Download PDF</span>
                </button>
                <button className="action-button share-button" onClick={handleShare}>
                  <Share2 className="action-icon" />
                  <span>Share</span>
                </button>
                <button 
                  className={`action-button bookmark-button ${isBookmarked ? 'bookmarked' : ''}`}
                  onClick={toggleBookmark}
                >
                  <Bookmark className={`action-icon ${isBookmarked ? 'filled' : ''}`} />
                  <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                </button>
                <button 
                  className="action-button analysis-button"
                  onClick={() => navigate(`/document/${id}/trends`)}
                >
                  <BarChart3 className="action-icon" />
                  <span>View Analysis</span>
                </button>
              </div>

              {/* Document Content */}
              <div className="document-text">
                <h2>Policy Overview</h2>
                <p className="document-summary">{policy.summary}</p>
                
                <div className="document-citations">
                  <h2>Citations & References</h2>
                  <div className="citations-list">
                    <div className="citation-item">
                      <span className="citation-number">[1]</span>
                      <div className="citation-content">
                        <p className="citation-text">
                          Official Government Gazette, {policy.source}, Published {formatDate(policy.date)}
                        </p>
                        <a href="#" className="citation-link">View Source →</a>
                      </div>
                    </div>
                    <div className="citation-item">
                      <span className="citation-number">[2]</span>
                      <div className="citation-content">
                        <p className="citation-text">
                          Ministry Archive Reference: GOI/{policy.category.toUpperCase()}/{new Date(policy.date).getFullYear()}/{policy.id.toString().padStart(4, '0')}
                        </p>
                        <a href="#" className="citation-link">View Archive →</a>
                      </div>
                    </div>
                    <div className="citation-item">
                      <span className="citation-number">[3]</span>
                      <div className="citation-content">
                        <p className="citation-text">
                          Related Legislative Framework: {policy.category} Act, {new Date(policy.date).getFullYear()}
                        </p>
                        <a href="#" className="citation-link">View Legislation →</a>
                      </div>
                    </div>
                  </div>
                </div>

                <h2>Full Policy Text</h2>
                <div className="document-full-text">
                  {highlightKeywords(policy.fullText)}
                </div>

                {/* Keywords Section */}
                <div className="document-keywords">
                  <h3>Key Terms</h3>
                  <div className="keywords-list">
                    {policy.keywords.map((keyword, index) => (
                      <span key={index} className="document-keyword">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="document-sidebar">
              {/* AI Summary Card */}
              <div className="ai-summary-card">
                <div className="ai-summary-header">
                  <Bot className="ai-icon" />
                  <h3>AI-Generated Summary</h3>
                </div>
                <div className="ai-summary-content">
                  <ul className="ai-summary-points">
                    <li>Comprehensive policy framework with clear implementation guidelines</li>
                    <li>Multi-phase approach with specific timelines and milestones</li>
                    <li>Significant budget allocation with transparent funding mechanisms</li>
                    <li>Focus on equity, inclusion, and sustainable development</li>
                    <li>Technology integration and digital transformation emphasis</li>
                  </ul>
                </div>
                <div className="ai-confidence">
                  <div className="confidence-header">
                    <TrendingUp className="confidence-icon" />
                    <span>Confidence Score</span>
                  </div>
                  <div className="confidence-bar">
                    <div 
                      className="confidence-fill"
                      style={{ width: `${confidence}%` }}
                    />
                  </div>
                  <div className="confidence-value">{confidence}%</div>
                </div>
              </div>

              {/* Document Stats */}
              <div className="document-stats">
                <h3>Document Statistics</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <FileText className="stat-icon" />
                    <div className="stat-content">
                      <div className="stat-value">{policy.fullText.split(' ').length}</div>
                      <div className="stat-label">Words</div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <Tag className="stat-icon" />
                    <div className="stat-content">
                      <div className="stat-value">{policy.keywords.length}</div>
                      <div className="stat-label">Keywords</div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <Calendar className="stat-icon" />
                    <div className="stat-content">
                      <div className="stat-value">{new Date().getFullYear() - new Date(policy.date).getFullYear()}</div>
                      <div className="stat-label">Years Old</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Policies */}
              <div className="related-policies">
                <h3>Related Policies</h3>
                <div className="related-list">
                  {mockPolicies
                    .filter(p => p.id !== policy.id && p.category === policy.category)
                    .slice(0, 3)
                    .map(relatedPolicy => (
                      <div 
                        key={relatedPolicy.id}
                        className="related-item"
                        onClick={() => navigate(`/document/${relatedPolicy.id}`)}
                      >
                        <h4 className="related-title">{relatedPolicy.title}</h4>
                        <p className="related-date">{formatDate(relatedPolicy.date)}</p>
                      </div>
                    ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Chat Panel */}
      <ChatPanel 
        isOpen={isChatOpen}
        onClose={setIsChatOpen}
        policyTitle={policy.title}
      />
    </div>
  );
};

export default Document;
