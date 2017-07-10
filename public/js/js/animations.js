//dependencies
const polyfill = require('smoothscroll-polyfill').polyfill()

function smoothscroll() {
    var link = document.getElementsByClassName("nav-item")
    document.querySelector('.hello').scrollIntoView({ behavior: 'smooth' });
}