import React from 'react';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import './shared/scss/chatuserlist.scss';
export default function Chatuserlist({ users = [] }) {
    return (
        <div className="list-container">
            <Paper component="div" className="chat-search-box">
                <div className="input-group">
                    <SearchIcon />
                    <InputBase className="form-control" placeholder="Search" />
                </div>
            </Paper>
            <List>
                {users.map((user) => (
                    <ListItem key={user.uid} className="item">
                        <ListItemAvatar>
                            <Avatar alt="User Avatar" src={user.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography variant="h6" className="name">
                                    {user.username}
                                </Typography>
                            }
                            secondary={
                                <span className={`status ${user.state}`}></span>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}