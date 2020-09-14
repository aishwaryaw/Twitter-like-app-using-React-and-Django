function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }


function backendLookup(method, data , callback , endpoint){

    let jsonData;
    if (data){
      jsonData = JSON.stringify(data)
    }
    const xhr = new XMLHttpRequest()
    xhr.responseType = "json"
    const csrftoken = getCookie('csrftoken');
    const url = `http://localhost:8000/api/${endpoint}`
    xhr.open(method, url)
    xhr.setRequestHeader("Content-type", "application/json")

    if(csrftoken){
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
        xhr.setRequestHeader("X-CSRFToken", csrftoken)
    }

    xhr.onload = function() {
        if (xhr.status === 403) {
          const detail = xhr.response.detail
          if (detail === "Authentication credentials were not provided."){
            if (window.location.href.indexOf("login") === -1) {
              window.location.href = "/login?showLoginRequired=true"
            }
          }
        }
        callback(xhr.response, xhr.status)
      }

    xhr.onerror = function(e){
        callback({"message" : "The request was an error"}, 400)

    }

    xhr.send(jsonData)

}

export default backendLookup