var accessToken="";
var cardEl = document.getElementById("cardResults");
var searchEl = document.getElementById("searchBtn");
var formEl = document.getElementById("searchForm");
var inputEl = document.getElementById("searchBar");

//pass zipcode input to api call:
// sets element for zipcode input
// creates event listener for search element
formEl.addEventListener("submit", function(event) {
  event.preventDefault();
  zipCode = inputEl.value;
  
  // zipCode = zipInt.toString();
  console.log(zipCode);
  document.location.replace('./results.html');

  weatherUrl = "https://api.weatherbit.io/v2.0/current?postal_code=" + zipCode + "&country=US&I&key=e6603d28875d4e64a64f4b64ce96d78b";
  // fetches weather description code from api
  fetch(weatherUrl)
      .then(function (response) {
        if(response.ok) {
        return response.json();}
        else {return;}
      })
      .then(function (data) {
        console.log(data);
        // console.log(data.data[0].weather.code);
          var weatherCode = data.data[0].weather.code;
          // console.log(weatherCode);
          var trimCode = weatherCode.toString();
          // console.log(trimCode);
          var searchTerm = trimCode.substring(0,2);
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
            searchTerm = "clear%20sky";
            break;  
          }
          console.log(searchTerm);
          getPlaylists(searchTerm);

            // fetch method to pass spotify app id and retrieve token for api call

        })

      })

var getPlaylist = function(weather) {
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

            var spotifyUrl = "https://api.spotify.com/v1/search?" + searchTerm + "&type=playlist";
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
              playlistCover.setAttribute("href",data.playlists.items[i].external_urls.spotify);
              playlistCover.setAttribute("target","_blank");
              cardCover.appendChild(playlistCover);
              //playlist image
              var playlistImage = document.createElement("img");
              playlistImage.setAttribute("src",data.playlists.items[i].images[0].url);
              playlistImage.setAttribute("alt","playlist image");
              playlistImage.setAttribute("uk-cover","");
              playlistImage.style.width = "100px";
              playlistImage.style.height = "100px";
              playlistCover.appendChild(playlistImage);
              //canvas element for image styline
              var CanvasEl = document.createElement("canvas");
              CanvasEl.setAttribute("width","");
              CanvasEl.setAttribute("height","auto");
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
          })
        })
      }


  // <div class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin" uk-grid>
  //   <div class="uk-card-media-left uk-cover-container">
  //     <a href="https://open.spotify.com/playlist/37i9dQZF1DXbvABJXBIyiY" target = "_blank"><img src="https://i.scdn.co/image/ab67706f00000003b6aa61c165615f5bc3102ad1" alt="playlist cover" uk-cover></a>
  //     <canvas width="600" height="400"></canvas>
  //   </div>
  //   <div>
  //     <div class="uk-card-body">
  //       <h3 class="uk-card-title">RainyDay Lofi</h3>
  //       <p>Chilled out alternative, rock, indie, acoustic, electro, lofi and whatever else fits the mood.</p>
  //       <p>Number of Tracks: 52</p>
  //     </div>
  //   </div>