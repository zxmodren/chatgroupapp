import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/auth';
import LoadingView from './shared/LoadingView';
import { TextField, Button, Typography, Grid, IconButton } from '@mui/material';
import { Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material';

export default function Registerf() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const error = useSelector(({ auth }) => auth.register.error)
    const isChecking = useSelector(({ auth }) => auth.register.isChecking)
    const onSubmit = registerData => {
        dispatch(registerUser(registerData))
    }
    if (isChecking) {
        return <LoadingView />
    }
    return (

        <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
             <Typography variant="h5" gutterBottom>Create an Account</Typography>
            <div className="form-container">
                <div className="form-group">
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <EmailIcon />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                variant="outlined"
                                {...register('email', { required: true })}
                                error={Boolean(errors.email)}
                                helperText={errors.email ? 'Email is required' : ''}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className="form-group">
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <LockIcon />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                variant="outlined"
                                {...register('password', { required: true })}
                                error={Boolean(errors.password)}
                                helperText={errors.password ? 'Password is required' : ''}
                            />
                        </Grid>
                    </Grid>
                </div>
                {error && <div className="alert alert-danger small">{error.message}</div>}
                <Button type="submit" variant="contained" color="primary" fullWidth>Register</Button>
            </div>
        </form>

    )
}