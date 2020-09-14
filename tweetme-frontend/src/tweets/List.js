import React, {useState , useEffect } from 'react'
import {backendLookup} from '../lookup';
import Tweet from './Tweet'

function TweetsList(props) {

    const [tweets , setTweets ] = useState([])
    const [tweetsinit , setTweetsinint] = useState([])
    const [nexturl , setNexturl] = useState(null)
    const [tweetdidset , setTweetdidset] = useState(false)
    
    useEffect(() => {

        if( tweetdidset === false){
 
         const handleTweetsListLookup = (response,status ) =>{
 
             if(status == 200){
                 console.log(response)
                 setNexturl(response.next)
                 setTweetsinint(response.results)
                 setTweetdidset(true)
             }
 
             else{        
                 alert('there was an error')
              }
             }
     
         apiTweetList( handleTweetsListLookup )
        }
         
     }, [ tweetsinit , tweetdidset , setTweetdidset, props.username])

    
    useEffect(() => {
        
        const final = [...props.newtweets].concat(tweetsinit)

        if(final.length !== tweets.length)
            setTweets(final)

    }, [ props.newtweets , tweets, tweetsinit, props.username ])


    const apiTweetList =  async(callback, nexturl) =>{

        let endpoint = "tweets/"

        if(nexturl != null || nexturl != undefined ){
          endpoint = nexturl.replace("http://localhost:8000/api/", "")
        }

        else if(props.username){
            endpoint = `tweets/?username=${props.username}`
            }

        backendLookup("GET" , null , callback , endpoint)
      
    }

    const handleRetweet = (newretweet) => {
        const updateTweetsinit = [...tweetsinit]
        updateTweetsinit.unshift(newretweet)
        setTweetsinint(updateTweetsinit)

        const updatedFinalTweets = [...tweets]
        updatedFinalTweets.unshift(tweets)
        setTweets(updatedFinalTweets)
    }


    const handleLoadNext = (e)=>{

        e.preventDefault()
        if(nexturl != null){
        const handleTweetsListLookupForPagination = (response, status)=>{
            if(status == 200){
            setNexturl(response.next)
            let temptweets = [...tweets]
            temptweets = temptweets.concat(response.results)
            setTweetsinint(temptweets)
            setTweets(temptweets)
            }

            else{
                alert("there is an error")
            }

        }
        apiTweetList(handleTweetsListLookupForPagination, nexturl)
    }
    }
 
    
    return (
        <div>
            { tweets && tweets.map((tweet , index)=>{
               return ( <Tweet className='my-5 py-5 border bg-white text-dark' key={index} 
               tweet = {tweet}
               didRetweet = {handleRetweet} /> )
            })}
             { nexturl != null && <button onClick = {handleLoadNext} >Load next </button>
            }
        </div>
    )
}

export default TweetsList
