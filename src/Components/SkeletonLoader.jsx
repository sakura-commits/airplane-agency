import React from 'react';

export const SkeletonCard = ({ lines = 3, height = '120px' }) => (
  <div className="skeleton-card">
    <div className="skeleton-image" style={{ height }} />
    <div className="skeleton-content">
      {[...Array(lines)].map((_, i) => (
        <div
          key={i}
          className="skeleton-line"
          style={{ width: `${90 - i * 15}%` }}
        />
      ))}
    </div>
  </div>
);

export const SkeletonTable = ({ rows = 5, cols = 6 }) => (
  <div className="skeleton-table">
    <div className="skeleton-header">
      {[...Array(cols)].map((_, i) => (
        <div
          key={i}
          className="skeleton-line"
          style={{ width: '100%', height: '20px' }}
        />
      ))}
    </div>

    {[...Array(rows)].map((_, i) => (
      <div key={i} className="skeleton-row">
        {[...Array(cols)].map((_, j) => (
          <div key={j} className="skeleton-cell" />
        ))}
      </div>
    ))}
  </div>
);

export const SkeletonStats = ({ count = 4 }) => (
  <div className="stats-grid skeleton-stats">
    {[...Array(count)].map((_, i) => (
      <div key={i} className="skeleton-stat-card">
        <div className="skeleton-icon" />
        <div className="skeleton-stat-content">
          <div className="skeleton-line" style={{ width: '60%' }} />
          <div className="skeleton-line" style={{ width: '80%', height: '32px' }} />
        </div>
      </div>
    ))}
  </div>
);
