import React from 'react'


export function UserLink(props) {
    const {username} = props

    const handleLink = () =>{
        // document.getElementById("tweetme-feed").className = "d-none"
        window.location.href = `/profiles/${username}` 
    }

    return (
    <span className="pointer" onClick = {handleLink} >{props.children}</span>
    
    )
}


export function UserDisplay(props){
    const {user , includeFullName , hideLink} = props
    const nameDisplay = includeFullName == true ? `${user.first_name} ${user.last_name}` : user.username
    //console.log(user)
        return (
        <div>
        {nameDisplay}
        { hideLink == true ? `@${user.username}`  : <UserLink username = {user.username}>@{user.username}</UserLink> }
        </div>
        )

}

export function UserPicture(props){

    const {user , hideLink} = props
    
    const userIdSpan = <span className="mx-1 px-2 py-1 rounded-circle bg-dark text-white">{user.username[0]}</span>
    
    return hideLink == true ? userIdSpan : <UserLink username = {user.username} >{userIdSpan}</UserLink>
}






