import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { joinChat } from '../actions/chat';
import { Grid, Card, CardContent, Typography, Button, Container } from '@mui/material';
import './shared/scss/Avaliabelchats.scss'
export default function AvailableChats({ chats }) {
    const user = useSelector(({ auth }) => auth.user);
    const dispatch = useDispatch();

    const askForConfirmation = chat => {
        const isConfirming = confirm(`Do you want to join the chat: ${chat.name} ?`);

        if (isConfirming) {
            dispatch(joinChat(chat, user.uid));
        }
    }

    return (
        <Container maxWidth="lg" className="chat-list-container">
            <Grid container spacing={3}>
                {chats.length === 0 && (
                    <Grid item xs={12}>
                        <div className="alert alert-warning">No chats available</div>
                    </Grid>
                )}
                {chats.map((chat) => (
                    <Grid key={chat.id} item xs={12} md={6} lg={3} >
                        <Card className="chat-card">
                            <CardContent className="card-content">
                                <Typography variant="h5" component="div">
                                    {chat.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {chat.description}
                                </Typography>
                                <Button
                                    onClick={() => askForConfirmation(chat)}
                                    variant="outlined"
                                    color="primary"
                                    className="join-button"
                                >
                                    Join Chat
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}