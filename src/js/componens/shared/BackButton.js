import React from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function BackButton() {
    const history = useHistory();

    return (
        <IconButton
        onClick={() => history.goBack()}
        color="#F5EBFF"
        aria-label="back"
    >
        <ArrowBackIcon />
        </IconButton>
    )
}