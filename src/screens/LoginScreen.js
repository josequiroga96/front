import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {login} from "../actions/userActions";
import './styles/formScreen.css'

function LoginScreen(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const userLogin = useSelector(state => state.userLogin);
    const { loading, userInfo, error } = userLogin;
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

    useEffect(() => {
        if (userInfo) props.history.push(redirect);

        return () => {};
    }, [userInfo, redirect, props]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(username, password));

    };

    return <div className="form">
        <form onSubmit={submitHandler} >
            <ul className="form-container">
                <li>
                    <h2>Login</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="username">
                        Username
                    </label>
                    <input type="username" name="username" id="username" onChange={(e) => setUsername(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
                    </input>
                </li>
                <li>
                    <button type="submit" className="button primary">Login</button>
                </li>
                <li>
                    New to here?
                </li>
                <li>
                    <button onClick={() => props.history.push(redirect === "/" ? "/signup" : "/signup?redirect=" + redirect)}
                            className="button secondary text-center btn-register">Create your account</button>
                </li>
            </ul>
        </form>
    </div>
}

export default LoginScreen;