// Core types for Activity Requests API

export type ActivityType = 'create' | 'update' | 'delete';
export type ActivityStatus = 'draft' | 'pending' | 'approved' | 'rejected';
export type ModuleName = 'product' | 'nbfc' | 'bre' | 'lending_rate' | 'user' | 'role';

export interface UserInfo {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  user_type: string;
}

export interface ActivityRequest {
  id: string;
  activity_request_id: string;
  module_name: ModuleName;
  activity_type: ActivityType;
  status: ActivityStatus;
  request_data: Record<string, any>;
  created_by: UserInfo;
  created_at: string;
  reviewed_by?: UserInfo;
  reviewed_at?: string;
  rejection_reason?: string;
  submitted_at?: string;
}

export interface AuditLogEntry {
  action: string;
  user: UserInfo;
  timestamp: string;
  remarks?: string;
  status: ActivityStatus;
}
