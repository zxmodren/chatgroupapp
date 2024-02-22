import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/auth';
import BackButton from './shared/BackButton';

function Navbar({ canGoBack, view }) {
    const dispatch = useDispatch();
    const user = useSelector(({ auth }) => auth.user);

    const handleLogout = () => {
        dispatch(logout());
    };


    return (
        <div className="chat-navbar">
            <nav className="chat-navbar-inner">
                <div className="chat-navbar-inner-left">
                    {canGoBack && <BackButton />}
                    {view !== 'Setting' &&
                        <Link
                            to="/setting"
                            className="btn btn-outline-success ml-2">Setting
                        </Link>
                    }
                </div>
                <div className="chat-navbar-inner-right">
                    {user &&
                        <>
                            <Link to="/editprofile">
                                <img
                                    className='avatar mr-2'
                                    src={user.avatar}
                                    alt="User Avatar"
                                />
                            </Link>
                            <span className='logged-in-user'>Hi {user.username}</span>
                            <button
                                onClick={handleLogout}
                                className="btn btn-outline-danger ml-4">Logout
                            </button>
                        </>
                    }
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
