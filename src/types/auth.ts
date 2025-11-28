// src/types/auth.ts
export interface User {
  id: string;
  name?: string;
  email?: string;
  // add other profile fields as needed
}

export interface LoginRequest {
  userId: string;
  password: string;
}
export interface validateOTPRequest{
    userId: string;
    otp: string;
    taskId: string;
}

export interface validateOTPResponse{
    userId: string;
    accessToken: string;
    taskId: string;
}

export interface LoginResponse {
  accessToken: string;           // short-lived JWT / token
  user?: User;                   // optional profile included in response
  // refresh token should be httpOnly cookie set by server (recommended)
}
