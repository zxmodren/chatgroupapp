import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/auth';
import BackButton from './shared/BackButton';
import { Button, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import { AccountCircle, Settings as SettingsIcon, ExitToApp } from '@mui/icons-material';


function Navbar({ canGoBack, view }) {
    const dispatch = useDispatch();
    const user = useSelector(({ auth }) => auth.user);
    const handleLogout = () => {
        dispatch(logout());
    };


    return (

        <div className="chat-navbar">
            <AppBar className="chat-navbar-inner">
                <Toolbar>
                    <div className="chat-navbar-inner-left" style={{ flexGrow: 1 }}>
                        <div>
                            {canGoBack && <BackButton />}
                                {view !== 'Setting' && 
                                    <Link
                                        to="/setting"
                                        style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Button color="inherit" style={{marginLeft: '10px' }}>
                                        <SettingsIcon />
                                    </Button>
                                    </Link>
                                }
                        </div>
                    </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            {user &&
                                <>
                                    <IconButton color="inherit" component={Link} to="/editprofile">
                                        {user.avatar ? (
                                            <img
                                                className='avatar mr-2'
                                                src={user.avatar}
                                                alt="User Avatar"
                                                style={{ marginRight: '10px' }}
                                            />
                                        ) : (
                                            <AccountCircle />
                                        )}
                                    </IconButton>
                                    <Typography variant="body1" color="inherit" className='logged-in-user' style={{ marginRight: '10px' }}>
                                        Hi {user.username}
                                    </Typography>
                            <Button color="inherit" onClick={handleLogout} className='btn' style={{ backgroundColor: 'red', marginRight: '20px' }}>
                                <ExitToApp />
                            </Button>
                                </>
                            }
                     </div>
                </Toolbar>
            </AppBar>
            </div>
    );
}

export default Navbar;
