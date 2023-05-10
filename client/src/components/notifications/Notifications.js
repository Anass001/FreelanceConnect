import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Notifications.css'

function Notifications({ notifications }) {
    const [show, setShow] = useState(false);

    const showNotifications = () => setShow(!show);

    return (
        <div className="notification">
            <div className="notification__icon" onClick={showNotifications}>
                {
                    show ? (
                        <i className="fa fa-bell activated"></i>
                    ) : <i className="fa fa-bell"></i>
                }
            </div>
            {show && (
                <div className="notification__wrapper">
                    <div className="notification__header">
                        <h3>Notifications</h3>
                        <div className="notification__header__actions">
                        </div>
                    </div>
                    <div className="notification__body">
                        {notifications.map((notification) => (
                            <Link to="/messages">
                                <div className="notification__body__item">
                                    <div className="notification__body__item__content">
                                        <p className="notification__body__item__content__message">{notification.message}</p>
                                        <p className="notification__body__item__content__time">{notification.time}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Notifications