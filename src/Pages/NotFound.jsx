import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '70vh',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div style={{
        fontSize: '8rem',
        fontWeight: 'bold',
        color: '#e2e8f0',
        marginBottom: '1rem'
      }}>
        404
      </div>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#1a202c',
        marginBottom: '1rem'
      }}>
        Page Not Found
      </h1>
      <p style={{
        fontSize: '1.125rem',
        color: '#718096',
        marginBottom: '2rem',
        maxWidth: '500px'
      }}>
        Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
      </p>
      <div style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#1a237e',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '0.5rem',
            fontWeight: '500',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0d1b5e'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#1a237e'}
        >
          <FontAwesomeIcon icon={faHome} />
          Go Home
        </Link>
        <button
          onClick={() => window.history.back()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: 'transparent',
            color: '#1a237e',
            border: '2px solid #1a237e',
            borderRadius: '0.5rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#1a237e';
            e.target.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#1a237e';
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Go Back
        </button>
      </div>
    </div>
  );
}