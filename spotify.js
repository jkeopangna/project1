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
  //current forecast
  // city name, date, an icon w/ conditions, temperature, humidity, wind speed and uv index ( use css styles and class for color coding for favorable, normal, unfavorable)

  //future 5 day forecast
  //date, icon for conditions, temperature, and humidity

  

//   18c8e29c5116333e08aef89074ae53f7

// curl -X GET "https://api.spotify.com/v1/search?q=tania%20bowra&type=artist" -H "Authorization: Bearer afd7da86e10e4f16b9fbb4edf29ca1a0"