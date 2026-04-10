import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faChartBar,
  faChartPie,
  faDownload,
  faCalendarAlt,
  faFileExport,
  faPrint,
  faEye,
  faUsers,
  faMoneyBillWave,
  faHotel,
  faCar,
  faMapMarkedAlt
} from '@fortawesome/free-solid-svg-icons';
import './AdminDashboard.css';

export function ReportsAnalytics() {
  const [dateRange, setDateRange] = useState('month');
  const [reportType, setReportType] = useState('revenue');

  return (
    <div className="reports-analytics">
      <div className="management-header">
        <h1>Reports & Analytics</h1>
        <div className="header-actions">
          <button className="export-btn">
            <FontAwesomeIcon icon={faFileExport} />
            Export Report
          </button>
          <button className="print-btn">
            <FontAwesomeIcon icon={faPrint} />
            Print
          </button>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="date-range-selector">
        <button className={dateRange === 'week' ? 'active' : ''} onClick={() => setDateRange('week')}>
          This Week
        </button>
        <button className={dateRange === 'month' ? 'active' : ''} onClick={() => setDateRange('month')}>
          This Month
        </button>
        <button className={dateRange === 'quarter' ? 'active' : ''} onClick={() => setDateRange('quarter')}>
          This Quarter
        </button>
        <button className={dateRange === 'year' ? 'active' : ''} onClick={() => setDateRange('year')}>
          This Year
        </button>
        <button className="custom-range">
          <FontAwesomeIcon icon={faCalendarAlt} />
          Custom Range
        </button>
      </div>

      {/* Report Type Tabs */}
      <div className="report-tabs">
        <button className={reportType === 'revenue' ? 'active' : ''} onClick={() => setReportType('revenue')}>
          <FontAwesomeIcon icon={faMoneyBillWave} />
          Revenue Report
        </button>
        <button className={reportType === 'bookings' ? 'active' : ''} onClick={() => setReportType('bookings')}>
          <FontAwesomeIcon icon={faChartLine} />
          Bookings Report
        </button>
        <button className={reportType === 'users' ? 'active' : ''} onClick={() => setReportType('users')}>
          <FontAwesomeIcon icon={faUsers} />
          User Analytics
        </button>
        <button className={reportType === 'services' ? 'active' : ''} onClick={() => setReportType('services')}>
          <FontAwesomeIcon icon={faHotel} />
          Service Performance
        </button>
      </div>

      {/* Report Content */}
      <div className="report-content">
        {reportType === 'revenue' && (
          <div className="revenue-report">
            <h2>Revenue Overview</h2>

            <div className="summary-cards">
              <div className="summary-card">
                <h3>Total Revenue</h3>
                <div className="value">$89,250</div>
                <div className="change positive">+15.3% vs last period</div>
              </div>
              <div className="summary-card">
                <h3>Average Order Value</h3>
                <div className="value">$258</div>
                <div className="change positive">+5.2% vs last period</div>
              </div>
              <div className="summary-card">
                <h3>Refunds</h3>
                <div className="value">$2,450</div>
                <div className="change negative">-2.1% vs last period</div>
              </div>
            </div>

            <div className="chart-container">
              <h3>Revenue by Service Type</h3>
              <div className="chart-placeholder">
                <div className="bar-chart">
                  <div className="bar-item">
                    <div className="bar-label">Hotels</div>
                    <div className="bar" style={{width: '75%'}}>$45,000</div>
                  </div>
                  <div className="bar-item">
                    <div className="bar-label">Tours</div>
                    <div className="bar" style={{width: '60%'}}>$32,000</div>
                  </div>
                  <div className="bar-item">
                    <div className="bar-label">Cars</div>
                    <div className="bar" style={{width: '45%'}}>$22,000</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="data-table">
              <h3>Daily Revenue Breakdown</h3>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Hotels</th>
                    <th>Tours</th>
                    <th>Cars</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2024-03-01</td>
                    <td>$2,450</td>
                    <td>$1,850</td>
                    <td>$950</td>
                    <td>$5,250</td>
                  </tr>
                  <tr>
                    <td>2024-03-02</td>
                    <td>$3,200</td>
                    <td>$2,100</td>
                    <td>$1,200</td>
                    <td>$6,500</td>
                  </tr>
                  <tr>
                    <td>2024-03-03</td>
                    <td>$2,800</td>
                    <td>$1,950</td>
                    <td>$1,100</td>
                    <td>$5,850</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {reportType === 'bookings' && (
          <div className="bookings-report">
            <h2>Booking Analytics</h2>

            <div className="summary-cards">
              <div className="summary-card">
                <h3>Total Bookings</h3>
                <div className="value">345</div>
                <div className="change positive">+12.5% vs last period</div>
              </div>
              <div className="summary-card">
                <h3>Conversion Rate</h3>
                <div className="value">68%</div>
                <div className="change positive">+3.2% vs last period</div>
              </div>
              <div className="summary-card">
                <h3>Cancellation Rate</h3>
                <div className="value">8%</div>
                <div className="change negative">+1.5% vs last period</div>
              </div>
            </div>

            <div className="chart-container">
              <h3>Bookings by Status</h3>
              <div className="pie-chart-container">
                <div className="pie-chart" style={{
                  background: 'conic-gradient(#10b981 0deg 219deg, #f59e0b 219deg 248deg, #ef4444 248deg 360deg)'
                }}></div>
                <div className="legend">
                  <div><span className="color confirmed"></span> Confirmed (210)</div>
                  <div><span className="color pending"></span> Pending (85)</div>
                  <div><span className="color cancelled"></span> Cancelled (50)</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}