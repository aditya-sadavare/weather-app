infoTxt = document.querySelector(".info-txt");
//inputFieldCitynm = document.querySelector('[name="t1"]');
weatherMain = document.querySelector(".weather-main");
weatherMumbai = document.querySelector(".weather-mumbai");
weatherDelhi = document.querySelector(".weather-delhi");
weatherPune = document.querySelector(".weather-pune");

userCityNm = document.querySelector(".cityname")
userCityPin = document.querySelector(".citypin")


backGif = document.querySelector('.backgroundgif');


var hrs
var min
var sec
var session

var weathermaincity
//wIcon = weatherMain.querySelector("img")
var choice = 0
var api
var contryCode = ' '
var maincity = new Array("mumbai", "delhi", "pune")
var lang = 'EN'
var city=''
var pin
var historyCity = ''

var lat, lon;

var audio = new Audio()

var livecount

//createHistoryCity(city)

function loadGoogleTranslate() {
    new google.translate.TranslateElement("google-element");
}

function soundClick() {
    audio.src = "sound effect/Mouse-Click.mp3"
    audio.play()
}



function displayInitialWeather() {
    getHistoryCity()
    if (!/^\d*$/.test(historyCity)) {
       //alert("indisplay "+historyCity )
        requestApiByCitynm(historyCity)
    }

}

function checkOp(ch) {
    userCityNm.style.display = "none"
    userCityPin.style.display = "none"

    choice = ch
    with (document) {
        if (choice == 1) {
            userCityNm.style.display = "block"

        }
        else if (choice == 2) {
            userCityPin.style.display = "block"
        }
        else {
            if (navigator.geolocation) { // if browser support geolocation api
                navigator.geolocation.getCurrentPosition(onSuccess, onError);
            } else {
                alert("Your browser not support geolocation api");
            }
        }


    }
}

function showRes() {


    with (document) {
        city = t1.value
        contryCode = t2.value
        pin = t3.value
        //lang = t4.value
        if (choice == 1) {
            if (t1.value == '') {
                alert('Enter city name properly')
            }
            else {
                requestApiByCitynm(city)
            }

        }
        else if (choice == 2) {
            if (t3.value == '') {
                alert('Enter proper pin')
            }
            else {
                requestApiCitypin(contryCode, pin)
            }
        }

    }
}

function requestApiByCitynm(city) {
    api = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&lang=" + lang + "&appid=32fe577236f9af632129c8b909d1ced6";
    fetchData(1);
}

function requestApiCitypin(contryCode, zip) {
    api = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + "," + contryCode + "&units=metric&lang=" + lang + "&appid=32fe577236f9af632129c8b909d1ced6";
    fetchData(1);
}

function onSuccess(position) {

    const { latitude, longitude } = position.coords; // getting lat and lon of the user device from coords obj
    api = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=metric&lang=" + lang + "&appid=32fe577236f9af632129c8b909d1ced6";
    fetchData(1);
}

function onError(error) {
    // if any error occur while getting user location then we'll show it in infoText
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function requestApiForMainCity() {
    weatherMain.style.display = "none"
    //    showSlides()
    for (var i = 0; i < maincity.length; i++) {
        api = "https://api.openweathermap.org/data/2.5/weather?q=" + maincity[i] + "&units=metric&lang=" + lang + "&appid=32fe577236f9af632129c8b909d1ced6";
        fetchData(0);

    }
    //displayTime()
}

function fetchData(choice) {
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    // getting api response and returning it with parsing into js obj and in another 
    // then function calling weatherDetails function with passing api result as an argument
    fetch(api).then(res => res.json()).then(result => weatherDetails(result, choice)).catch(() => {
        infoTxt.innerText = "Something went wrong";
        infoTxt.classList.replace("pending", "error");
    });
}

function longtotimeUTC(date) {
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm + " (UTC)";
    return strTime
}
function longtotimeIST(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm + "  (IST)";
    return strTime
}
function monDaydate(date) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = weekday[date.getDay()];
    var str = day + " " + date.toLocaleString('default', { month: 'short', }) + " , " + date.getDate();
    return str
}
function myTimer() {
    const d = new Date();
    var time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    weatherMain.querySelector(".time span").innerText = time;
}
setInterval(myTimer, 1000);

function createHistoryCity(city) {
    var cdate = new Date()
    cdate.setMonth(cdate.getMonth() + 3)
    document.cookie = "historyCity=" + city + ";" + "expires=" + cdate.toGMTString() + ";"
}

function getHistoryCity() {
    var nm = document.cookie.split(';')
    var cookiekey="";
    for (var i = 0; i < nm.length; i++) {
        cookiekey=nm[i].split('=')[0]

        if(cookiekey.includes("historyCity"))
        historyCity = nm[i].split('=')[1]
    }
}

function weatherDetails(info, choice) {
    if (info.cod == "404" || info.cod == '400') { // if user entered city name isn't valid
        //infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = "";
        alert(info.message)
    } else {
        lat = info.coord.lat
        lon = info.coord.lon
        //alert(lat+'  '+lon)
        //document.cookie = "username=Aditya;"

        //getting required properties value from the whole weather information
        const city = info.name;


        const country = info.sys.country;
        const { description, id } = info.weather[0];
        const { temp, temp_min, temp_max, pressure, humidity } = info.main;
        const { sunrise, sunset } = info.sys;
        const wind = info.wind.speed;
        const deg = info.wind.deg;
        const visibility = info.visibility / 1000;
        const datedisp = monDaydate(new Date())

        if (country == "IN") {
            var sunrisetime = longtotimeIST(new Date(sunrise * 1000))
            var sunsettime = longtotimeIST(new Date(sunset * 1000))
        }
        else {
            var sunrisetime = longtotimeUTC(new Date(sunrise * 1000))
            var sunsettime = longtotimeUTC(new Date(sunset * 1000))
        }

        if (choice == 1) {
            weathermaincity = weatherMain
            weatherMain.style.display = "block"

            document.cookie = "lat=" + lat + ";"
            document.cookie = "lon=" + lon + ";"
            document.cookie = "city=" + city + ";"
            createHistoryCity(city)

            /*if (id == 800) 
                {
                    weatherMain.style.backgroundImage = "url('icons/cloud.gif')"
                } else if (id >= 200 && id <= 232) {
                    weatherMain.style.backgroundImage = "url('icons/rain1.gif')"
                } else if (id >= 600 && id <= 622) {
                    weatherMain.style.backgroundImage = "url('icons/rain1.gif')"
                } else if (id >= 701 && id <= 781) {
                    weatherMain.style.backgroundImage = "url('icons/rain1.gif')"
                } else if (id >= 801 && id <= 804) {
                    weatherMain.style.backgroundImage = "url('icons/cloud1.gif')"

                } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) 

                {
                    weatherMain.style.backgroundImage = "url('icons/rain1.gif')"
                }*/


            weathermaincity.querySelector(".temp .numb").innerText = temp;
            weathermaincity.querySelector(".weather").innerText = description;
            weathermaincity.querySelector(".location span").innerText = `${city}, ${country}`;
            weathermaincity.querySelector(".humidity span").innerText = `${humidity}%`;
            weathermaincity.querySelector(".locationforhead span").innerText = `${city}`;
            weathermaincity.querySelector(".sunrise span").innerText = `${sunrisetime}`;
            weathermaincity.querySelector(".sunset span").innerText = `${sunsettime}`;
            weathermaincity.querySelector(".wind-speed span").innerText = `${wind}`;
            weathermaincity.querySelector(".wind_dir span").innerText = `${deg}`;
            weathermaincity.querySelector(".date span").innerText = `${datedisp}`;
            weathermaincity.querySelector(".tempmax span").innerText = `${temp_max}`;
            weathermaincity.querySelector(".tempmin span").innerText = `${temp_min}`
            weathermaincity.querySelector(".pressure span").innerText = `${pressure}`
            //alert(weathermaincity.wind_dir.style.)

            if (id == 800) {
                weathermaincity.querySelector(".wIcon").src = "icons/clear.gif";

            } else if (id >= 200 && id <= 232) {
                weathermaincity.querySelector(".wIcon").src = "icons/storm.gif";
            } else if (id >= 600 && id <= 622) {
                weathermaincity.querySelector(".wIcon").src = "icons/snow.gif";
            } else if (id >= 701 && id <= 781) {
                weathermaincity.querySelector(".wIcon").src = "icons/haze.gif";
            } else if (id >= 801 && id <= 804) {
                weathermaincity.querySelector(".wIcon").src = "icons/cloud.gif";

                //document.style.backgroundImage = "url('background/clear.JPG')";
            } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
                weathermaincity.querySelector(".wIcon").src = "icons/rain.gif";
            }


        }
        else {
            if (city == 'Mumbai') {
                weathermaincity = weatherMumbai

            }
            else if (city == 'Delhi') {
                weathermaincity = weatherDelhi

            }
            else {
                weathermaincity = weatherPune

            }
            weathermaincity.querySelector(".temp .numb").innerText = temp;
            weathermaincity.querySelector(".weather").innerText = description;
            weathermaincity.querySelector(".location span").innerText = `${city}, ${country}`;
            weathermaincity.querySelector(".humidity span").innerText = `${humidity}%`;

            if (id == 800) {
                weathermaincity.querySelector(".wIcon").src = "icons/clear.svg";

            } else if (id >= 200 && id <= 232) {
                weathermaincity.querySelector(".wIcon").src = "icons/storm.svg";
            } else if (id >= 600 && id <= 622) {
                weathermaincity.querySelector(".wIcon").src = "icons/snow.svg";
            } else if (id >= 701 && id <= 781) {
                weathermaincity.querySelector(".wIcon").src = "icons/haze.svg";
            } else if (id >= 801 && id <= 804) {
                weathermaincity.querySelector(".wIcon").src = "icons/cloud.svg";

                //document.style.backgroundImage = "url('background/clear.JPG')";
            } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
                weathermaincity.querySelector(".wIcon").src = "icons/rain.svg";
            }

        }

        //alert(weathermaincity.querySelector(".wIcon").src)
        //using custom weather icon according to the id which api gives to us


        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
    }
}
