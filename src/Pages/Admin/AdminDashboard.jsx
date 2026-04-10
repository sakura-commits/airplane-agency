import React, { useState } from 'react';
import { DashboardLayout } from '../../Components/DashboardLayout';
import { AdminOverview } from './AdminOverview';
import { UserManagement } from './UserManagement';
import { ProviderManagement } from './ProviderManagement';
import { HotelManagement } from './HotelManagement';
import { CarManagement } from './CarManagement';
import { TourManagement } from './TourManagement';
import { GuideManagement } from './GuideManagement';
import { BookingManagement } from './BookingManagement';
import { PaymentManagement } from './PaymentManagement';
import { CommissionManagement } from './CommissionManagement';
import { ReportsAnalytics } from './ReportsAnalytics';
import { SystemSettings } from './SystemSettings';

export function AdminDashboard({ onLogout }) {
  const [activeSection, setActiveSection] = useState('overview');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const renderContent = () => {
    switch(activeSection) {
      case 'overview':
        return <AdminOverview />;
      case 'users':
        return <UserManagement />;
      case 'providers':
        return <ProviderManagement />;
      case 'hotels':
        return <HotelManagement />;
      case 'cars':
        return <CarManagement />;
      case 'tours':
        return <TourManagement />;
      case 'guides':
        return <GuideManagement />;
      case 'bookings':
        return <BookingManagement />;
      case 'payments':
        return <PaymentManagement />;
      case 'commissions':
        return <CommissionManagement />;
      case 'reports':
        return <ReportsAnalytics />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <DashboardLayout
      activeSection={activeSection}
      onNavigate={setActiveSection}
      user={user}
      onLogout={onLogout}
    >
      {renderContent()}
    </DashboardLayout>
  );
}
