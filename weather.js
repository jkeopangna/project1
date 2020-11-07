
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
  

  weatherUrl = "https://api.weatherbit.io/v2.0/current?postal_code=" + zipCode + "&country=US&I&key=e6603d28875d4e64a64f4b64ce96d78b";
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
            searchTerm = "clear%20sky";
            break;  
          }
          console.log(searchTerm);
          var storeSearch = JSON.stringify(searchTerm);
          localStorage.setItem("searchStore",storeSearch);
          document.location.replace('./results.html');
          
        })
        
      })             
