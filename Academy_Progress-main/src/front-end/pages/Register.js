import './Register.css';
import Navbar from '../components/componentsRegister/Navbar';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Register - Faculty of Science';
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    universityId: '',
    password: '',
    confirmPassword: '',
    role: 'Student',
    department: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    if (!formData.universityId.trim()) {
      newErrors.universityId = 'University ID is required';
    } else if (!/^[0-9]+$/.test(formData.universityId)) {
      newErrors.universityId = 'University ID must contain numbers only';
    }
    if (formData.role === 'Student' && !formData.department.trim()) {
      newErrors.department = 'Department is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage('');
      return;
    }

    setErrors({});

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message || 'Registration failed');
        return;
      }

      setSuccessMessage('Registration completed successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1200);
    } catch (error) {
      setServerError('Cannot connect to server. Make sure backend is running.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        <h1 className="register-title">Create Account</h1>
        <p className="register-subtitle">Academic progress & Early Warning</p>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {serverError && <p className="error-text" style={{ textAlign: 'center', marginBottom: '10px' }}>{serverError}</p>}

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            className="register-input"
            name="fullName"
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) => {
              setFormData({ ...formData, fullName: e.target.value });
              setErrors({ ...errors, fullName: '' });
            }}
          />
          {errors.fullName && <p className="error-text">{errors.fullName}</p>}

          <input
            className="register-input"
            name="email"
            type="email"
            placeholder="Institutional Email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              setErrors({ ...errors, email: '' });
            }}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <input
            className="register-input"
            name="universityId"
            type="text"
            placeholder="University ID"
            value={formData.universityId}
            onChange={(e) => {
              setFormData({ ...formData, universityId: e.target.value });
              setErrors({ ...errors, universityId: '' });
            }}
          />
          {errors.universityId && <p className="error-text">{errors.universityId}</p>}

          <select
            className="register-select"
            name="role"
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value, department: '' })
            }
          >
            <option value="Student">Student</option>
            <option value="Advisor">Advisor</option>
            <option value="Instructor">Instructor</option>
          </select>

          {formData.role === 'Student' && (
            <>
              <input
                className="register-input"
                name="department"
                type="text"
                placeholder="Department"
                value={formData.department}
                onChange={(e) => {
                  setFormData({ ...formData, department: e.target.value });
                  setErrors({ ...errors, department: '' });
                }}
              />
              {errors.department && <p className="error-text">{errors.department}</p>}
            </>
          )}

          <input
            className="register-input"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              setErrors({ ...errors, password: '', confirmPassword: '' });
            }}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <input
            className="register-input"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => {
              setFormData({ ...formData, confirmPassword: e.target.value });
              setErrors({ ...errors, confirmPassword: '' });
            }}
          />
          {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

          <button className="register-button" type="submit">
            Create Account
          </button>
          <Link id="loginFromHereLink" to="/login">
            Already have an account? Login from here
          </Link>
        </form>
      </div>
    </>
  );
}

export default Register;