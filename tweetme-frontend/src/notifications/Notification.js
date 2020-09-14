import React from 'react'
import moment from 'moment'

function Notification(props) {

    const {notification} = props
    
    return (
        <div>
            <div className="my-5 py-2 border bg-white text-dark">
            <p>{notification.message}</p>
            <p>{moment(notification.timestamp).fromNow()}</p>
            </div>
        </div>
    )
}

export default Notification
