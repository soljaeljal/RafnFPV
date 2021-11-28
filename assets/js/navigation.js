//"How To Hide Menu on Scroll" (w3schools.com) 

// let prevScrollpos = window.pageYOffset;
// window.onscroll = function() {
// let currentScrollPos = window.pageYOffset;
//   if (prevScrollpos > currentScrollPos) {
//     document.querySelector('.top-nav').style.top = "0";
//   } else {
//     document.getElementById('.top-nav').style.top = "-50px";
//   }
//   prevScrollpos = currentScrollPos;
// }


//"Responsive navigation menu"
//Code is from (Ed, 2018)
function navSlide() {
  const burger = document.querySelector(".top-nav__burger");
  const nav = document.querySelector(".nav__list");
  const navLinks = document.querySelectorAll(".nav__list .nav__item");

  burger.addEventListener("click", () => {
    //Open and close the hamburger menu
    nav.classList.toggle("nav-active");

    //Animate navigation links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
      }
    });

    //Burger Animation
    burger.classList.toggle("toggle");
  });
}
navSlide();

//Code is from (Subsign, 2017)
//"Responsive video popup on click"
function toggle() {
  let reel = document.querySelector('.reel');
  let video = document.querySelector('video');
  reel.classList.toggle('active'); //add/remove active class on toggle (btn click)
  video.pause(); //pause the video when it is closed
  video.currentTime = 0;
}

//Code is from (W3schools, 2021)
//"How to create a scroll back to top button"
mybutton = document.querySelector('.scroll-top');
window.onscroll = function() {
  scrollAppear()
};

//Scroll button is visible after scrolling 200px.
function scrollAppear() {
  if (document.body.scrollTop > 1200 || document.documentElement.scrollTop > 1200) {
    mybutton.style.visibility = 'visible';
  } else {
    mybutton.style.visibility = 'hidden';
  }
}

//Scrolls back to top 0
function backToTop() {
  document.body.ScrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//Play videos on hover from https://www.youtube.com/watch?v=dx4oAxaR1As&ab_channel=OnlineTutorials
const featuredVideo = document.querySelectorAll(".featured__video"); //Selects all featured videos
for (let i = 0; i < featuredVideo.length; i++) { //loops through all videos
  featuredVideo[i].addEventListener('mouseenter', //plays video on hover
  function(e){
    featuredVideo[i].play()
  })
  featuredVideo[i].addEventListener('mouseout',  //pauses video on mouseout
  function(e){
    featuredVideo[i].pause()
})
}
