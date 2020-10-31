fetch("https://api.spotify.com/v1/search?q=windy%20day&type=playlist", {
  headers: {
    Authorization: "Bearer BQCYsErt-gPpyPVv_i3-ORtxkzZRP21LYAUT3ra-cVeXP1FzzHtZ84glFXTgPTBsNf78wln_kTTOLdXtMGo",
  }
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

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
  });  
