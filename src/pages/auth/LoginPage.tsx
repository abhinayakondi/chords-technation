import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Link,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { testAccounts } from '../../utils/testData';

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showMFA, setShowMFA] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [roleTab, setRoleTab] = useState<'patient' | 'doctor' | 'admin'>('patient');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      otp: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, always show MFA step
        if (!showMFA) {
          setShowMFA(true);
          setLoading(false);
          return;
        }
        
        // Verify credentials against test accounts
        const account = testAccounts[roleTab];
        if (values.username === account.username && values.password === account.password) {
          login(roleTab);
          navigate(roleTab === 'doctor' ? '/doctor' : '/dashboard');
        } else {
          throw new Error('Invalid credentials');
        }
      } catch (err) {
        setError('Invalid credentials. Please try again.');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleRoleChange = (event: React.SyntheticEvent, newValue: 'patient' | 'doctor' | 'admin') => {
    setRoleTab(newValue);
    formik.setValues({
      username: testAccounts[newValue].username,
      password: testAccounts[newValue].password,
      otp: '',
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%' }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome to CHORDS
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Canada Health Operations & Record Data System
            </Typography>
          </Box>

          <Tabs
            value={roleTab}
            onChange={handleRoleChange}
            aria-label="login role tabs"
            sx={{ mb: 3 }}
          >
            <Tab label="Patient" value="patient" />
            <Tab label="Doctor" value="doctor" />
            <Tab label="Admin" value="admin" />
          </Tabs>

          <form onSubmit={formik.handleSubmit}>
            {!showMFA ? (
              <>
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
              </>
            ) : (
              <TextField
                fullWidth
                id="otp"
                name="otp"
                label="Enter OTP"
                value={formik.values.otp}
                onChange={formik.handleChange}
                sx={{ mb: 2 }}
                autoComplete="one-time-code"
              />
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                Test Account Credentials:
                <br />
                Username: {testAccounts[roleTab].username}
                <br />
                Password: {testAccounts[roleTab].password}
              </Typography>
            </Alert>

            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading || (!showMFA && !formik.values.username || !formik.values.password)}
              sx={{ mb: 2 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : showMFA ? (
                'Verify OTP'
              ) : (
                'Login'
              )}
            </Button>

            {!showMFA && (
              <Box sx={{ textAlign: 'center' }}>
                <Link href="/forgot-password" variant="body2" sx={{ mb: 1, display: 'block' }}>
                  Forgot Password?
                </Link>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Link href="/signup" variant="body2">
                    Sign Up
                  </Link>
                </Typography>
              </Box>
            )}
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage; 