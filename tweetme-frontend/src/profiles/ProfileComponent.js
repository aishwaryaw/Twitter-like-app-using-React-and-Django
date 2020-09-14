import React , {useState, useEffect} from 'react'
import { backendLookup } from '../lookup'
import { UserPicture, UserDisplay } from './components'
import DisplayCount from './utils'

export function ProfileBadgeCompoenent(props){
    
    const {profile , didFollowToggle} = props
    const currentVerb = (profile && profile.is_following) ?  "unfollow" : "follow" 

    const FollowToggle = (e)=>{
        e.preventDefault()
        didFollowToggle(currentVerb)
    }
    
    return profile ?  (
    <div>
     <UserPicture user= {profile} hideLink/>
     <UserDisplay user = {profile} hideLink />
     <p><DisplayCount>{profile.following_count}</DisplayCount> following </p>
     <DisplayCount>{profile.follower_count}</DisplayCount> {profile.follower_count == 1 ? "follower" : "followers"}
     <p>{profile.bio}</p>
     <p>{profile.location}</p>

     <button onClick = {FollowToggle}>{currentVerb}</button>
    
    </div>

    ) : null

}


export function ProfileComponent(props) {
     
    const {username} = props
    console.log(username)
    const [profile, setProfile] = useState(null)
    const [profileDidSet, setprofileDidSet] = useState(false)

    const callback = (response , status) => {
          
        if(status == 200){
            setProfile(response)
            setprofileDidSet(true)
        }
    }

   const handleFollowToggle = (action)=>{

    backendLookup("POST" , {"action": action} , callback , `profiles/${username}/`)

   }

    const apiProfileDetail = (callback) =>{
        backendLookup("GET", null , callback , `profiles/${username}/`)
    }

    useEffect(() => {
        if(profileDidSet == false){
       
        apiProfileDetail(callback)
    }
        
    }, [profileDidSet, setprofileDidSet])

    return (
    profileDidSet === false ? <p>Loading...</p> : <ProfileBadgeCompoenent profile = {profile} didFollowToggle = {handleFollowToggle} /> 
    )


}


