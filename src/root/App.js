import React, {Component} from 'react';

import './app.css';
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from 'react-router-dom';

import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';

class App extends Component {

    openMenu() {
        document.querySelector(".sidebar").classList.add("open");
    }

    closeMenu() {
        document.querySelector(".sidebar").classList.remove("open");
    }

    render() {
        return (
            <Router>
                <div className="grid-container">

                    <header className="header">
                        <div className="brand">
                            <button onClick={this.openMenu}>
                                &#9776;
                            </button>
                            <Link to="/">Jose's Portfolio</Link>
                        </div>
                        <div className="header-links">
                            <a href="cart.html">Cart</a>
                            <a href="signin.html">Sign In</a>
                        </div>
                    </header>

                    <aside className="sidebar">
                        <h3>Shopping Categories</h3>
                        <button className="sidebar-close-button" onClick={this.closeMenu}>x</button>
                        <ul>
                            <li>
                                <a href="index.html">Pants</a>
                            </li>

                            <li>
                                <a href="index.html">Shirts</a>
                            </li>

                        </ul>
                    </aside>

                    <main className="main">
                        <div className="content">
                            <Switch>
                                <Route path="/" exact={true}>
                                    <HomeScreen />
                                </Route>
                                <Route path="/products/:id">
                                    <ProductScreen />
                                </Route>
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
}

export default App;