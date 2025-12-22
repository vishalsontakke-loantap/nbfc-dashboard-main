import { ActivityRequest, UserInfo } from '../types/activity-request';

// Mock users
export const mockMaker: UserInfo = {
  id: 'user-001',
  first_name: 'Deepak',
  last_name: 'Prakash',
  email: 'deepak.prakash@bank.com',
  user_type: 'Maker'
};

export const mockChecker: UserInfo = {
  id: 'user-002',
  first_name: 'Priya',
  last_name: 'Sharma',
  email: 'priya.sharma@bank.com',
  user_type: 'Checker'
};

// Mock activity requests
export const mockActivityRequests: ActivityRequest[] = [
  {
    id: '1',
    activity_request_id: 'ARQ-2024-001',
    module_name: 'product',
    activity_type: 'create',
    status: 'pending',
    request_data: {
      product_name: 'Gold Loan Premium',
      product_code: 'GLP-001',
      interest_rate: 10.5,
      tenure_min: 6,
      tenure_max: 36,
      loan_amount_min: 50000,
      loan_amount_max: 5000000,
      processing_fee: 1.5,
      collateral_type: 'Gold',
      ltv_ratio: 75,
      description: 'Premium gold loan product with competitive rates'
    },
    created_by: mockMaker,
    created_at: '2024-12-20T10:30:00Z',
    submitted_at: '2024-12-20T10:35:00Z'
  },
  {
    id: '2',
    activity_request_id: 'ARQ-2024-002',
    module_name: 'nbfc',
    activity_type: 'create',
    status: 'pending',
    request_data: {
      nbfc_name: 'Fintech Capital Ltd',
      registration_number: 'NBFC-2024-789',
      pan: 'AABCF1234G',
      registered_address: '123, MG Road, Bangalore - 560001',
      contact_person: 'Rahul Mehta',
      contact_email: 'rahul.mehta@fintechcap.com',
      contact_phone: '+91-9876543210',
      license_number: 'RBI-NBFC-2024-789',
      license_expiry: '2029-12-31',
      maximum_loan_amount: 10000000,
      interest_rate_range: { min: 9.5, max: 18.0 }
    },
    created_by: mockMaker,
    created_at: '2024-12-21T14:20:00Z',
    submitted_at: '2024-12-21T14:25:00Z'
  },
  {
    id: '3',
    activity_request_id: 'ARQ-2024-003',
    module_name: 'bre',
    activity_type: 'update',
    status: 'approved',
    request_data: {
      rule_name: 'Credit Score Validation',
      rule_code: 'BRE-CS-001',
      conditions: {
        min_credit_score: 700,
        max_debt_ratio: 40,
        employment_type: ['Salaried', 'Self-Employed'],
        min_income: 30000
      },
      action: 'auto_approve',
      priority: 1
    },
    created_by: mockMaker,
    created_at: '2024-12-18T09:15:00Z',
    submitted_at: '2024-12-18T09:20:00Z',
    reviewed_by: mockChecker,
    reviewed_at: '2024-12-18T16:45:00Z'
  },
  {
    id: '4',
    activity_request_id: 'ARQ-2024-004',
    module_name: 'lending_rate',
    activity_type: 'create',
    status: 'rejected',
    request_data: {
      product_code: 'GLP-001',
      tenure: 12,
      base_rate: 10.0,
      margin: 2.5,
      effective_rate: 12.5,
      effective_from: '2025-01-01'
    },
    created_by: mockMaker,
    created_at: '2024-12-19T11:00:00Z',
    submitted_at: '2024-12-19T11:05:00Z',
    reviewed_by: mockChecker,
    reviewed_at: '2024-12-19T17:30:00Z',
    rejection_reason: 'Effective rate exceeds market competitive range. Please revise to max 12% for better customer acquisition.'
  },
  {
    id: '5',
    activity_request_id: 'ARQ-2024-005',
    module_name: 'user',
    activity_type: 'create',
    status: 'pending',
    request_data: {
      first_name: 'Amit',
      last_name: 'Kumar',
      email: 'amit.kumar@bank.com',
      role: 'Loan Officer',
      department: 'Operations',
      branch: 'Mumbai Central',
      phone: '+91-9123456789',
      reporting_manager: 'deepak.prakash@bank.com'
    },
    created_by: mockMaker,
    created_at: '2024-12-22T08:30:00Z',
    submitted_at: '2024-12-22T08:35:00Z'
  }
];
