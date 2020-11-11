// dom elements for manipulation
var cardEl = document.getElementById("cardResults");
var accessToken = "";
var searchTerm = JSON.parse(localStorage.getItem("searchStore"));   
var searchEl = document.getElementById("searchBtn");
var formEl = document.getElementById("searchForm");
var inputEl = document.getElementById("searchBar");
var weatherEl = document.getElementById("weatherCard");
var recentEl = document.getElementById("recentAppend");
var localPlaylists = [];

getSpotify(searchTerm);
          
function getSpotify(weather) { 
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
    accessToken = data.access_token;  
    //fetch method to retrieve playlists from spotify
    var offset = Math.floor(Math.random() * 5);

    var spotifyUrl = "https://api.spotify.com/v1/search?q=" + weather + "&limit=10&offset=" + offset + "&type=playlist";
    fetch(spotifyUrl, {
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
    weatherEl.innerHTML="";  
    //create card element for weather display
    var iconStorage = localStorage.getItem("searchIcon");
    var icon = JSON.parse(iconStorage);
    var iconDiv = document.createElement("div");
    iconDiv.setAttribute("class","uk-card-media-top");
    weatherEl.appendChild(iconDiv);
    var imageDiv = document.createElement("img");
    imageDiv.setAttribute("class","uk-align-center");
    imageDiv.setAttribute("src","https://www.weatherbit.io/static/img/icons/"+ icon + ".png");
    imageDiv.setAttribute("alt","weather icon");
    iconDiv.appendChild(imageDiv);
    console.log(icon);

    var cardBody = document.createElement("div");
    cardBody.setAttribute("class","uk-card-body");
    weatherEl.appendChild(cardBody);
    
    var cityStorage = localStorage.getItem("searchCity");
    var cityCode = JSON.parse(cityStorage);
    var cityDiv = document.createElement("h3");
    cityDiv.setAttribute("class","uk-card-title");
    cityDiv.textContent = "City: " + cityCode;
    cardBody.appendChild(cityDiv);
    console.log(cityCode);
    var tempStorage = localStorage.getItem("searchTemp");
    var temp = JSON.parse(tempStorage);
    var tempDiv = document.createElement("h3");
    
    tempDiv.textContent = "Temp: " + temp + "\xb0";
    cardBody.appendChild(tempDiv);
    console.log(temp);
    var weatherStorage = localStorage.getItem("searchType");
    var weatherType = JSON.parse(weatherStorage);
    var weatherDiv = document.createElement("h3");
    
    weatherDiv.textContent = weatherType;
    cardBody.appendChild(weatherDiv);
    console.log(weatherType);  
        
    //create elements for playlists
    cardEl.innerHTML="";
    console.log(data);
    
    for(i=0;i<data.playlists.items.length;i++) {
    // create card for playlist  
    var newCard = document.createElement("div");
    newCard.setAttribute("class","uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin");
    newCard.setAttribute("uk-grid","");
    cardEl.appendChild(newCard);
    // create element for card cover
    var cardCover = document.createElement("div");
    cardCover.setAttribute("class","uk-card-media-left uk-cover-container");
    newCard.appendChild(cardCover);
    //create linked image for playlist cover
    //playlist link
    var playlistCover = document.createElement("a");
    playlistCover.setAttribute("id","playlist");
    playlistCover.setAttribute("href",data.playlists.items[i].external_urls.spotify);
    playlistCover.setAttribute("target","_blank");
    cardCover.appendChild(playlistCover);
    //playlist image
    var playlistImage = document.createElement("img");
    playlistImage.setAttribute("id","playlist");
    playlistImage.setAttribute("src",data.playlists.items[i].images[0].url);
    playlistImage.setAttribute("alt","playlist image");
    playlistImage.setAttribute("uk-cover","");
    playlistImage.style.width = "100px";
    playlistImage.style.height = "100px";
    playlistCover.appendChild(playlistImage);
    //canvas element for image styline
    var CanvasEl = document.createElement("canvas");
    CanvasEl.setAttribute("width","300");
    CanvasEl.setAttribute("height","450");
    cardCover.appendChild(CanvasEl);  
    // console.log("Playlist Image - " + data.playlists.items[i].images[0].url);
    // console.log("Playlist Link - " + data.playlists.items[i].external_urls.spotify);  
    //create card body
    var bodydiv = document.createElement("div");
    newCard.appendChild(bodydiv);
    var cardBody = document.createElement("div");
    cardBody.setAttribute("class","uk-card-body");
    bodydiv.appendChild(cardBody);
    //create playlist name as card title
    var playlistName = document.createElement("h3");
    playlistName.setAttribute("class","uk-card-title");
    playlistName.textContent = data.playlists.items[i].name;
    cardBody.appendChild(playlistName);  
    // console.log("Playlist Name - " + data.playlists.items[i].name);
    //craeate playlist description
    var playlistDesc = document.createElement("p"); 
    playlistDesc.textContent = data.playlists.items[i].description;
    cardBody.appendChild(playlistDesc);  
    // console.log("Playlist Description - " + data.playlists.items[i].description);
    //create display of number of tracks
    var numTracks = document.createElement("p");
    numTracks.textContent = "Number of Tracks: " + data.playlists.items[i].tracks.total;        
    // console.log("Number of Tracks - " + data.playlists.items[i].tracks.total);
    }
    renderRecentPlaylists();
    })
    })
}


  formEl.addEventListener("submit", function(event) {
  event.preventDefault();
  zipCode = inputEl.value;
  
  // zipCode = zipInt.toString();
  console.log(zipCode);
  

  weatherUrl = "https://api.weatherbit.io/v2.0/current?postal_code=" + zipCode + "&country=US&units=I&key=e6603d28875d4e64a64f4b64ce96d78b";
  // fetches weather description code from api
  fetch(weatherUrl)
      .then(function (response) {
        // if(response.ok) {
        return response.json();
        // else {return;}
      })
      .then(function (data) {
        console.log(data);
        // console.log(data.data[0].weather.code);
          var weatherCode = data.data[0].weather.code;
          // console.log(weatherCode);
          var trimCode = weatherCode.toString();
          // console.log(trimCode);
          var searchTerm = trimCode.substring(0,2);;
          // console.log(searchTerm);
          // switch to evaluate weather term input and pass search param to Spotify fetch
          switch(searchTerm) {
            case '20':
            searchTerm = "stormy%20mood";
            break;
            case '23':
            searchTerm = "stormy%20days";
            break;
            case '30':
            searchTerm = "drizzling";
            break; 
            case '50':
            searchTerm = "rainy%20days";
            break; 
            case '60':
            searchTerm = "snowy";
            break; 
            case '61':
            searchTerm = "snowy%20rain";
            break;
            case '62':
            searchTerm = "heavy%20snow";
            break; 
            case '74':
            searchTerm = "foggy";
            break;
            case '80':
            if(data.data[0].weather.code===800) {
              searchTerm = "clear%20sky"
            } else {searchTerm = "cloudy"};
            break;  
          }
          console.log(searchTerm);
          console.log(data);
          // write items to local storage for retrieval
          var storeSearch = JSON.stringify(searchTerm);
          localStorage.setItem("searchStore",storeSearch);
          var cityCode = JSON.stringify(data.data[0].city_name);
          localStorage.setItem("searchCity",cityCode);
          var weatherType = JSON.stringify(data.data[0].weather.description);
          localStorage.setItem("searchType",weatherType);
          var temp = JSON.stringify(data.data[0].app_temp);
          localStorage.setItem("searchTemp",temp);
          var icon = JSON.stringify(data.data[0].weather.icon);
          localStorage.setItem("searchIcon",icon);
            
          //
          getSpotify(searchTerm);
          //array for card element components to pass to car
          
        })
        
      })

      //local storage for recent playlists
function renderRecentPlaylists () {
    //checks local storage for localScores item
if(JSON.parse(localStorage.getItem("localPlaylists")) === null) {
return;
    }
    // if localScores is in local storage, parses string to highScoreStore array.
    recentPlaylists = JSON.parse(localStorage.getItem("localPlaylists"));
    recentEl.innerHTML="";
    //for loop to get image and playlist from recentPlaylists and append
    for(i=0;i<recentPlaylists.length;i++) {
      var recentLink = document.createElement("a");
      recentLink.setAttribute("href",recentPlaylists[i].link);
      var recentImage = document.createElement("img");
      recentImage.setAttribute("src",recentPlaylists[i].image);
      recentImage.setAttribute("width","100em");
      recentImage.setAttribute("height","100em");
      recentEl.appendChild(recentLink);
      recentLink.appendChild(recentImage);
    }

}

 // EVENT LISTENER FOR USER SELECTION
document.addEventListener("click", function(event) {
        // conditional to evaluate element id click
        if (event.target.matches("#playlist")) {
        var playlistImage = event.target.src;
        var playlistLink = event.target.parentElement.href;
        var playlistPush = {
            image: playlistImage,
            link: playlistLink,
            // score: quizTime
        }
        // pushes values from userScore to highScoreStore variable
        var playlistStore = localStorage.getItem("localPlaylists"); 
        if (playlistStore === null) {
            recentPlaylists = [];
        } 
        else {
        recentPlaylists = JSON.parse(playlistStore);
        }
        recentPlaylists.push(playlistPush);
        var storeLists = JSON.stringify(recentPlaylists);
        localStorage.setItem("localPlaylists", storeLists);
        console.log(recentPlaylists);
        }
});
        