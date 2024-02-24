import React from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './shared/scss/search.scss';

export default function ChatSearch() {
    return (
        <div className="chat-search-box">
        <div className="input-group">
            <TextField
                className="form-control"
                placeholder="Search"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    </div>
       
    )
}