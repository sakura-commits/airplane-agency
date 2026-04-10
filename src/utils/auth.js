// src/utils/auth.js
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  PROVIDER: 'provider',
  GUIDE: 'guide',
  AGENT: 'agent',
  CUSTOMER: 'customer'
};

export const AUTH_CREDENTIALS = {
  // Admin users
  [ROLES.SUPER_ADMIN]: {
    email: 'superadmin@airkulty.com',
    password: 'Admin@123',
    name: 'Super Admin',
    dashboard: '/admin/dashboard'
  },
  [ROLES.ADMIN]: {
    email: 'admin@airkulty.com',
    password: 'Admin@123',
    name: 'Admin User',
    dashboard: '/admin/dashboard'
  },
  [ROLES.MANAGER]: {
    email: 'manager@airkulty.com',
    password: 'Manager@123',
    name: 'Operations Manager',
    dashboard: '/admin/dashboard'
  },

  // Service providers
  [ROLES.PROVIDER]: {
    email: 'provider@airkulty.com',
    password: 'Provider@123',
    name: 'Hotel Provider',
    dashboard: '/provider/dashboard'
  },

  // Tour guides
  [ROLES.GUIDE]: {
    email: 'guide@airkulty.com',
    password: 'Guide@123',
    name: 'Joseph Maasai',
    dashboard: '/guide/dashboard'
  },

  // Travel agents
  [ROLES.AGENT]: {
    email: 'agent@airkulty.com',
    password: 'Agent@123',
    name: 'Travel Agent',
    dashboard: '/agent/dashboard'
  },

  // Regular customers
  [ROLES.CUSTOMER]: {
    email: 'customer@airkulty.com',
    password: 'Customer@123',
    name: 'Regular Customer',
    dashboard: '/home'
  },
  'john@example.com': {
    email: 'john@example.com',
    password: 'John@123',
    name: 'John Doe',
    role: ROLES.CUSTOMER,
    dashboard: '/home'
  },
  'sarah@example.com': {
    email: 'sarah@example.com',
    password: 'Sarah@123',
    name: 'Sarah Johnson',
    role: ROLES.CUSTOMER,
    dashboard: '/home'
  },
  'michael@example.com': {
    email: 'michael@example.com',
    password: 'Michael@123',
    name: 'Michael Chen',
    role: ROLES.CUSTOMER,
    dashboard: '/home'
  }
};

export const authenticateUser = (email, password) => {
  // First check if email exists directly in AUTH_CREDENTIALS
  if (AUTH_CREDENTIALS[email] && AUTH_CREDENTIALS[email].password === password) {
    const userData = AUTH_CREDENTIALS[email];
    return {
      success: true,
      user: {
        ...userData,
        role: userData.role || ROLES.CUSTOMER // Default to customer if no role specified
      }
    };
  }

  // Then check role-based credentials
  const user = Object.values(AUTH_CREDENTIALS).find(
    cred => cred.email === email && cred.password === password
  );

  if (user) {
    const role = Object.keys(AUTH_CREDENTIALS).find(
      key => AUTH_CREDENTIALS[key].email === email
    );

    return {
      success: true,
      user: {
        ...user,
        role: user.role || role || ROLES.CUSTOMER
      }
    };
  }

  return {
    success: false,
    error: 'Invalid email or password'
  };
};

export const getUserDashboard = (role) => {
  switch(role) {
    case ROLES.SUPER_ADMIN:
    case ROLES.ADMIN:
    case ROLES.MANAGER:
      return '/admin/dashboard';
    case ROLES.PROVIDER:
      return '/provider/dashboard';
    case ROLES.GUIDE:
      return '/guide/dashboard';
    case ROLES.AGENT:
      return '/agent/dashboard';
    case ROLES.CUSTOMER:
    default:
      return '/home';  // Regular customers go to home
  }
};