import React from 'react'
import { Paper, Typography, TextField, Button } from '@mui/material'
import styles from '../../styles/modules/Login/Form.module.css'
import * as Yup from "yup";
import useValidations from '../../lib/hooks/useValidations'
import useAuthentication from '../../lib/hooks/useAuthentication'
import { useRouter } from 'next/router'
import { pages } from '../../lib/utils';

export default function LoginForm() {
  const { login } = useAuthentication();
  const router = useRouter();
  const { formValue: email, handleChange: handleEmailChange, isValueValid: isEmailValid } = useValidations("email@dominio.com", Yup.string().email().required());
  const { formValue: password, handleChange: handlePasswordChange, isValueValid: isPasswordValid } = useValidations("********", Yup.string().required());

  async function onLogin() {
    await login(email, password);
    router.push(pages.Index.route)
  }

  function getEmailFieldTags() {
    if (!isEmailValid)
      return { error: true, helperText: "Email invalido" };

    return {};
  }

  function getPasswordFieldTags() {
    if (!isPasswordValid)
      return { error: true, helperText: "Senha invalida" };

    return {};
  }

  function getButtonTags() {
    if (isPasswordValid && isEmailValid)
      return {};

    return { disabled: true };
  }

  return (
    <Paper>
      <div className={styles.stack}>
        <Typography variant="h4" alignSelf="stretch" component="div">
          Entrar
        </Typography>
        <TextField {...getEmailFieldTags()} required id="outlined-email" value={email} onChange={handleEmailChange} label="Email" variant="outlined" />
        <TextField {...getPasswordFieldTags()} required id="outlined-password" type="password" value={password} onChange={handlePasswordChange} label="Senha" variant="outlined" />
        <Button {...getButtonTags()} onClick={onLogin} variant="contained" fullWidth sx={{
          color: "#FFFFFF"
        }}>
          Entrar
        </Button>
      </div>
    </Paper>
  );
}