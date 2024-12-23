// ____________________________header_________________________________
// ____________________________header_________________________________
// ____________________________header_________________________________

const hamberBtn = document.querySelector("#hamber-menu"),
  navBar = document.querySelector("nav.menu"),
  navCloser = document.querySelector("#nav-closer");
hamberBtn.addEventListener("click", () => {
  navBar.classList.remove("translate-x-[1890px]");
});
navCloser.addEventListener("click", () => {
  navBar.classList.add("translate-x-[1890px]");
});

// _________________________________swipers_____________________________________
// _________________________________swipers_____________________________________
// _________________________________swipers_____________________________________

var swiper1 = new Swiper(".first-swiper", {
  slidesPerView: 4,
  speed: 400,
  centeredSlides: false,
  spaceBetween: 30,
  grabCursor: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  loop: true,
  pagination: {
    el: ".swiper-pagination-first",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next-first",
    prevEl: ".swiper-button-prev-first",
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
});
var swiper = new Swiper(".first-swiper-mob", {
  direction:"vertical",
  slidesPerView: 4,
  speed: 400,
  centeredSlides: false,
  spaceBetween: 10,
  grabCursor: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  loop: true,
  pagination: {
    el: ".swiper-pagination-first-mob",
    clickable: true,
  },

  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
  },
});
var swiper3 = new Swiper(".swiper-about-desktop", {
  slidesPerView: 5,
  speed: 400,
  centeredSlides: false,
  spaceBetween: 30,
  grabCursor: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  loop: false,
});
var swiper4 = new Swiper(".swiper-about-mob", {
  slidesPerView: 1.2,
  speed: 400,
  centeredSlides: false,
  spaceBetween: 10,
  grabCursor: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  loop: false,
});
// ____________________________________common questions______________________________________
// ____________________________________common questions______________________________________
// ____________________________________common questions______________________________________

const questionBox = document.querySelectorAll(
  ".common-questions .parent-box .box-container"
);

questionBox.forEach((item) => {
  item.addEventListener("click", () => {
    const answer = item.querySelector("#answer");
    if (answer.classList.contains("hidden")) {
      answer.classList.remove("hidden");

      item.querySelector("span").classList.add("-rotate-180");
    } else {
      answer.classList.add("hidden");
      item.querySelector("span").classList.remove("-rotate-180");
    }
  });
});
document.body.addEventListener("click", (e) => {
  questionBox.forEach((item) => {
    if (!item.contains(e.target)) {
      const answer = item.querySelector("#answer");
      answer.classList.add("hidden");
      item.querySelector("span").classList.remove("-rotate-180");
    }
  });
});


// _____________________________________searchEngine______________________________________
// _____________________________________searchEngine______________________________________
// _____________________________________searchEngine______________________________________


function loadContentHomaPage() {
  loadSearchEngine("search-engine.bc", "search-box");
}
async function loadSearchEngine(url, sectionload) {
  try {
    var xhrobj = new XMLHttpRequest();
    xhrobj.open("GET", url);
    xhrobj.send();

    xhrobj.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var container = document.getElementById(sectionload);
        container.innerHTML = xhrobj.responseText;

        var scripts = container.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
          var scriptTag = document.createElement("script");
          if (scripts[i].src) {
            scriptTag.src = scripts[i].src;
            scriptTag.async = false;
          } else {
            scriptTag.text = scripts[i].textContent;
          }
          document.head
            .appendChild(scriptTag)
            .parentNode.removeChild(scriptTag);
        }
        const pathnamehome = window.location.pathname;
        if (pathnamehome) {
          if (pathnamehome == "/hotel") {
            sessionStorage.setItem("pageName", "hotel");
            $(".date_info_selected").find(".type_date").text("تاریخ رفت :"),
              $(".date_info_selected").find(".day_of_date").text("---"),
              $(".date_info_selected").find(".month_of_date").text(" "),
              $(".hotel-btn").removeClass("inactive"),
              $(".selected").removeClass("active-module"),
              $(".hotel-btn").addClass("active-module"),
              $(".flight-btn").addClass("inactive"),
              $(".flighthotel-btn").addClass("inactive"),
              $(".tour-btn").addClass("inactive"),
              $(".r-hotel").show(),
              $(".r-flight").hide(),
              $(".r-tour").hide(),
              $(".r-flighthotel").hide();
          } else if (pathnamehome == "/flight") {
            sessionStorage.setItem("pageName", "flight");
            $(".date_info_selected").find(".type_date").text("تاریخ رفت :"),
              $(".date_info_selected").find(".day_of_date").text("---"),
              $(".date_info_selected").find(".month_of_date").text(" "),
              $(".flight-btn").removeClass("inactive"),
              $(".selected").removeClass("active-module"),
              $(".flight-btn").addClass("active-module"),
              $(".hotel-btn").addClass("inactive"),
              $(".tour-btn").addClass("inactive"),
              $(".flighthotel-btn").addClass("inactive"),
              $(".r-flight").show(),
              $(".r-hotel").hide(),
              $(".r-tour").hide(),
              $(".r-flighthotel").hide();
          }
        }
      }
    };
  } catch (error) {
    // console.error('مشکلی رخ داده است لطفا صبور باشید.', error);
  }
}


// ______________________________flight card________________________________________________
// ______________________________flight card________________________________________________
// ______________________________flight card________________________________________________

const flightCard=document.querySelectorAll(".flight-card")
flightCard.forEach((card)=>{
  card.addEventListener("click",()=>{
    const departureCity=card.querySelector(".departureCity").innerText
    const destinationCity=card.querySelector(".destinationCity").innerText

    document.querySelector("#r-flight #flightSearch .FCD1").value=departureCity
    //  console.log(document.querySelector("#r-flight #flightSearch .FCDid1"));
    
  document.querySelector("#r-flight #flightSearch .FCD2").value=destinationCity
   //  console.log(document.querySelector("#r-flight #flightSearch .FCDid2"));


    document.querySelector("#multi-flight-form").classList.add("hidden");
              document.querySelector("#r-flight").classList.remove("hidden");
              var searchBox = document.querySelector(".serch-box-container");
              if(searchBox){
                window.scrollTo({
                   top: searchBox.offsetTop,
                  behavior: "smooth",
                })
              }
  })
})


if (document.querySelector(".soon-card")){
  const soonCard=document.querySelector(".soon-card")
soonCard.addEventListener("click",()=>{
      const departureCity=soonCard.querySelector(".departureCity").innerText
    const destinationCity=soonCard.querySelector(".destinationCity").innerText

    
    document.querySelector("#r-flight #flightSearch .FCD1").value=departureCity
    //  console.log(document.querySelector("#r-flight #flightSearch .FCDid1"));
    
  document.querySelector("#r-flight #flightSearch .FCD2").value=destinationCity
   //  console.log(document.querySelector("#r-flight #flightSearch .FCDid2"));

   
    document.querySelector("#multi-flight-form").classList.add("hidden");
              document.querySelector("#r-flight").classList.remove("hidden");
              var searchBox = document.querySelector(".serch-box-container");
              if(searchBox){
                window.scrollTo({
                   top: searchBox.offsetTop,
                  behavior: "smooth",
                })
              }
})
}










