import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Loginf from '../componens/Loginform';
import Registerf from '../componens/Registerform';
import { Redirect } from 'react-router-dom';

export default function Welcome() {

    const [isLoginv, setIsLogin] = useState(true);
    const user = useSelector(({ auth }) => auth.user);


    const optInText = isLoginv ?
        ['Need an account ?', 'Register'] :
        ['Already register ?', 'Login']

    if (user) {
        return <Redirect to="/home" />
    }

    return (
        <div className="centered-view">
            <div className="centered-container">
                {isLoginv ? <Loginf /> : <Registerf />}

                <small className="form-text text-muted mt-2">{optInText[0]}
                    <span
                        onClick={() => setIsLogin(!isLoginv)}
                        className="btn-link ml-2">{optInText[1]}</span></small>
            </div>
        </div>
    )
}