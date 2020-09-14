import React , {useState} from 'react'
import ActionBtn from './Buttons'
import {UserDisplay, UserPicture} from '../profiles/components'

export function ParentTweet(props){
    const {tweet} = props
    return (
       tweet.parent ? <Tweet isretweet tweet = {tweet.parent} retweeter = {props.retweeter} hideactions /> : null )
    
}

function Tweet(props) {

    const { tweet , didRetweet , isretweet , retweeter , hideactions } = props
    const [ actiontweet, setActiontweet ] = useState(props.tweet ? props.tweet : null)
    let className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    className = isretweet === true ? `${className} p-2 border rounded` : className
    const path = window.location.pathname
    const regexid = /(?<tweetid>\d+)/
    const match = path.match(regexid)
    const id = match ? match.groups.tweetid : -1
    const isdetail = `${id}` === `${tweet.id}`

    //console.log(tweet)
    

    const handleLink = () =>{
        window.location.href = `/${tweet.id}`
    }
    

    const handlePerformAction = (response , status) =>{
        if(status == 200)
            setActiontweet(response)

        else if(status == 201){
            didRetweet(response)
        }
    }
   

    return (
      <div className={className}>
        {isretweet === true && <div className='mb-2'>
        <span className='small text-muted'>Retweet via <UserDisplay user={retweeter} /></span>
      </div>}
      <div className='d-flex'>
     
        <div className=''>
          <UserPicture user={tweet.user} />
        </div>
        <div className='col-11'>
            <div>
           
              <p>
                <UserDisplay includeFullName user={tweet.user} />
              </p>
              <p>{tweet.content}</p>
             
            <ParentTweet tweet={tweet} retweeter={tweet.user} />
            {actiontweet && hideactions !== true ? 
            <div>
            <ActionBtn tweet = {actiontweet} didPerformAction = {handlePerformAction} action = {{type : 'like' , display : 'likes' }}/>
            <ActionBtn tweet = {actiontweet}  didPerformAction = {handlePerformAction} action = {{type : 'Unlike' , display : 'Unlike' }}/>
            <ActionBtn tweet = {actiontweet}  didPerformAction = {handlePerformAction} action = {{type : 'retweet' , display : 'retweet' }}/>
            </div> : null
            }
            { isdetail === true ? null :  <button onClick={handleLink} > view detail </button>  }
        </div>
        </div></div></div>
    )
}

export default Tweet



