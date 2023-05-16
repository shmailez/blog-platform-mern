import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form'

import { fetchRegistration, fetchUserData, selectIsAuth } from "../../redux/slices/auth";
import styles from './Login.module.scss';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export const Registration = () => {

  const isAuth = useSelector(selectIsAuth)

  const dispatch = useDispatch()
  
  const {
    register, 
    handleSubmit, 
    setError, 
    formState: {
      errors, 
      isValid
    }
  } = useForm({
    defaultValues:{
      fullName: '',
      email: '', 
      password: ''
    },
    mode: 'onChange'
  })
  
  const onSubmit = async (value) => {
    // console.log(dispatch(fetchUserData(value)))
    // dispatch(fetchUserData(value))
  const data = await dispatch(fetchRegistration(value))
    console.log(data)
  
  if(!data.payload) {
    alert('не удалось зарегаться')
  }
  if('token' in data.payload) {
    window.localStorage.setItem('token', data.payload.token)
  } 
  }
  
  if(isAuth) {
  return <Navigate to="/"/>
  }  

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
       <form onSubmit={handleSubmit(onSubmit)}>
       <TextField
      className={styles.field}
      label="Full-Name"
      error={Boolean(errors.fullName?.message)}
      helperText={errors.fullName?.message}
      {... register('fullName', { required: ' укажитье полное имя'})}
      fullWidth 
      />
      <TextField 
      className={styles.field}
      label="E-Mail"
      error={Boolean(errors.email?.message)}
      helperText={errors.email?.message}
      {... register('email', { required: ' укажитье почту'})}
      fullWidth />
      <TextField 
      className={styles.field}
      label="Пароль"
      error={Boolean(errors.password?.message)}
      helperText={errors.password?.message}
      {... register('password', { required: ' укажитье пароль'})}
      fullWidth />
      <Button type='submit' size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
       </form>
      
    </Paper>
  );
};
