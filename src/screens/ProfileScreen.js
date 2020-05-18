import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {logout} from "../actions/userActions";
import {listMyOrders} from "../actions/orderActions";

function ProfileScreen(props) {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const handleLogout = () => {
        dispatch(logout());
        props.history.push("/login");
    };

    const submitHandler = (e) => {
        console.log("TODO");
    };

    const myOrderList = useSelector(state => state.myOrderList);
    const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;

    useEffect(() => {
        if (userInfo) setUsername(userInfo.username);
        dispatch(listMyOrders());
        return () => {};
    }, [userInfo,dispatch ]);

    return <div className="profile">
        <div className="profile-info">
            <div className="form">
                <form onSubmit={submitHandler} >
                    <ul className="form-container">
                        <li>
                            <h2>User Profile</h2>
                        </li>
                        <li>
                            <label htmlFor="username">
                                <h3>Username</h3>
                            </label>
                            {username}
                        </li>
                        <li>
                            <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button>
                        </li>

                    </ul>
                </form>
            </div>
        </div>
        <div className="profile-orders content-margined">
            {
                loadingOrders ? <div>Loading...</div> :
                    errorOrders ? <div>{errorOrders} </div> :
                        <table className="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>ACTIONS</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map(order => <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.createdAt}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid}</td>
                                <td>
                                    <Link to={"/order/" + order.id}>DETAILS</Link>
                                </td>
                            </tr>)}
                            </tbody>
                        </table>
            }
        </div>
    </div>
}

export default ProfileScreen;