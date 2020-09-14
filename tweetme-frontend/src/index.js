import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { TweetsComponent, TweetDetailCompoent, FeedComponent } from './tweets/components';
import {ProfileComponent} from './profiles/ProfileComponent'
import { NotificationComponent } from './notifications/components';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const appEl = document.getElementById('root')
if (appEl) {
    ReactDOM.render(<App />, appEl);
}

const e = React.createElement
const tweetsEl = document.getElementById('tweetme')
if(tweetsEl){
 ReactDOM.render(
  e(TweetsComponent , tweetsEl.dataset) , tweetsEl);
}

const feedtweetsEl = document.getElementById('tweetme-feed')
if(feedtweetsEl){
  ReactDOM.render(
    e(FeedComponent , feedtweetsEl.dataset) , feedtweetsEl );
  
}

// const tweetDetailElements = document.querySelectorAll(".tweetme-detail")

// tweetDetailElements.forEach(container=> {
//     ReactDOM.render(
//         e(TweetDetailCompoent, container.dataset), 
//         container);
// })

//or

const tweetdetailEl = document.querySelector('.tweetme-detail')
if(tweetdetailEl){
ReactDOM.render(
  e(TweetDetailCompoent , tweetdetailEl.dataset) , tweetdetailEl
);
}

const profiledetailEl = document.querySelector(".tweetme-profile-detail")
if(profiledetailEl){
  ReactDOM.render(
    e(ProfileComponent , profiledetailEl.dataset) , profiledetailEl
  );
}

const notifications = document.getElementById("tweetme-notifications")
if(notifications){
  ReactDOM.render(
    e(NotificationComponent , notifications.dataset) , notifications
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
