import React, {useState , useEffect } from 'react'
import {backendLookup} from '../lookup';
import Tweet from './Tweet'

function FeedList(props) {

    const [tweets , setTweets ] = useState([])
    const [tweetsinit , setTweetsinint] = useState([])
    const [tweetdidset , setTweetdidset] = useState(false)
    const [nexturl , setNexturl] = useState(null)
    

    useEffect(() => {
        //console.log(props.newtweets)
        const final = [...props.newtweets].concat(tweetsinit)

        if(final.length !== tweets.length)
            setTweets(final)

    }, [ props.newtweets , tweets, tweetsinit  ])


    const apiTweetList =  async(callback , nexturl) =>{
        let endpoint = 'tweets/feed/'
        if(nexturl != null || nexturl != undefined){
            endpoint = nexturl.replace("http://localhost:8000/api/", "")
        }

        backendLookup("GET" , null , callback , endpoint)
        
    }
 
    useEffect(() => {
       
       if( tweetdidset === false){

        const handleTweetsListLookup = (response,status ) =>{

            if(status == 200){
                setTweetsinint(response.results)
                setNexturl(response.next)
                setTweetdidset(true)
            }

            else{    
                console.log(response)    
                alert('there was an error')
             }
            }
    
        apiTweetList( handleTweetsListLookup )
       }
        
    }, [ tweetsinit , tweetdidset , setTweetdidset, props.username])

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
                    setTweets(temptweets)
                    setTweetsinint(temptweets)

                }

                else{
                    alert("therer is an error")
                }

            }
            apiTweetList(handleTweetsListLookupForPagination , nexturl)
        }
    }

    return (
        <div>
            { tweets && tweets.map((tweet , index)=>{
               return <Tweet  key={`${index}-${tweet.id}`} 
               className='my-5 py-5 border bg-white text-dark'
                key={index} 
               tweet = {tweet}
               didRetweet = {handleRetweet} />
            })}
            { nexturl != null && <button onClick={handleLoadNext}>Load next</button>}
        </div>
    )
}

export default FeedList
