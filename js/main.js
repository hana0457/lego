$(document).ready(function() {
    $("header .btn-menu").on("click", function(){
        $(this).toggleClass("on");
        $("nav").toggleClass("active");
        var navToggle = $(this).hasClass("on");

        if(navToggle){
            $("nav").animate({
                "left" : "0"
            }, 300, function() {
                $("header .util .m").stop().fadeIn();
            });

            $("body").css("overflow","hidden");
        } else {
            $("nav").animate({
                "left" : "-100%"
            }, 300);

            var isFix = $("header").hasClass("fix");
            if(isFix){
                $("header .util .m").stop().fadeOut();
            }

            $("nav .sub").slideUp();
            $("body").css("overflow","unset");
        }
    })
    
    $("nav .gnb > li > a").on("click", function(e) {
        var winWidth = $(window).width();

        if(winWidth < 1200) {
            e.preventDefault();
            $(this).siblings(".sub").stop().slideToggle();
            $(this).parent().siblings().find(".sub").stop().slideUp();
        } 
    })

    
    var fixStart = $("header").offset().top; //resize
    $(window).on("scroll", function() {
        var scr = $(window).scrollTop(); //resize

        if(scr >= fixStart && !$("header .util .m").is(":animated")) {
            $("header").addClass("fix");
            $("header .util .m").stop().fadeOut();
        } else if(scr < fixStart && !$("header .util .m").is(":animated")) {
            $("header").removeClass("fix");
            $("header .util .m").stop().fadeIn();
        }
    });

    $(window).on("resize", function() {
        var winWidth = $(window).width();
        if(winWidth >= 1200) {
            $("nav .gnb .sub").css("display","none");
        }
    })

    var popSwiperImg = new Swiper(".popular .swiper-sliders .swiper-img", {
        spaceBetween : 20,
        navigation: {
          nextEl: ".popular .swiper-sliders .swiper-tit .slider-arrow button.next",
          prevEl: ".popular .swiper-sliders .swiper-tit .slider-arrow button.prev"
        },
        pagination: {
            el: ".popular .swiper-pagination",
            type: "fraction",
        },
        on : {
            slideChange : function() {
                var i = popSwiperImg.realIndex;
                popSwiperTxt.slideToLoop(i);
            }
        },
        breakpoints: {
            600: {
              spaceBetween: 0,
            },
            900: {
                spaceBetween: 0,
            },
            1200: {
                spaceBetween: 0,
            }
        }
    });
    
    var popSwiperTxt = new Swiper(".popular .swiper-sliders .swiper-tit", {
        effect: "fade",
    });


    var swiperCollab = new Swiper(".collab .vid", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        centeredSlides: true,
        slideToClickedSlide : true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        breakpoints: {
            1200: {
                slidesPerView: 2,
                spaceBetween: 20,
            }
        }
    });
    var prevVid = null;
    function playSliderVid() {
        var i = swiperCollab.realIndex;
        var p = swiperCollab.previousIndex;
        var currentVid = $(`.collab .vid .box${i+1}`).find("video");
        
        if(prevVid){
            for(q=0; q<prevVid.length; q++){
                prevVid[i].pause();
                console.log(prevVid[i].pause)
            }
        }
        $(".collab .txt-slider > div").eq(i).stop().fadeIn().removeClass("on");
        $(".collab .txt-slider > div").eq(i).siblings().stop().fadeOut().removeClass("on");
        for(q=0; q<currentVid.length; q++){
            currentVid[i].currentTime = 0
            currentVid[i].play();
        }
        prevVid = currentVid;
    }
    swiperCollab.on("slideChange", function(swiper) {
        playSliderVid();
    })
    playSliderVid();
    
});