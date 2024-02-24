import React, { useEffect } from 'react';
import JoinChat from '../componens/JoinedChats';
import AvailableChats from '../componens/AvailableChats';
import ViewTitle from '../componens/shared/ViewTitle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChats } from '../actions/chat'
import { withBaseLayout } from '../layouts/Base';
import Notification from '../utils/notifications';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';


function Home() {
    // ########## HOME VIEW START ############
    const dispatch = useDispatch();
    const joinedChats = useSelector(({ chats }) => chats.joined)
    const availableChats = useSelector(({ chats }) => chats.available)

    useEffect(() => {
        Notification.setup();
        dispatch(fetchChats())
    }, [dispatch])
    return (
         <div className="row no-gutters fh">
                <div className="col-3 fh">
                    <JoinChat chats={joinedChats} />
                </div>
                <div className="col-9 fh">
                    <ViewTitle text="Choose your channel">
                    <Button
                            variant="outlined"
                            color="primary"
                            component={Link}
                            to="/chatCreate"
                        >
                            <AddIcon />
                    </Button>
                    </ViewTitle>
                    <AvailableChats chats={availableChats} />
                </div>
        </div>

    )
    // ########## HOME VIEW END ############
}
export default withBaseLayout(Home);