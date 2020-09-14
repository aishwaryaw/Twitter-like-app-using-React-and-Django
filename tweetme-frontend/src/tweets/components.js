import React, { useState, useEffect } from 'react'
import TweetList from './List'
import TweetCreate from './Create'
import { backendLookup } from '../lookup'
import Tweet from './Tweet'
import FeedList from './feed'

export function TweetsComponent(props) {

    const [newtweets, setNewtweets ] = useState([])
    const canTweet = props.canTweet === "false" ? false : true

    const handleNewTweet = (newtweet) => {
       
        let tempnewtweets = [...newtweets]
        tempnewtweets.unshift(newtweet)
        setNewtweets(tempnewtweets)
        // console.log('components')
    }    

    return (
        <div>
        {canTweet && <TweetCreate didTweet = {handleNewTweet}/> }
        <TweetList newtweets = {newtweets} {...props}/>
        </div>
    )
}


export function TweetDetailCompoent(props){

    const {tweetId} = props
    const [tweet, setTweet] = useState(null)

    const callback = (response , status) => {
        if(status == 200) {
            setTweet(response)
        }
        else{
            alert('there is an error')
            window.location.href = "/"
        }
    }

    const apiTweetDetail = (callback) => {
        backendLookup("GET", null , callback , `tweets/${tweetId}/` )
    }

    useEffect(() => {
        apiTweetDetail(callback)
    }, [])
      

    return tweet == null ? null : <Tweet tweet= {tweet} />

}


export function FeedComponent(props){

    const [newtweets , setNewtweets] = useState([])
    const canTweet = props.canTweet === "false" ? false : true

    const handleNewTweet = (newtweet) =>{
        console.log(newtweet)
        let tempnewtweets = [...newtweets]
        tempnewtweets.unshift(newtweet)
        setNewtweets(tempnewtweets)
    }

    return (
    <div>
    { canTweet === true ? <TweetCreate didTweet = {handleNewTweet}/> : null }
    <FeedList newtweets = {newtweets}  />
    </div>
    )
}


