// fv slider

document.addEventListener("DOMContentLoaded", function() {
  const colors = ["#CB6D91", "#79C9D0", "#D09779", "#79C9D0"];
  const swiperContainer = document.querySelector('.swiper_fv');
  const slides = Array.from(swiperContainer.querySelectorAll('.swiper-slide'));

  const isOddNumberOfSlides = slides.length % 2 !== 0;

  const duplicateSlides = () => {
    const lastSlide = slides[slides.length - 1].cloneNode(true);
    swiperContainer.querySelector('.swiper-wrapper').insertBefore(lastSlide, slides[0]);
    const firstSlide = slides[0].cloneNode(true);
    swiperContainer.querySelector('.swiper-wrapper').appendChild(firstSlide);
  };

  if (isOddNumberOfSlides) {
    duplicateSlides();
  }

  const customPaginationRender = function(index, className) {
    const bgColor = colors[index % colors.length];
    return (
      '<div class="' + className + ' circle" style="--circle-before-bg: ' + bgColor + '"><div class="circle_inner">' +
      (Number(index) + 1) +
      '</div></div>'
    );
  };

  const calculateSlidesPerView = () => {
    const viewportWidth = window.innerWidth;
    if (viewportWidth <= 768) {
      return 1;
    } else if (viewportWidth <= 1135) {
      return 1;
    }
    const peekWidthRatio = (viewportWidth - 1135) / (1920 - 1135);
    return 1 + (0.5 * peekWidthRatio);
  };

  const swiper = new Swiper('.swiper_fv', {
    speed: 700,
    centeredSlides: false,
    slidesPerView: calculateSlidesPerView(),
    slidesOffsetBefore: (window.innerWidth > 768) ? 40 : 0,
    initialSlide: 0,
    loop: true,
    pagination: {
      el: '.fv_pagination',
      clickable: true,
      renderBullet: customPaginationRender,
    },
    navigation: {
      nextEl: '.fv-next_arrow',
    },
    autoplay: {
      delay: 5200,
      disableOnInteraction: false,
    },
    on: {
      slideChange: function() {
        const slideIndex = this.realIndex;
        const newColor = colors[slideIndex % colors.length];

        const fvBg = document.querySelector('.fv');
        if (fvBg) {
          fvBg.style.backgroundColor = newColor;
        }

        const paginationBullets = document.querySelectorAll('.swiper-pagination-bullet .circle_inner');
        paginationBullets.forEach((bullet, idx) => {
          if (idx === slideIndex) {
            bullet.style.backgroundColor = newColor;
          } else {
            bullet.style.backgroundColor = 'transparent';
          }
        });
      },
      init: function() {
        const initialColor = colors[0];
        const fvBg = document.querySelector('.fv');
        const activeCircleInner = document.querySelector('.swiper-pagination-bullet-active .circle_inner');
        if (fvBg) {
          fvBg.style.backgroundColor = initialColor;
        }
        if (activeCircleInner) {
          activeCircleInner.style.backgroundColor = initialColor;
        }
      },
      resize: function() {
        this.params.slidesPerView = calculateSlidesPerView();
        this.params.slidesOffsetBefore = (window.innerWidth > 768) ? 40 : 0;
        this.update();
      }
    },
  });

  // Adjust slide behavior when pagination bullet clicked
  document.querySelectorAll('.swiper-pagination-bullet').forEach((bullet, index) => {
    bullet.addEventListener('click', () => {
      const diff = index - swiper.realIndex;
      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          swiper.slideNext();
        }
      } else if (diff < 0) {
        for (let i = 0; i < Math.abs(diff); i++) {
          swiper.slidePrev();
        }
      }
    });
  });
});


// campaign slider

const swiperSlides = document.getElementsByClassName("campaign_slide");
const breakPoint = 768; // ブレークポイントを設定
let swiper;
let swiperBool;

window.addEventListener(
  "load",
  () => {
    if (breakPoint < window.innerWidth) {
      swiperBool = false;
    } else {
      createSwiper();
      swiperBool = true;
    }
  },
  false
);

window.addEventListener(
  "resize",
  () => {
    if (breakPoint < window.innerWidth && swiperBool) {
      swiper.destroy(false, true);
      swiperBool = false;
    } else if (breakPoint >= window.innerWidth && !swiperBool) {
      createSwiper();
      swiperBool = true;
    }
  },
  false
);

const createSwiper = () => {
  swiper = new Swiper(".campaign_swiper", {
    loop: true, // ループさせる
    speed: 700, 
    centeredSlides:true,
    slidesPerView:1,
    navigation: {
      nextEl: ".campaign_next",
      prevEl: ".campaign_prev",
    },
  });
};

// header opacity

document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('.top .l_header');
  const fv = document.querySelector('.fv');

  if (!header || !fv) {
    return; // If either the header or the fv elements aren't present, exit.
  }

  window.addEventListener('scroll', function() {
    if (window.innerWidth < 768) {
      return; // If the viewport width is less than 768px, exit.
    }

    // Get the bottom position of the .fv element relative to the viewport.
    const fvBottomPosition = fv.getBoundingClientRect().bottom;

    if (fvBottomPosition <= 0) {
      // .fv element has been completely scrolled past.
      header.style.opacity = '1';
    } else {
      // .fv element is still visible.
      header.style.opacity = '0';
    }
  });
});


// article modal

var trigger = $('.modal__trigger'),
    wrapper = $('.modal__wrapper'),
    layer = $('.modal__layer'),
    container = $('.modal__container'),
    close = $('.modal__close');

// モーダルウィンドウを開く
$(trigger).on('click', function(){
  var target = $(this).data('target');
  var modal = document.getElementById(target);
  scrollPosition = $(window).scrollTop();

  $(modal).fadeIn(400);
    // サイトのスクロールを禁止にする
    $('html, body').css('overflow', 'hidden');
  return false;
});

// 『背景』と『モーダルを閉じるボタン』をクリックしたら、『モーダル本体』を非表示
$(layer).add(close).click(function() {
  $(wrapper).fadeOut(400);

  // サイトのスクロール禁止を解除する
  $('html, body').removeAttr('style');
});

// モーダルウィンドウを閉じる
$(close).on('click', function(){
  $(wrapper).fadeOut(400);
  return false;
});

// ranking

const rankingCardElements = document.getElementsByClassName("ranking_card");
const RankingBreakPoint = 768;
let rankingSwiperInstance;
let isSwiperActive;

window.addEventListener(
  "load",
  () => {
    if (RankingBreakPoint < window.innerWidth) {
      isSwiperActive = false;
    } else {
      initRankingSwiper();
      isSwiperActive = true;
    }
  },
  false
);

window.addEventListener(
  "resize",
  () => {
    if (RankingBreakPoint < window.innerWidth && isSwiperActive) {
      rankingSwiperInstance.destroy(false, true);
      isSwiperActive = false;
    } else if (RankingBreakPoint >= window.innerWidth && !isSwiperActive) {
      initRankingSwiper();
      isSwiperActive = true;
    }
  },
  false
);

const initRankingSwiper = () => {
  rankingSwiperInstance = new Swiper(".ranking_swiper", {
    loop: true,
    speed: 500,
    slidesPerView:1,
    spaceBetween:50,
    centeredSlides:true,
    navigation: {
      nextEl: ".ranking_next",
      prevEl: ".ranking_prev",
    },
  });
};


// details slider

const thumb = document.querySelectorAll('.sec_details .details_thumb');

const switchThumb = (index) => {
  document.querySelector('.sec_details .details_thumb-active').classList.remove('details_thumb-active');
  thumb[index].classList.add('details_thumb-active');
}

const DetailsSwiper = new Swiper('.sec_details .details_items', {
  navigation: {
    nextEl: '.details_next',
    prevEl: '.details_prev',
  },
  on: {
    afterInit: (swiper) => {
      thumb[swiper.realIndex].classList.add('details_thumb-active');
      for (let i = 0; i < thumb.length; i++) {
        thumb[i].onclick = () => {
          swiper.slideTo(i);
        };
      }
    },
    slideChange: (swiper) => {
      switchThumb(swiper.realIndex);
    },
  }
});