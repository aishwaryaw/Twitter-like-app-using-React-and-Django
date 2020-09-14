import React , {useState } from 'react'
import { backendLookup } from '../lookup'

export default function TweetCreate(props) {
    const { didTweet } = props
    const [disabled , setDisabled] = useState(true)

    const [tweet, setTweet] = useState('')

    const callback = (response, status) =>{
        if(status == 201){

            didTweet(response)

        }
        else if (status == 400){
            alert(response.content[0])
        }

        else{
            alert('There is an error')
        }
    }

    const handleChange = (e)=>{
        setTweet(e.target.value)
        if(e.target.value !== ''){
            setDisabled(false)
        }
        else{
            setDisabled(true)
        }
    }


    const handleSubmit = (e)=>{
        e.preventDefault()
        //console.log(tweet)
        backendLookup("POST", {content : tweet} , callback , 'tweets/create/')
        setTweet('')
        
    }

    return (

        <form onSubmit={handleSubmit}>
            <input type="text" name="tweet" value = {tweet} onChange= {handleChange} />
            <button disabled={disabled} type="submit">Add tweet</button>
        </form>
        
    )
}
