import React from 'react';
import ChatSearch from './ChatSearch';
import { useHistory } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Badge } from '@mui/material';

export default function JoinChat({ chats }) {
    const history = useHistory();
    return (
        <div className="list-container">
            <ChatSearch />
            <List className="items">
                {chats.map((chat) => (
                    <ListItem key={chat.id} onClick={() => history.push(`/chat/${chat.id}`)} button>
                        <ListItemAvatar>
                            <Badge color="primary" variant="dot" invisible={chat.status !== 'online'}>
                                <Avatar alt={chat.name} src={chat.image} />
                            </Badge>
                        </ListItemAvatar>
                        <ListItemText primary={chat.name} />
                    </ListItem>
                ))}
          </List>
        </div>
    )
}