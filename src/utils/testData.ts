export const testAccounts = {
  doctor: {
    username: 'dr.smith',
    password: 'test1234',
    licenseNumber: 'MD123456',
    province: 'Ontario',
    role: 'doctor',
  },
  patient: {
    username: 'john.doe',
    password: 'test1234',
    healthCard: 'ON1234567',
    role: 'patient',
  },
  admin: {
    username: 'admin',
    password: 'admin1234',
    role: 'admin',
  },
};

export const testPatients = [
  {
    id: '1',
    name: 'John Doe',
    healthCardNumber: 'ON1234567',
    dateOfBirth: '1980-01-01',
    homeProvince: 'Ontario',
    digitalHealthId: 'DHI123456',
  },
  {
    id: '2',
    name: 'Jane Smith',
    healthCardNumber: 'BC9876543',
    dateOfBirth: '1975-05-15',
    homeProvince: 'British Columbia',
    digitalHealthId: 'DHI789012',
  },
];

export const testHealthRecords = [
  {
    id: '1',
    type: 'lab_result',
    title: 'Complete Blood Count (CBC)',
    date: '2024-02-15',
    provider: {
      name: 'Dr. Sarah Smith',
      organization: 'City General Hospital',
    },
    status: 'final',
    category: 'Hematology',
    description: 'Routine blood work including RBC, WBC, and platelet counts.',
  },
  {
    id: '2',
    type: 'imaging',
    title: 'Chest X-Ray',
    date: '2024-02-10',
    provider: {
      name: 'Dr. Michael Chen',
      organization: 'Radiology Partners',
    },
    status: 'final',
    category: 'Radiology',
    description: 'Routine chest X-ray examination, frontal and lateral views.',
  },
]; 