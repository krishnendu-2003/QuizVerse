import React, { useState } from 'react';
import { ethers } from 'ethers';

const LoginPage = ({ onLogin }) => {
  const [account, setAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const accountAddress = await signer.getAddress();
        setAccount(accountAddress);
        setErrorMessage('');
        onLogin();
      } else {
        setErrorMessage('MetaMask is not installed. Please install it to use this app.');
      }
    } catch (error) {
      setErrorMessage('Failed to connect to MetaMask. Please try again.');
    }
  };

  return (
    <div 
      className="login-page" 
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // Light background color
        color: '#000', // Text color
      }}
    >
      <div style={{ 
        textAlign: 'center', 
        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
        padding: '20px', 
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}>
        <h2>Login with MetaMask</h2>
        {account ? (
          <p>Connected Account: {account}</p>
        ) : (
          <button onClick={connectWallet}>Connect Wallet & Login</button>
        )}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
