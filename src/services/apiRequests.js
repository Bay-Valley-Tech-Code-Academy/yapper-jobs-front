import { BASE_URL } from './config'

const apiService = {
  register: async (role, data) => {
    const endpoint = role === "employer" ? `${BASE_URL}/register/employer` : `${BASE_URL}/register/seeker`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Registration failed');
    return response.json();
  },

    login: async (email, pass, isEmployer) => {
      const endpoint = isEmployer ? `${BASE_URL}/login/employer` : `${BASE_URL}/login/seeker`;
  
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, pass: pass }),
      });
  
      if (!response.ok) throw new Error('Sign in request failed');
      return response.json();
    },
  
    forgetPassword: async (email) => {
      const response = await fetch(`${BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send email');
      }
  
      return response.json();
    },
  
    resetPassword: async (newPassword, token) => {
      const response = await fetch(`${BASE_URL}/reset-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword: newPassword, token: token }),
      });
  
      if (!response.ok) throw new Error('Password reset request failed');
      return response.json();
    },
  };

export { apiService };