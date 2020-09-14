import React , {useState} from 'react'
import { backendLookup } from '../lookup'

function ActionBtn(props) {
    const {tweet , action ,didPerformAction } = props
    const actionDisplay = action.display ? action.display : 'Action'
    const likes = tweet.likes ? tweet.likes : 0


    const callback = (response , status) =>{

        if((status == 200 || status == 201 ) && didPerformAction)
        {
            didPerformAction(response , status)
        }
    
    }

    const apiActionTweet = (callback) =>{

        backendLookup("POST" , {"id" : tweet.id, "action" : action.type , "content" : tweet.content } , callback , 'tweets/action/')

    }

    const handleAction = () =>{

        apiActionTweet(callback)

    }

    const display = action.type == 'like' ? `${likes} ${actionDisplay}` : actionDisplay

    return (
        <div>
              <button onClick = {handleAction}>{display}</button>
            
        </div>
    )
}

export default ActionBtn
