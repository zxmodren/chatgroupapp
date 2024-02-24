import React from 'react';
import { Box, Typography } from '@mui/material';
export default function ViewTitle({ text, children }) {
    return (
        <Box className="chat-name-container">
        <Typography variant="body1" className="name">{text}</Typography>
        <div>{children}</div>
        </Box>
    )
}