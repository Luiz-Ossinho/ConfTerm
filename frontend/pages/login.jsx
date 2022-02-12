import Logo from '../components/Login/Logo'
import React from 'react';
import useShowExtra from '../lib/hooks/useShowExtra'

export default function Login() {
  useShowExtra(false);

  return (
    <Logo />
  )
};