import React, { useState, useEffect } from 'react'
import { backendLookup } from '../lookup'
import Notification from './Notification'

export function NotificationComponent() {
    const [notifications , setNotifications] = useState([])
    const [didLookup, setDidLookup] = useState(false)

    const apiNotificationsLookup = (handleNotificationsLookup) =>{
        backendLookup("GET", null , handleNotificationsLookup , "profiles/notifications/")
        //backendLookup("GET", null , handleNotificationsLookup , "notifications/updateNotifications/")
    }

    useEffect(() => {
        
        const handleNotificationsLookup = (response , status) =>{
            if(status == 200){
                setNotifications(response)
                setDidLookup(true)

            }

            else{
                alert("there is an error with your notifications")
            }

        }

        apiNotificationsLookup(handleNotificationsLookup)
        
    }, [])

    return (
       
        <div>
            {didLookup == false  ? <p>loading...</p> : notifications.map((notification , index) =>{
                return <Notification key = {`${index}- ${notification.id}`} notification = {notification} />
            })}

            {didLookup && notifications.length === 0 ? <p>No notifications</p> : null}
        </div>
    )
}

