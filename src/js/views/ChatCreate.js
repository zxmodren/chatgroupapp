import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { withBaseLayout } from '../layouts/Base';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createChat } from '../actions/chat';
import { Typography, TextField, Button, Card, CardContent, Grid } from '@mui/material';
import md5 from 'crypto-js/md5';

function ChatCreate() {
    const { register, handleSubmit } = useForm();
    const user = useSelector(({ auth }) => auth.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const [imageUrl, setImageUrl] = useState('');

    const onSubmit = (data) => {
        const emailHash = md5(user.email.trim().toLowerCase()); // Membuat hash dari email pengguna
        const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;

        setImageUrl(gravatarUrl);

        const chatData = {
            name: data.name,
            description: data.description,
            image: gravatarUrl,
        };

        dispatch(createChat(chatData, user.uid))
            .then(_ => history.push('/home'));
    };

    return (
        <div className="centered-view">
            <div className="centered-container">
                <Card>
                    <CardContent>
                        <Typography variant="h4" align="center">Create Chat Now!</Typography>
                        <Typography variant="subtitle1" align="center">Chat with people you know</Typography>
                        <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
                            <div className="form-container">
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            {...register('name')}
                                            label="Name"
                                            id="name"
                                            name="name"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            {...register('description')}
                                            label="Description"
                                            id="description"
                                            name="description"
                                            multiline
                                            rows={4}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            {...register('image')}
                                            id="image"
                                            name="image"
                                            label="Image"
                                            defaultValue={imageUrl}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                        >
                                            Create
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default withBaseLayout(ChatCreate, { canGoBack: true });
