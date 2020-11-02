var accessToken="";
// bearer="";
// conditions="";
// genre="";
// activity="";
// searchterm="";

getPlaylists();
function getPlaylists() {
// fetch method to pass spotify app id and retrieve token for api call
  fetch("https://accounts.spotify.com/api/token", {
    body: "grant_type=client_credentials",
    headers: {
      Authorization: "Basic YWZkN2RhODZlMTBlNGYxNmI5ZmJiNGVkZjI5Y2ExYTA6NjhjMGU4Y2RkNjYyNGUxODg4OGY0MjgyNmRiZjAzNWI=",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    accessToken = data.access_token;  
    console.log(accessToken);

    //fetch method to retrieve playlists from spotify
    fetch("https://api.spotify.com/v1/search?q=snowy%20day&type=playlist", {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json"
    }
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for(i=0;i<data.playlists.items.length;i++) {
      console.log(data.playlists.items[i].name);
    }
  })
  })

}  
