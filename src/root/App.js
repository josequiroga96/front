import React from 'react';

import './app.css';
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from 'react-router-dom';
import {useSelector} from "react-redux";

import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from "../screens/CartScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

function App() {

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open");
    };
    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open")
    };

    return (
        <Router>
            <div className="grid-container">

                <header className="header">
                    <div className="brand">
                        <button onClick={openMenu}>
                            &#9776;
                        </button>
                        <Link to="/">Jose's Portfolio</Link>
                    </div>
                    <div className="header-links">
                        <Link to="/cart">Cart</Link>
                        {userInfo ?
                            <Link to="/profile">{userInfo.username}</Link> :
                            <Link to="/login">Sign In</Link>
                        }
                    </div>
                </header>

                <aside className="sidebar">
                    <h3>Shopping Categories</h3>
                    <button className="sidebar-close-button" onClick={closeMenu}>x</button>
                    <ul>
                        <li>
                            <Link to="/category/Pants">Pants</Link>
                        </li>

                        <li>
                            <Link to="/category/Shirts">Shirts</Link>
                        </li>
                    </ul>
                </aside>

                <main className="main">
                    <div className="content">
                        <Switch>
                            <Route path="/" exact={true} component={(props) => <HomeScreen {...props} />}/>
                            <Route path="/category/:id" component={(props) => <HomeScreen {...props} />} />
                            <Route path="/products/:id" component={(props) => <ProductScreen {...props} />}/>
                            <Route path="/cart/:id?" component={(props) => <CartScreen {...props} />}/>
                            <Route path="/login" component={(props) => <LoginScreen {...props} />}/>
                            <Route path="/signup" component={(props) => <SignupScreen {...props} />}/>
                        </Switch>
                    </div>
                </main>

                <footer className="footer">
                    All right reserved.
                </footer>
            </div>
        </Router>
    );
}

export default App;