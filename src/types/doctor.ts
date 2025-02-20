export interface Patient {
  id: string;
  healthCardNumber: string;
  name: string;
  dateOfBirth: string;
  homeProvince: string;
  digitalHealthId: string;
}

export type VisitReason = 
  | 'emergency_care'
  | 'consultation'
  | 'referral'
  | 'follow_up'
  | 'specialist_visit';

export interface VisitReasonOption {
  value: VisitReason;
  label: string;
  description: string;
}

export interface AuthenticationRequest {
  patientId: string;
  authenticationType: 'biometric' | 'otp';
  timestamp: string;
}

export interface AccessLog {
  id: string;
  doctorId: string;
  patientId: string;
  timestamp: string;
  action: string;
  visitReason: VisitReason;
  accessedData: string[];
}

export interface DoctorCredentials {
  username: string;
  password: string;
  licenseNumber: string;
  province: string;
}

export interface PatientAuthenticationStatus {
  isAuthenticated: boolean;
  method: 'biometric' | 'otp' | null;
  timestamp: string | null;
  expiresAt: string | null;
} 