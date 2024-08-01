let cryptoNavBtn = document.querySelector('.crypto')
let openHam = document.querySelector('#openHam');
let closeHam = document.querySelector('#closeHam');
let nav_middle = document.querySelector('.nav-middle');

const hamburgerEvent = (navigation, close, open) => {
    nav_middle.style.display = navigation;
    closeHam.style.display = close;
    openHam.style.display = open;
};

openHam.addEventListener('click', () => hamburgerEvent("flex", "block", "none"));
closeHam.addEventListener('click', () => hamburgerEvent("none", "none", "block"));

