import React, {useEffect, useState} from 'react';
import './styles/formScreen.css'
import {useDispatch, useSelector} from "react-redux";
import {signup} from "../actions/userActions";

function SignupScreen(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userSignup = useSelector(state => state.userSignup);
    const { loading, userInfo, error } = userSignup;

    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

    useEffect(() => {
        if (userInfo) props.history.push(redirect);
        return () => {};
    }, [userInfo, props, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signup(name, email, password));
    };

    return (
        <div className="form">
            <form onSubmit={submitHandler} >
                <ul className="form-container">
                    <li>
                        <h2>Create Account</h2>
                    </li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                    </li>
                    <li>
                        <label htmlFor="name">
                            Name
                        </label>
                        <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <button type="submit" className="button primary">Register</button>
                    </li>
                    <li>
                        Already have an account?
                        <button onClick={() => props.history.push(redirect === "/" ? "/login" : "/login?redirect=" + redirect)}
                                className="button secondary text-center btn-register">Login</button>
                    </li>

                </ul>
            </form>
        </div>
    );
}

export default SignupScreen;