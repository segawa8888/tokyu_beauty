"use strict";

/*jshint esversion: 6 */
$(function () {
  var windowWidth = $(window).width();
  /*-------- 画面幅が変わったときに、更新 --------*/

  var autoResizer = function autoResizer() {
    var timer = 0;
    var currentWidth = window.innerWidth;
    $(window).resize(function () {
      if (currentWidth == window.innerWidth) {
        return;
      }

      if (timer > 0) {
        clearTimeout(timer);
      }

      timer = setTimeout(function () {
        location.reload();
      }, 200);
    });
  };
  /*-------- 画面幅が変わったときに、更新 --------*/
});

const swiper_intro = new Swiper(".swiper_intro", {
  loop: true,
  // centeredSlides: true,
  // allowTouchMove: false,
  slidesPerView: 1,
  spaceBetween: 44,
  // freeMode: true,
  // slidesPerGroup: 1,
  // initialSlide: 1,
  // autoplay: {
    //   delay: 4800,
    //   disableOnInteraction: false,
    // },
    // speed: 800,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 44,
    },
    // 980: {
    // },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  }
});
const swiper_wellness = new Swiper(".swiper_wellness", {
  loop: true,
  loopAdditionalSlides: 1,
  centeredSlides: true,
  // allowTouchMove: false,
  slidesPerView: 1.3,
  spaceBetween: 30,
  // freeMode: true,
  // slidesPerGroup: 1,
  // initialSlide: 1,
  // autoplay: {
    //   delay: 4800,
    //   disableOnInteraction: false,
    // },
    // speed: 800,
    breakpoints: {
      768: {
      slidesPerView: 3,
      spaceBetween: 112,
    },
    // 980: {
    // },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  }
});

$(function () {
  $(".p_category__tab_item").on("click", function () {
    let index = $(".p_category__tab_item").index(this);

    $(".p_category__tab_item").removeClass("is_tab_active");
    $(this).addClass("is_tab_active");
    $(".p_category__contents").removeClass("is_contents_active");
    $(".p_category__contents").eq(index).addClass("is_contents_active");
  });
});
const slideDown = (el) => {
  el.style.height = "auto";
  let h = el.offsetHeight;
  el.style.height = h + "px";
  el.animate(
    [
      { height: 0 },
      { height: h + "px" },
    ],
    {
      duration: 400,
    }
  );
};

const slideUp = (el) => {
  el.style.height = 0;
};

let activeIndex = null;
const accordions = document.querySelectorAll("ul.nav__list");
accordions.forEach((accordion) => {
  const accordionBtns = accordion.querySelectorAll(".nav__accordion_btn");
  accordionBtns.forEach((accordionBtn, index) => {
    accordionBtn.addEventListener("click", (e) => {
      activeIndex = index;
      e.target.parentNode.classList.toggle("active");
      const content = accordionBtn.nextElementSibling;
      if (e.target.parentNode.classList.contains("active")) {
        slideDown(content);
      } else {
        slideUp(content);
      }
      accordionBtns.forEach((accordionBtn, index) => {
        if (activeIndex !== index) {
          accordionBtn.parentNode.classList.remove("active");
          const openedContent = accordionBtn.nextElementSibling;
          slideUp(openedContent);
        }
      });
      let container = accordion.closest(".scroll_control");
      if (
        accordionBtn.parentNode.classList.contains("active") == false &&
        container !== null
      ) {
        container.classList.remove("active");
      } else if (container !== null) {
        container.classList.add("active");
      }
    });
  });
});
$(function () {
  $(window).scroll(function () {
    var obj = $(".l_header__logo, .l_header__nav");
    scroll = $(window).scrollTop();
    if (scroll > 150) {
      obj.addClass("isSmall");
    } else {
      obj.removeClass("isSmall");
    }
  });
});

const ham = document.querySelector('#js-hamburger');
const nav = document.querySelector('#js-nav');
const body = document.querySelector('body');
ham.addEventListener('click', function () {
  ham.classList.toggle('active');
  nav.classList.toggle('active');
  body.classList.toggle('active');
});


$(".btt").click(function () {

  $("body,html").animate({
  scrollTop: 0,
  },480);
  });
  
  $(window).scroll(function () {
  let scroll = $(window).scrollTop();
  let wh = $(window).height();
  if (scroll > 150) {
  $(".btt").addClass("is-active");
  } else {
  $(".btt").removeClass("is-active");
  }
});

$(function () {
  const fade_bottom = 50; // 画面下からどの位置でフェードさせるか(px)
  const fade_move = 100; // どのぐらい要素を動かすか(px)
  const fade_time = 800; // フェードの時間(ms)
  // フェード前のcssを定義
  $(".scroll-fade-up").css({
    opacity: 0,
    transform: "translateY(" + fade_move + "px)",
    transition: fade_time + "ms",
  });
  // スクロールまたはロードするたびに実行
  $(window).on("scroll load", function () {
    const scroll_top = $(this).scrollTop();
    const scroll_bottom = scroll_top + $(this).height();
    const fade_position = scroll_bottom - fade_bottom;
    $(".scroll-fade-up").each(function () {
      const this_position = $(this).offset().top;
      if (fade_position > this_position) {
        $(this).css({
          opacity: 1,
          transform: "translateY(0)",
        });
      }
    });
  });
});

  // 
$(function() {
  $('.search_button').mouseover(function(e) {
      $('search_wrap_button ', 'ul').stop().slideDown('fast');
  })
    .mouseout(function(e) {
      $('search_wrap_button ', 'ul').stop().slideUp('fast');
  });
});


$(function () {
  $(".js-question").click(function(){
    $(this).slideDown("is-active");

    $(".js-question").not(this).slideUp("is-active");
    });

});

$(function () {
  $(".search_button").click(function(){
    $('.search_button__list').toggleClass("is_active");

    $(".search_button__list").not(this).removeClass("is_active");
    });

});


// pulldown
$(window).load(function() {
  $(".l_header__lower .l_header__nav .l_header__list .l_header__item").click(function(e){
      if($(this).hasClass("on")) {
        $(".l_header__lower .l_header__nav .l_header__list .l_header__item").removeClass('on');
        $(this).removeClass('on');
        $(this).find('ul').slideUp();
      }else{
        $(".l_header__lower .l_header__nav .l_header__list .l_header__item").removeClass('on');
        $(this).addClass('on');
        $(".l_header__lower .l_header__nav .l_header__list .l_header__item").find('ul').slideUp();
        $(this).find('ul').slideDown();
      }
  });
});

// search
// $('.l_header .l_header__upper .l_header__r .search_wrap .search').focus(function() {
//   $(".ovartal-search").fadeIn();
//   $(".l_header .l_header__upper .l_header__r .search_wrap .tag").fadeIn();
// });
// $('.l_header .l_header__upper .l_header__r .search_wrap .search').blur(function() {
//   $(".ovartal-search").fadeOut();
//   $(".l_header .l_header__upper .l_header__r .search_wrap .tag").fadeOut();
// });

// $('.page .sec_search .search_wrap .search').focus(function() {
//   $(".ovartal-search").fadeIn();
//   $(".page .sec_search .search_wrap .tag").fadeIn();
// });
// $('.page .sec_search .search_wrap .search').blur(function() {
//   $(".ovartal-search").fadeOut();
//   $(".page .sec_search .search_wrap .tag").fadeOut();
// });

// search shop button
$(window).load(function() {
  $(".search_wrap.search_wrap_button").click(function(e){
      if($(this).hasClass("on")) {
        $(this).removeClass('on');
        $(this).find('button.search').removeClass('on');
        $(this).find('.clear-btn').removeClass('on');
        $(this).find('ul').slideUp();
      }else{
        $(this).addClass('on');
        $(this).find('button.search').addClass('on');
        $(this).find('.clear-btn').addClass('on');
        $(this).find('ul').slideDown();
      }
  });
});

// $(window).scroll(function () {
// 	// スクロール量
// 	let scroll = $(window).scrollTop();
// 	// 1画面分の高さ
// 	let wh = $(window).height();
// 	// スクロール量が、1画面分の高さを、超えたとき、
// 	if (scroll > wh) {
// 	// .headerに対して、is-activeクラスを追加する。
// 	$(".l_header").addClass("l_header_bg");
// 	$('menu').css('display', 'none');
// 	$(".hamburger_top_page").removeClass("hamburger_top");
// 	//   $(".header_list").addClass("is_active");
// } else {
//   // .headerに対して、is-activeクラスを削除する。
// 	$(".l_header").removeClass("l_header_bg");
// 	$('menu').css('display', 'block');
// 	$(".hamburger_top_page").addClass("hamburger_top");
// 	//   $(".header_list").addClass("is_active");
// 	}
// });
