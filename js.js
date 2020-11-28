"use strict"
console.log("pradzia");

const searchButton = document.getElementById("searchButton");
const placeCode = document.getElementById("searchCity");
const placeWeather = document.getElementById("place");
const placeCity = document.getElementById("placeCity");
const placeDate = document.getElementById("placeDate");


const placeForecast = async () => {
    console.log("spaudziu");
    try {
        // console.log(`${placeCode.value} miestos reiksme`);
        const getPlaceData = await fetch(`https://api.meteo.lt/v1/places/${placeCode.value}/forecasts/long-term`);
        const placesData = await getPlaceData.json();
        const forecastData = placesData.forecastTimestamps;
        // console.log(forecastData);
        const placeName = placesData.place;
        const city = placeName.name;
        placeCode.value=" ";

        //miestos pavadinimas
        placeCity.innerHTML = " ";
        placeDate.innerHTML = " ";
        const cityOne = document.createElement("div");
        cityOne.style.height = "70px";
        cityOne.style.marginTop = "15px";
        cityOne.style.marginLeft = "10px";
        const cityName = document.createElement("h3");
        console.log(city);
        cityName.innerHTML = city;
        cityName.style.color = "white";
        cityName.style.fontFamily = "Courier New";
        cityName.style.fontWeight="bold";
        cityName.style.fontSize="55px";

        placeCity.appendChild(cityOne);
        cityOne.appendChild(cityName);

        //skirtingu datu isprintinimas
        const newDates = forecastData.map(date => {
            const splitDate = date.forecastTimeUtc.split(" ");
            return splitDate[0];
            // console.log(splitDate);
        });
        const uniqueDate = newDates.reduce(function (x, y) {
            if (x.indexOf(y) == -1) x.push(y);
            return x;
        }, []);
        // console.log(uniqueDate);

        //cia per unikalias datas begam ir susidedam kiekviena i html'a
        uniqueDate.map(date => {
            // console.log(date);
            const finalDate = new Date(date).toDateString();
            const dateHTML = document.createElement("div");
            placeDate.appendChild(dateHTML);
            dateHTML.innerHTML = date;//idedam datos reiksme i HTML
            dateHTML.id = date;
            dateHTML.style.backgroundColor = "rgb(47,120,194,.5)";
            dateHTML.style.border = "1px white solid";
            dateHTML.setAttribute("class", "col-md");
            dateHTML.style.height = "75px";
            dateHTML.style.fontFamily = "Courier New";
            dateHTML.style.fontWeight = "bold";
            dateHTML.style.color = "white";
            dateHTML.style.display = "flex";
            dateHTML.style.textAlign = "center";
            dateHTML.style.alignItems = "center";
            dateHTML.style.fontSize = "17px";
            dateHTML.style.boxShadow = "-20px -10px 30px 10px";
            if (dateHTML.id === uniqueDate[0]) {
                dateHTML.innerHTML = "Today";
            } else {
                dateHTML.innerHTML = finalDate;
            }
            dateHTML.style.transform = "scale(1)";

            // pridetiValandosOrus();
            dateHTML.addEventListener("click", pridetiValandosOrus); //spaudziam ant divo su data cia

            //sudeda divus su valandom visu dienu
            function pridetiValandosOrus() {
                // console.log("spaudziu div prideti");
                placeWeather.innerHTML = " ";
                dateHTML.style.transform = "scale(0)";

                forecastData.forEach(forecast => {
                    console.log(forecast);
                    const str = forecast.forecastTimeUtc;
                    const dateFormat = str.split(" ")
                    const dateAdd = dateFormat[0];
                    const hour = dateFormat[1];
                    const hourFormat = hour.substr(0,5);

                    if (dateAdd === dateHTML.id) {
                        dateHTML.style.transform = "scale(1, 1.3)";
                        // console.log(dateAdd);
                        // console.log(uniqueDate.length);
                        // console.log(typeof(datesALL));
                        const forecastOne = document.createElement("div");
                        forecastOne.style.backgroundColor = "rgb(47,120,194,.6)";
                        forecastOne.style.border = "1px solid white";
                        forecastOne.style.display = "inline-block"; // scroll reikalinga
                        forecastOne.style.padding = "5px";
                        forecastOne.style.height = "390px";
                        forecastOne.style.fontFamily = "Courier New";
                        forecastOne.style.color = "white";
                        forecastOne.style.fontWeight = "bold";
                        forecastOne.setAttribute("class", "col-md-1 text-center")
                        const hourHTML = document.createElement("p");
                        hourHTML.innerHTML = hourFormat;
                        const temp = document.createElement("p");
                        temp.innerHTML = `${forecast.airTemperature} &deg;C`;
                        const precitation = document.createElement("p");
                        precitation.innerHTML = `${forecast.totalPrecipitation} %`;
                        const drop = document.createElement("img");
                        drop.src = "rain drops.ico";
                        drop.style.height="25px";
                        const wind = document.createElement("p");
                        wind.innerHTML = `Wind: ${forecast.windSpeed} m/s`;

                        placeWeather.appendChild(forecastOne);
                        forecastOne.appendChild(hourHTML);
                        forecastOne.appendChild(temp);
                        const icon = document.createElement("p");
                        icon.style.height="60px";
                        icon.style.alignItems="center";
                        switch (forecast.conditionCode){
                            case ("clear"):
                                icon.innerHTML = `<img src="clear.svg" height="60px">`;
                                break;
                            case ("isolated-clouds"):
                                icon.innerHTML = `<img src="isolated-clouds.png" height="60px">`;
                                break;
                            case ("scattered-clouds"):
                                icon.innerHTML = `<img src="scattered-clouds.png" height="60px">`;
                                break;
                            case ("overcast"):
                                icon.innerHTML = `<img src="overcast.png" height="60px">`;
                                break;
                            case ("light-rain"):
                                icon.innerHTML = `<img src="" height="60px">`;
                                break;
                            case ("moderate-rain"):
                                icon.innerHTML = `<img src="" height="60px">`;
                                break;
                            case ("heavy-rain"):
                                icon.innerHTML = `<img src="" height="60px">`;
                                break;
                            case ("sleet"):
                                icon.innerHTML = `<img src="" height="60px">`;
                                break;
                            case ("light-snow"):
                                icon.innerHTML = `<img src="" height="60px">`;
                                break;
                            case ("moderate-snow"):
                                icon.innerHTML = `<img src="" height="60px">`;
                                break;
                            case ("heavy-snow"):
                                icon.innerHTML = `<img src="" height="60px">`;
                                break;
                            case ("fog"):
                                icon.innerHTML = `<img src="" height="60px">`;
                                break;
                            case ("na"):
                                icon.innerHTML = `<img src="" height="60px">`;
                        }
                        forecastOne.appendChild(icon);

                        forecastOne.appendChild(drop);
                        forecastOne.appendChild(precitation);
                        forecastOne.appendChild(wind);

                    }

                });
            }
        });
    } catch (error) {
        console.log("Can't load the data!")
    }
}

function clearName () {
    document.getElementById("searchCity").innerHTML=" ";
}

searchButton.addEventListener("click", function (e) {
    placeForecast ();
    clearName();
});





