
var lat, lon, city, livecount;

function loadGoogleTranslate() {
    new google.translate.TranslateElement("google-element");
    
}

function soundClick() {
    audio.src = "sound effect/Mouse-Click.mp3"
    audio.play()
}

function readCookie() {
    var nm = document.cookie.split(';')
    var cookiekey="";
    for (var i = 0; i < nm.length; i++) {
        cookiekey=nm[i].split('=')[0]
    
        if(cookiekey.includes("lat"))
            lat = nm[i].split('=')[1]
        else if(cookiekey.includes("lon"))
        lon = nm[i].split('=')[1]
        else if(cookiekey.includes("city"))
        city = nm[i].split('=')[1]
        else if(cookiekey.includes("livecount"))
        livecount = nm[i].split('=')[1]
    }
    requestApiByCitynm(lat, lon)

}


function requestApiByCitynm(lat, lon) {
    api = "https://api.openweathermap.org/data/2.5/air_pollution?lat=" + lat + "&lon=" + lon + "&appid=32fe577236f9af632129c8b909d1ced6";
    fetchData();
}

function fetchData() {
    //infoTxt.innerText = "Getting weather details...";
    //infoTxt.classList.add("pending");
    // getting api response and returning it with parsing into js obj and in another 
    // then function calling weatherDetails function with passing api result as an argument
    fetch(api).then(res => res.json()).then(result => airPollutionDetail(result)).catch(() => {
        //infoTxt.innerText = "Something went wrong";
        //infoTxt.classList.replace("pending", "error");
    });
}

function airPollutionDetail(ap) {

    const { co, no, no2, o3, so2, pm2_5, pm10, nh3 } = ap.list[0].components
    const aqi = ap.list[0].main.aqi
    //alert(aqi)
    let o3txt = document.querySelector('.parameters-options .o3-value');
    o3txt.innerText = o3 + ' µg/m³';
    let cotxt = document.querySelector('.parameters-options .co-value')
    cotxt.innerText = co + ' µg/m³';
    let notxt = document.querySelector('.parameters-options .no-value')
    notxt.innerText = no + ' µg/m³';
    let so2txt = document.querySelector('.parameters-options .so2-value')
    so2txt.innerText = so2 + ' µg/m³';
    let no2txt = document.querySelector('.parameters-options .no2-value')
    no2txt.innerText = no2 + ' µg/m³';
    let pm10txt = document.querySelector('.parameters-options .pm10-value')
    pm10txt.innerText = pm10 + ' µg/m³';
    let pm25txt = document.querySelector('.parameters-options .pm25-value')
    pm25txt.innerText = pm2_5 + ' µg/m³';
    let nh3txt = document.querySelector('.parameters-options .nh3-value')
    nh3txt.innerText = nh3 + ' µg/m³';
    let headtxt = document.querySelector(".locationforhead span")
    headtxt.innerText = city;
    let airtext = document.querySelector(".airqualityindex span")

    if (aqi == 1)
        airtext.innerText = "Good"
    else if (aqi == 2)
        airtext.innerText = "Fair"
    else if (aqi == 3)
        airtext.innerText = "Moderate"
    else if (aqi == 4)
        airtext.innerText = "Poor"
    else
        airtext.innerText = "Very Poor"


    let livecounttext = document.querySelector(".live_count span")
    livecounttext.innerText = livecount

}