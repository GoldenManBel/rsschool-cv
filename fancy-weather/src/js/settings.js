const buttonChangeBackground = document.querySelector('.background-change');
const buttonChangeBackgroundSvg = document.querySelector('.background-change-svg');
const buttonSelectLanguage = document.querySelector('.languages');
const buttonSelectUnits = document.querySelector('.celsius-fahrenheit');
const buttonChangeTopic = document.querySelector('.change-topic');
const wrapper = document.querySelector('.wrapper');
const background = document.querySelector('.background-image');

const searchInputField = document.querySelector('.search-input-field');
const searchButton = document.querySelector('.search-button');


const scriptWeatherInformation = require('./weather-information');
const scriptLocation = require('./location-information');



//change the background when the button is clicked
function changeBackground() {
    buttonChangeBackground.addEventListener('click', () => {
        animatesIconButtonChangeBackground();
        backgroundChangeRequest();    
    });    
}


//animates the icon on the background change button
function animatesIconButtonChangeBackground() {
    buttonChangeBackgroundSvg.style.transform = 'rotate(360deg)';
    setTimeout(() => buttonChangeBackgroundSvg.style.transform = 'rotate(0deg)', 500);    
}


//background change request
async function backgroundChangeRequest() {
    const url = 'https://api.unsplash.com/photos/random?query=morning&client_id=oXHFq9zyQRKcxh8r5Q4rRCtMvcYIrT8bFy1AGkbBoMY';
    try {
        const response = await fetch(url);
        if(!response.ok) {
            console.log('Failed to load image data');
        }
        const data = await response.json(); 
        smoothBackgroundChange(data); 
    } catch (error) {
        console.log(error);
    }
}    


//smooth background change
function smoothBackgroundChange(data) {
    background.style.opacity = '0';
        setTimeout(() => {
            background.setAttribute('src', data.urls.regular);
            setTimeout(() => background.style.opacity = '0.8', 300);            
        }, 300);
}


//change page language
function changeLanguage() {
    buttonSelectLanguage.value = localStorage.language || 'en';
    buttonSelectLanguage.addEventListener('click', () => {
        localStorage.language = buttonSelectLanguage.value;
        scriptLocation.getGeocoding();
        changeLanguageSearchButton();      
    });
}


//toggle temperature degrees
function switchDegrees() {
    buttonSelectUnits.addEventListener('click', () => {  
        localStorage.degrees = buttonSelectUnits.checked;
        scriptWeatherInformation.updateWeatherInformation(); 
        scriptWeatherInformation.updateWeatherInformationThreeDay();    
    });
}


//change site theme
function changeSiteTheme() {
    if(localStorage.siteTheme === 'black') wrapper.classList.add('black-theme');
    buttonChangeTopic.addEventListener('click', () => {
        if(localStorage.siteTheme === undefined || localStorage.siteTheme === 'white') {
            localStorage.siteTheme = 'black';
            wrapper.classList.add('black-theme');
        } else {
            wrapper.classList.remove('black-theme');
            localStorage.siteTheme = 'white'; 
        }   
    });
}


//change the language of the search button
function changeLanguageSearchButton() {
    searchButton.innerText = localStorage.language === 'be' ? `ПОШУК` :
                             localStorage.language === 'ru' ? `ПОИСК` :
                                                              `SEARCH`;

    localStorage.language === 'be' ? searchInputField.setAttribute('placeholder', 'Пошук горада') :                                                         
    localStorage.language === 'ru' ? searchInputField.setAttribute('placeholder', 'Искать город') :                                                         
                                     searchInputField.setAttribute('placeholder', 'Search city');                                                        
}


module.exports = {
    backgroundChangeRequest: backgroundChangeRequest,
    buttonSelectUnits: buttonSelectUnits
};


changeLanguageSearchButton();
changeBackground();
changeLanguage();
switchDegrees();
changeSiteTheme();
