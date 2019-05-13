document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if(value === "")
    return;
  console.log(value);
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=acac283ff7e535dc0e271bac64c53c4b";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";
      results += '<div class="weatherResults">';
      results += '<h1>Today</h1>';
      results += '<h2>Weather in ' + json.name + "</h2>";
      for (let i=0; i < json.weather.length; i++) {
        results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += "<p>"
      for (let i=0; i < json.weather.length; i++) {
        results += json.weather[i].description
        if (i !== json.weather.length - 1)
          results += ", "
      }
      results += "</p>"
      results += '<h2>Current temperature: ' + json.main.temp + " &deg;F</h2>"
      results += '<h4>Max temperature within the city: ' + json.main.temp_max + " &deg;F</h4>"
      results += '<h4>Min temperature within the city: ' + json.main.temp_min + " &deg;F</h4>"
      results += '<h4>Wind Speed: ' + json.wind.speed + ' mph</h4>'
      results += '<h4>Humidity: ' + json.main.humidity + ' %</h4>'
      results += '<br/><br/>';
      results += '</div>';
      document.getElementById("weatherResults").innerHTML = results;
    });
  const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=acac283ff7e535dc0e271bac64c53c4b";
  fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let forecast = "";
      forecast += '<h1 id="forecast">Forecast</h1>';
      forecast += '<div class="container">';
      forecast += '<div class="row r0">';
      var date = new Date(0);
      var row = 0;
      var col = 0;
      for (let i=0; i < json.list.length; i++) {
        if(i == 0) {
          date = new Date(json.list[i].dt_txt);
          var hour = date.getHours();
          while(hour != 0) {
            forecast += '<div class="col"></div>';
            hour -= 3;
            col++;
          }
        }
        if(col % 8 == 0 && i != 0) {
          row++;
          forecast += '</div><div class="row r' + row + '">';
          col = 0;
        }
        forecast += '<div class="col">';
        forecast += "<h4>" + moment(json.list[i].dt_txt).format('MMMM Do, h:mm a') + "</h4>";
        forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
        forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
        forecast += '<p>' + json.list[i].weather[0].main + '</p>';
        forecast += '<p>Humidity: ' + json.list[i].main.humidity + '%</p>';
        forecast += '<p>Wind speed: ' + json.list[i].wind.speed + ' mph</p>';
        forecast += '</div>';
        col++;
      }
      forecast += '</div>';
      forecast += '</div>';
      document.getElementById("forecastResults").innerHTML = forecast;
      console.log(json);
    });
});
