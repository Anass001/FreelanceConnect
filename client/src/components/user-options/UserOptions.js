import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './UserOptions.css'
import Cookies from 'js-cookie';

function logout() {
    Cookies.remove('token');
    Cookies.remove('userId');
    window.location.reload();
}

function UserOptions() {
    const [show, setShow] = useState(false);

    const showUserOptions = () => setShow(!show);

    const userId = Cookies.get('userId');

    return (
        <div className="user-options">
            <div className="user-options__icon" onClick={showUserOptions}>
                {
                    show ? (
                        <span class="material-symbols-outlined activated">
                            account_circle
                        </span>
                    ) : <span class="material-symbols-outlined">
                        account_circle
                    </span>
                }
            </div>
            {show && (
                <div className="user-options__wrapper">
                    <div className="user-options__body">
                        <Link to={`/user/${userId}`}>
                            <div className="user-options__body__item">
                                <div className="user-options__body__item__content">
                                    <span class="material-symbols-outlined">
                                        person
                                    </span>
                                    <p className="user-options__body__item__content__message">Profile</p>
                                </div>
                            </div>
                        </Link>
                        <Link to="/switch">
                            <div className="user-options__body__item">
                                <div className="user-options__body__item__content">
                                    <span class="material-symbols-outlined">
                                        cached
                                    </span>
                                    <p className="user-options__body__item__content__message">Switch</p>
                                </div>
                            </div>
                        </Link>
                        <div className="user-options__body__item"
                            onClick={
                                logout
                            }
                        >
                            <div className="user-options__body__item__content">
                                <span class="material-symbols-outlined">
                                    logout
                                </span>
                                <p className="user-options__body__item__content__message">Logout</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserOptions