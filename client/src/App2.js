import React from 'react';
import { Login } from './components';

export default function App() {
  const onLogin = ({ email, password }) => {
    console.log({ email, password });
  };
  return <Login onLogin={onLogin} />;
}
