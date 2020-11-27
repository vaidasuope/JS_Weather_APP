"use strict"
console.log("pradzia");

const searchButton = document.getElementById("searchButton");
const placeWeather = document.getElementById("place");
const placeCity = document.getElementById("placeCity");
const placeDate = document.getElementById("placeDate");

const placeForecast = async () => {
    console.log("spaudziu");

    const placeCode = document.getElementById("searchCity");
    // console.log(placeCode.value);
    const getPlaceData = await fetch(`https://api.meteo.lt/v1/places/${placeCode.value}/forecasts/long-term`);
    const placesData = await getPlaceData.json();
    console.log(placesData.place.name);
    const forecastData = placesData.forecastTimestamps;
    console.log(forecastData);

    //miestos pavadinimas
    const cityOne = document.createElement("div");
    cityOne.style.width="250px";
    cityOne.style.height="100px";
    cityOne.style.border = "1px solid white";
    const cityName = document.createElement("h3");
    cityName.innerHTML=placesData.place.name;
    cityName.style.color="white";
    cityName.style.fontFamily = "Cooper Black";

    placeCity.appendChild(cityOne);
    cityOne.appendChild(cityName);

    //skirtingu datu isprintinimas
    const newDates = forecastData.map(date => {
        const splitDate = date.forecastTimeUtc.split(" ");
        return splitDate[0];
        // console.log(splitDate);
    });
    const uniqueDate = newDates.reduce(function (x,y){
        if (x.indexOf(y)==-1) x.push(y);
        return x;
    }, []);
    // console.log(uniqueDate);

    //cia per unikalias datas begam ir susidedam kiekviena i html'a

    let datesALL;
    const allDates = document.createElement("div");
    datesALL = allDates;

   uniqueDate.map(date =>{
        console.log(date);

        const dateHTML = document.createElement("div");
        placeDate.appendChild(dateHTML);
        dateHTML.innerHTML = date;//idedam datos reiksme i HTML
        datesALL = date;
        dateHTML.style.border = "1px solid white";
        dateHTML.style.width = "150px";
        dateHTML.style.height = "100px";

        dateHTML.addEventListener("click", pridetiValandosOrus); //spaudziam ant divo su data cia

    });

   //sudeda divus su valandom visu dienu

    function pridetiValandosOrus() {
        console.log("spaudziu div prideti");

        forecastData.forEach(forecast => {
            // console.log(forecast.forecastTimeUtc);
            const str = forecast.forecastTimeUtc;
            const dateFormat = str.split(" ")
            const date = dateFormat[0];
            const hour = dateFormat[1];

            if (date === datesALL) {

                const forecastOne = document.createElement("div");
                forecastOne.style.border = "1px solid white";
                forecastOne.style.display = "inline-block"; // scroll reikalinga
                forecastOne.style.padding = "5px";
                forecastOne.style.height = "300px";
                const dateHTML = document.createElement("p");
                dateHTML.innerHTML = date;
                const hourHTML = document.createElement("p");
                hourHTML.innerHTML = hour;
                const temp = document.createElement("p");
                temp.innerHTML = forecast.airTemperature;
                const cloud = document.createElement("p");
                cloud.innerHTML = `Cloud: ${forecast.cloudCover}`;

                placeWeather.appendChild(forecastOne);
                forecastOne.appendChild(dateHTML);
                forecastOne.appendChild(hourHTML);
                forecastOne.appendChild(cloud);
                forecastOne.appendChild(temp);
            }
        });
    }








    // let pickedDate = 0;
    // forecastData.forEach(date => {
    //     const splitDate = date.forecastTimeUtc.split(" ");
    //     console.log(splitDate[0]);
    //
    //     const dateHTML = document.createElement("div");
    //     // placeDate.appendChild(dateHTML);
    //     // dateHTML.innerHTML = splitDate[0]//idedam datos reiksme i HTML
    //     dateHTML.id = pickedDate;
    //     if (pickedDate!=splitDate[0]){
    //         console.log("ifas");
    //         const dateHMTL2=document.createElement("div");
    //         dateHMTL2=dateHTML;
    //         console.log([splitDate[0]]);
    //     }
    // })



        // oru valandomis isprintinimas
        forecastData.forEach(forecast => {
            console.log(forecast.forecastTimeUtc);

            const str = forecast.forecastTimeUtc;
            const dateFormat = str.split(" ")
            const date = dateFormat[0];
            const hour = dateFormat[1];
            console.log(date);


            //
            //     //valandine temperatura
            //     const forecastOne = document.createElement("div");
            //     forecastOne.style.border = "1px solid white";
            //     forecastOne.style.display = "inline-block"; // scroll reikalinga
            //     forecastOne.style.padding = "5px";
            //     forecastOne.style.height = "300px";
            //     const dateHTML = document.createElement("p");
            //     dateHTML.innerHTML = date;
            //     const hourHTML = document.createElement("p");
            //     hourHTML.innerHTML = hour;
            //     const temp = document.createElement("p");
            //     temp.innerHTML = forecast.airTemperature;
            //     const cloud = document.createElement("p");
            //     cloud.innerHTML = `Cloud: ${forecast.cloudCover}`;
            //
            //     placeWeather.appendChild(forecastOne);
            //     forecastOne.appendChild(dateHTML);
            //     forecastOne.appendChild(hourHTML);
            //     forecastOne.appendChild(cloud);
            //     forecastOne.appendChild(temp);


            // console.log(date);
            // console.log(hour);
        });

    }

placeForecast();//kad isijungus puslapi rodytu Kauna, tai funkcija turi buti iskviesta

//po paieskos mygtuko paspaudimo ismeta orus

searchButton.addEventListener("click", placeForecast);


