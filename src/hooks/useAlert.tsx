import { useState } from 'react';

const useAlert = () => {
  const [alertState, setAlertState] = useState({
    visible: false,
    title: '',
    message: '',
    confirmText: 'OK',
    onConfirm: null,
  });

  const showAlert = (title, message, options = {}) => {
    setAlertState({
      visible: true,
      title,
      message,
      confirmText: options.confirmText || 'OK',
      onConfirm: options.onConfirm || null,
    });
  };

  const hideAlert = () => {
    setAlertState(prev => ({ ...prev, visible: false }));
  };

  return {
    alertState,
    showAlert,
    hideAlert,
  };
};

export default useAlert;
