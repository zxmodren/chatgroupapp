import React from 'react';
import { Typography, TextField, Button, Link, Card, CardContent } from '@mui/material';
import './style/style.scss';
export default function Register() {
    return (
        <div className="centered-view">
            <div className="centered-container">
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>Create an account</Typography>
                        <form onSubmit={handleSubmit} className="centered-container-form">
                            <div className="form-container">
                                <div className="form-group">
                                    <TextField
                                        label="Email"
                                        type="email"
                                        fullWidth
                                        variant="outlined"
                                        margin="normal"
                                        required
                                    />
                                    <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <TextField
                                        label="Username"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        margin="normal"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <TextField
                                        label="Avatar"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        margin="normal"
                                    />
                                </div>
                                <div className="form-group">
                                    <TextField
                                        label="Password"
                                        type="password"
                                        fullWidth
                                        variant="outlined"
                                        margin="normal"
                                        required
                                    />
                                </div>
                                {/* Error message */}
                                {/* <div className="alert alert-danger small">Some Error</div> */}
                                <Button type="submit" variant="outlined" color="primary">Register</Button>
                            </div>
                        </form>
                        <Typography variant="body2" className="mt-2">Not registered yet? <Link href="#" onClick={() => { }}>Register</Link></Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}