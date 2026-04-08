import React from 'react';
import '../styles/authRequiredModal.css';

const AuthRequiredModal = ({ onLogin, onSignUp, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <div className="auth-modal-backdrop" onClick={onClose} />

      {/* Modal */}
      <div className="auth-modal">
        <div className="auth-modal-content">
          <button className="auth-modal-close" onClick={onClose}>
            ✕
          </button>

          <div className="auth-modal-header">
            <h2>Authorization Required</h2>
            <p>Please login or create an account to place an order</p>
          </div>

          <div className="auth-modal-body">
            <p className="auth-modal-message">
              To proceed with your purchase, you need to be logged in or create a new account.
            </p>
          </div>

          <div className="auth-modal-actions">
            <button className="auth-modal-login" onClick={onLogin}>
              Login to Account
            </button>
            <button className="auth-modal-signup" onClick={onSignUp}>
              Create New Account
            </button>
          </div>

          <button className="auth-modal-browse" onClick={onClose}>
            Continue Browsing
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthRequiredModal;
