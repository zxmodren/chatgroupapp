import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StoreProvider from './store/StoreProvider';
import Homev from './views/Home';
import Chatv from './views/Chat';
import Settingv from './views/Setting';
import Welcomev from './views/Welcome';
import EProfile from './views/eprofile';
import LoadingView from './componens/shared/LoadingView';
import { listenToAuthChanges } from './actions/auth';
import ChatCreate from './views/ChatCreate';
import { checkUserConnection } from './actions/connection';
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import { listenToConnectionChanges } from './actions/app';
import { loadInitialSettings } from './actions/setting';


function AuthRoute({ children, ...rest }) {
    const user = useSelector(({ auth }) => auth.user)
    const onlyChild = React.Children.only(children);
    return (
        <Route
            {...rest}
            render={props =>
                user ?
                    React.cloneElement(onlyChild, { ...rest, ...props }) :
                    <Redirect to="/" />
            }
        />
    )
}

const ContentWrapper = ({ children }) => {
    const isDarkTheme = useSelector(({ settings }) => settings.isDarkTheme);
    return (
        <div className={`content-wrapper ${isDarkTheme ? 'dark' : 'light'}`}>{children}</div>
    )
}
function ChatApp() {
    const dispatch = useDispatch();
    const isChecking = useSelector(({ auth }) => auth.isChecking);
    const isOnline = useSelector(({ app }) => app.isOnline);
    const user = useSelector(({ auth }) => auth.user);

    useEffect(() => {
        dispatch(loadInitialSettings());
        const unsubFromAuth = dispatch(listenToAuthChanges());
        const unsubFromConnection = dispatch(listenToConnectionChanges());
        return () => {
            unsubFromAuth();
            unsubFromConnection();
        }
    }, [dispatch])
    useEffect(() => {
        let unsubFromUserConnection;
        if (user?.uid) {
            unsubFromUserConnection = dispatch(checkUserConnection(user.uid));
        }

        return () => {
            unsubFromUserConnection && unsubFromUserConnection();
        }
    }, [dispatch, user])

    if (!isOnline) {
        return <LoadingView message="Application has been disconnected from the internet. Please reconnect..." />
    }

    if (isChecking) {
        return <LoadingView />
    }
    return (
        <Router>
            <ContentWrapper>
                <Switch>
                    <Route path="/" exact>
                        <Welcomev />
                    </Route>
                    <AuthRoute path="/chatCreate">
                        <ChatCreate />
                    </AuthRoute>
                    <AuthRoute path="/home">
                        <Homev />
                    </AuthRoute>
                    <AuthRoute path="/chat/:id">
                        <Chatv />
                    </AuthRoute>
                    <AuthRoute path="/setting">
                        <Settingv />
                    </AuthRoute>
                    <AuthRoute path="/editprofile">
                        <EProfile />
                    </AuthRoute>
                </Switch>
            </ContentWrapper>
        </Router>

    )


}


export default function App() {
    return (
        <StoreProvider >
            <ChatApp />
        </StoreProvider>

    )
}