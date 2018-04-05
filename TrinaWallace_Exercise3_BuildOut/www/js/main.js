var xmlhttp;
var $weatherURL;
 
window.onload = function () {
    document.addEventListener("deviceready", init, false);
    init();
}


function init() {  
    var location = "lethbridge";
    
    // SEND DATA TO THE DOM
    $("#submit").on("click", function () {
        location = $("input[name=city]").val();
        setWeatherURL(location);
//        console.log($weatherURL + " - weatherurl and location -" + location);
        weather();
        window.location.href="#home";
    });
    
    
    setWeatherURL(location);
//    console.log($weatherURL + " and also " + location);
    weather();
}

function setWeatherURL(location){
//    console.log ("setWeatherUrl location is:" + location);
    $weatherURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=metric&APPID=ac4442d3cc94f73f2a14aabd2a07da36";
}

function weather() {
    
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', $weatherURL, true); //this changes the state of xmlhttp
    xmlhttp.send();
    xmlhttp.onreadystatechange = getWeather;
}

function getWeather() { // when readystate changes
        
    //check to see if the client -4 and server -200 is ready
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

        var json = JSON.parse(xmlhttp.responseText);

        function Forcast(Temp, Descrip, Wind, Max, Min, Humid, Id, Name) {          
            this.temp = Temp;
            this.descrip = Descrip;
            this.wind = Wind;
            this.max = Max;
            this.min = Min;
            this.humid = Humid;
            this.id = Id;
            this.name = Name;
            
            document.getElementById("temp").innerHTML = Math.round(this.temp) + '&deg;C';
            document.getElementById("description").innerHTML = this.descrip;
            document.getElementById("wind").innerHTML = 'wind: ' + Math.round(this.wind)  + ' km/h';
            document.getElementById("humidity").innerHTML = 'humidity: ' + this.humid + '&#37;';
            document.getElementById("maxtemp").innerHTML = 'high: ' + Math.round(this.max) + '&deg;C';
            document.getElementById("mintemp").innerHTML = 'low: ' + Math.round(this.min) + '&deg;C';
            
            //API Mapping
            document.getElementById("id").innerHTML = '<i class="wi wi-owm-' + this.id + '"></i>';
            document.getElementById("name").innerHTML = this.name;
            
        }

        var current = new Forcast(json.list[0].main.temp, json.list[0].weather[0].description, json.list[0].wind.speed, json.list[0].main.temp_max, json.list[0].main.temp_min, json.list[0].main.humidity, json.list[0].weather[0].id, json.city.name);

        console.log("all info received from server");

    } else if(xmlhttp.readyState != 4 && xmlhttp.status != 200) {
        console.log("No Weather Data Found, Location is: " + location );
    }
}