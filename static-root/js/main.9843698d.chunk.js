(this["webpackJsonptweetme-frontend"]=this["webpackJsonptweetme-frontend"]||[]).push([[0],{12:function(e,t,n){e.exports=n(21)},17:function(e,t,n){},18:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},19:function(e,t,n){},21:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(3),o=n.n(c),l=(n(17),n(18),n(19),n(2)),i=n(1),u=n(4),s=n.n(u),f=n(7);var m=function(e,t,n,a){var r;t&&(r=JSON.stringify(t));var c=new XMLHttpRequest;c.responseType="json";var o=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),a=0;a<n.length;a++){var r=n[a].trim();if(r.substring(0,e.length+1)===e+"="){t=decodeURIComponent(r.substring(e.length+1));break}}return t}("csrftoken"),l="http://localhost:8000/api/".concat(a);c.open(e,l),c.setRequestHeader("Content-type","application/json"),o&&(c.setRequestHeader("X-Requested-With","XMLHttpRequest"),c.setRequestHeader("X-CSRFToken",o)),c.onload=function(){403===c.status&&("Authentication credentials were not provided."===c.response.detail&&-1===window.location.href.indexOf("login")&&(window.location.href="/login?showLoginRequired=true"));n(c.response,c.status)},c.onerror=function(e){n({message:"The request was an error"},400)},c.send(r)},d=n(11);var w=function(e){var t=e.tweet,n=e.action,a=e.didPerformAction,c=n.display?n.display:"Action",o=t.likes?t.likes:0,l=function(e,t){200!=t&&201!=t||!a||a(e,t)},i="like"==n.type?"".concat(o," ").concat(c):c;return r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){!function(e){m("POST",{id:t.id,action:n.type,content:t.content},e,"tweets/action/")}(l)}},i))};function v(e){var t=e.username;return r.a.createElement("span",{className:"pointer",onClick:function(){window.location.href="/profiles/".concat(t)}},e.children)}function p(e){var t=e.user,n=e.includeFullName,a=e.hideLink,c=1==n?"".concat(t.first_name," ").concat(t.last_name):t.username;return r.a.createElement("div",null,c,1==a?"@".concat(t.username):r.a.createElement(v,{username:t.username},"@",t.username))}function b(e){var t=e.user,n=e.hideLink,a=r.a.createElement("span",{className:"mx-1 px-2 py-1 rounded-circle bg-dark text-white"},t.username[0]);return 1==n?a:r.a.createElement(v,{username:t.username},a)}function E(e){var t=e.tweet;return t.parent?r.a.createElement(h,{isretweet:!0,tweet:t.parent,retweeter:e.retweeter,hideactions:!0}):null}function h(e){var t=e.tweet,n=e.didRetweet,c=e.isretweet,o=e.retweeter,l=e.hideactions,u=Object(a.useState)(e.tweet?e.tweet:null),s=Object(i.a)(u,2),f=s[0],m=s[1],v=e.className?e.className:"col-10 mx-auto col-md-6";v=!0===c?"".concat(v," p-2 border rounded"):v;var h=window.location.pathname,O=Object(d.a)(/([0-9]+)/,{tweetid:1}),j=h.match(O),g=j?j.groups.tweetid:-1,k="".concat(g)==="".concat(t.id),y=function(e,t){200==t?m(e):201==t&&n(e)};return r.a.createElement("div",{className:v},!0===c&&r.a.createElement("div",{className:"mb-2"},r.a.createElement("span",{className:"small text-muted"},"Retweet via ",r.a.createElement(p,{user:o}))),r.a.createElement("div",{className:"d-flex"},r.a.createElement("div",{className:""},r.a.createElement(b,{user:t.user})),r.a.createElement("div",{className:"col-11"},r.a.createElement("div",null,r.a.createElement("p",null,r.a.createElement(p,{includeFullName:!0,user:t.user})),r.a.createElement("p",null,t.content),r.a.createElement(E,{tweet:t,retweeter:t.user}),f&&!0!==l?r.a.createElement("div",null,r.a.createElement(w,{tweet:f,didPerformAction:y,action:{type:"like",display:"likes"}}),r.a.createElement(w,{tweet:f,didPerformAction:y,action:{type:"Unlike",display:"Unlike"}}),r.a.createElement(w,{tweet:f,didPerformAction:y,action:{type:"retweet",display:"retweet"}})):null,!0===k?null:r.a.createElement("button",{onClick:function(){window.location.href="/".concat(t.id)}}," view detail ")))))}var O=h;var j=function(e){var t=Object(a.useState)([]),n=Object(i.a)(t,2),c=n[0],o=n[1],u=Object(a.useState)([]),d=Object(i.a)(u,2),w=d[0],v=d[1],p=Object(a.useState)(null),b=Object(i.a)(p,2),E=b[0],h=b[1],j=Object(a.useState)(!1),g=Object(i.a)(j,2),k=g[0],y=g[1];Object(a.useEffect)((function(){if(!1===k){S((function(e,t){200==t?(console.log(e),h(e.next),v(e.results),y(!0)):alert("there was an error")}))}}),[w,k,y,e.username]),Object(a.useEffect)((function(){var t=Object(l.a)(e.newtweets).concat(w);t.length!==c.length&&o(t)}),[e.newtweets,c,w,e.username]);var S=function(){var t=Object(f.a)(s.a.mark((function t(n,a){var r;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r="tweets/",null!=a||void 0!=a?r=a.replace("http://localhost:8000/api/",""):e.username&&(r="tweets/?username=".concat(e.username)),m("GET",null,n,r);case 3:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),x=function(e){var t=Object(l.a)(w);t.unshift(e),v(t);var n=Object(l.a)(c);n.unshift(c),o(n)};return r.a.createElement("div",null,c&&c.map((function(e,t){return r.a.createElement(O,{className:"my-5 py-5 border bg-white text-dark",key:t,tweet:e,didRetweet:x})})),null!=E&&r.a.createElement("button",{onClick:function(e){if(e.preventDefault(),null!=E){S((function(e,t){if(200==t){h(e.next);var n=Object(l.a)(c);n=n.concat(e.results),v(n),o(n)}else alert("there is an error")}),E)}}},"Load next "))};function g(e){var t=e.didTweet,n=Object(a.useState)(!0),c=Object(i.a)(n,2),o=c[0],l=c[1],u=Object(a.useState)(""),s=Object(i.a)(u,2),f=s[0],d=s[1],w=function(e,n){201==n?t(e):400==n?alert(e.content[0]):alert("There is an error")};return r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),m("POST",{content:f},w,"tweets/create/"),d("")}},r.a.createElement("input",{type:"text",name:"tweet",value:f,onChange:function(e){d(e.target.value),""!==e.target.value?l(!1):l(!0)}}),r.a.createElement("button",{disabled:o,type:"submit"},"Add tweet"))}var k=n(8);var y=function(e){var t=Object(a.useState)([]),n=Object(i.a)(t,2),c=n[0],o=n[1],u=Object(a.useState)([]),d=Object(i.a)(u,2),w=d[0],v=d[1],p=Object(a.useState)(!1),b=Object(i.a)(p,2),E=b[0],h=b[1],j=Object(a.useState)(null),g=Object(i.a)(j,2),y=g[0],S=g[1];Object(a.useEffect)((function(){var t=Object(l.a)(e.newtweets).concat(w);t.length!==c.length&&o(t)}),[e.newtweets,c,w]);var x=function(){var e=Object(f.a)(s.a.mark((function e(t,n){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a="tweets/feed/",null==n&&void 0==n||(a=n.replace("http://localhost:8000/api/","")),m("GET",null,t,a);case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();Object(a.useEffect)((function(){if(!1===E){x((function(e,t){200==t?(v(e.results),S(e.next),h(!0)):(console.log(e),alert("there was an error"))}))}}),[w,E,h,e.username]);var T=function(e){var t=Object(l.a)(w);t.unshift(e),v(t);var n=Object(l.a)(c);n.unshift(c),o(n)};return r.a.createElement("div",null,c&&c.map((function(e,t){var n;return r.a.createElement(O,(n={key:"".concat(t,"-").concat(e.id),className:"my-5 py-5 border bg-white text-dark"},Object(k.a)(n,"key",t),Object(k.a)(n,"tweet",e),Object(k.a)(n,"didRetweet",T),n))})),null!=y&&r.a.createElement("button",{onClick:function(e){if(e.preventDefault(),null!=y){x((function(e,t){if(200==t){S(e.next);var n=Object(l.a)(c);n=n.concat(e.results),o(n),v(n)}else alert("therer is an error")}),y)}}},"Load next"))};var S=function(){return r.a.createElement("div",{className:"App"})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var x=n(10),T=n.n(x);var N=function(e){return r.a.createElement("span",null,T()(e.children).format("0a"))};function R(e){var t=e.profile,n=e.didFollowToggle,a=t&&t.is_following?"unfollow":"follow";return t?r.a.createElement("div",null,r.a.createElement(b,{user:t,hideLink:!0}),r.a.createElement(p,{user:t,hideLink:!0}),r.a.createElement("p",null,r.a.createElement(N,null,t.following_count)," following "),r.a.createElement(N,null,t.follower_count)," ",1==t.follower_count?"follower":"followers",r.a.createElement("p",null,t.bio),r.a.createElement("p",null,t.location),r.a.createElement("button",{onClick:function(e){e.preventDefault(),n(a)}},a)):null}var q=function(e){var t=e.notification;return r.a.createElement("div",null,t.message)};var C=document.getElementById("root");C&&o.a.render(r.a.createElement(S,null),C);var L=r.a.createElement,A=document.getElementById("tweetme");A&&o.a.render(L((function(e){var t=Object(a.useState)([]),n=Object(i.a)(t,2),c=n[0],o=n[1],u="false"!==e.canTweet;return r.a.createElement("div",null,u&&r.a.createElement(g,{didTweet:function(e){var t=Object(l.a)(c);t.unshift(e),o(t)}}),r.a.createElement(j,Object.assign({newtweets:c},e)))}),A.dataset),A);var P=document.getElementById("tweetme-feed");P&&o.a.render(L((function(e){var t=Object(a.useState)([]),n=Object(i.a)(t,2),c=n[0],o=n[1],u="false"!==e.canTweet;return r.a.createElement("div",null,!0===u?r.a.createElement(g,{didTweet:function(e){console.log(e);var t=Object(l.a)(c);t.unshift(e),o(t)}}):null,r.a.createElement(y,{newtweets:c}))}),P.dataset),P);var I=document.querySelector(".tweetme-detail");I&&o.a.render(L((function(e){var t=e.tweetId,n=Object(a.useState)(null),c=Object(i.a)(n,2),o=c[0],l=c[1],u=function(e,t){200==t?l(e):(alert("there is an error"),window.location.href="/")};return Object(a.useEffect)((function(){!function(e){m("GET",null,e,"tweets/".concat(t,"/"))}(u)}),[]),null==o?null:r.a.createElement(O,{tweet:o})}),I.dataset),I);var _=document.querySelector(".tweetme-profile-detail");_&&o.a.render(L((function(e){var t=e.username;console.log(t);var n=Object(a.useState)(null),c=Object(i.a)(n,2),o=c[0],l=c[1],u=Object(a.useState)(!1),s=Object(i.a)(u,2),f=s[0],d=s[1],w=function(e,t){200==t&&(l(e),d(!0))};return Object(a.useEffect)((function(){0==f&&function(e){m("GET",null,e,"profiles/".concat(t,"/"))}(w)}),[f,d]),!1===f?r.a.createElement("p",null,"Loading..."):r.a.createElement(R,{profile:o,didFollowToggle:function(e){m("POST",{action:e},w,"profiles/".concat(t,"/"))}})}),_.dataset),_);var B=document.getElementById("tweetme-notifications");B&&o.a.render(L((function(){var e=Object(a.useState)([]),t=Object(i.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(!1),l=Object(i.a)(o,2),u=l[0],s=l[1];return Object(a.useEffect)((function(){!function(e){m("GET",null,e,"profiles/notifications/")}((function(e,t){200==t?(c(e),s(!0)):alert("there is an error with your notifications")}))}),[]),r.a.createElement("div",null,0==u?r.a.createElement("p",null,"loading..."):n.map((function(e,t){return r.a.createElement(q,{key:"".concat(t,"- ").concat(e.id),notification:e})})),u&&0===n.length?r.a.createElement("p",null,"No notifications"):null)}),B.dataset),B),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[12,1,2]]]);
//# sourceMappingURL=main.9843698d.chunk.js.map