import { useState } from 'react';

export function usePasswordToggle() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return {
    showPassword,
    togglePasswordVisibility,
  };
}
