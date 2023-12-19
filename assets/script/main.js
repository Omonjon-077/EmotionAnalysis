'use strict'
/*=============== LOADER ===============*/
document.addEventListener('DOMContentLoaded', function (eventObject) {
    $('.load').fadeIn();
})
window.addEventListener("load", function (eventObject) {
    $('.load').fadeOut("slow");
});

/*=============== Header Fixed ===============*/
if ($("#myHeader").length) {
    window.onscroll = function () {
        myFunction()
    };

    let header = document.getElementById("myHeader");
    let sticky = header.offsetTop;

    function myFunction() {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }
}

/*=============== TIMER JS ===============*/
function countdown() {
    let seconds = 59;
    function tick() {
        let counter = document.getElementById("counter");
        seconds--;
        counter.innerHTML =
            "0:" + (seconds < 10 ? "0" : "") + String(seconds);
        if (seconds > 0) {
            setTimeout(tick, 1000);
        }
        else if (seconds == 0) {
           alert("You are out of time!!!");
        } else {
            document.getElementById("counter").innerHTML = "";
        }
    }
    tick();
}
countdown();

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 300 viewport height, add the show-scroll class to the a tag with the scrollup class
    this.scrollY >= 300 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)