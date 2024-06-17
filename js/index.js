

  $(window).load(function() {
  scrollSensor();
  });


/*
* SCROLL SENSOR v2.3
* (c) 2017 Iori Tatsuguchi
* ------------------------
* 1.) スクロール方向
*     スクロール中およびスクロール後一定時間、
*     所定の要素に対し .scrolling 、また方向に応じ .scrolling-up を追加
*     その後位置の変化に応じ所定の要素に対し .scrolled-up を追加
* 
* 2.) スクロール深度
*     現在のスクロールオフセットが所定の深度に到達している場合、
*     所定の要素に対し .deep-scroll を追加
*/
function scrollSensor() {
  var target = $('body'), // 結果をクラス名として付与する要素
    icon01 = $('.l_header .l_header__upper .l_header__r > a:first-child img'),
    icon02 = $('.l_header .l_header__upper .l_header__r > a:last-child img'),
    heroHeight = $('.fv').height(),
    activeFlag = false,
    activeFlagTimeout = 1200, // スクロールフラグ有効時間（ミリ秒）
    activeFlagExecution,
    deepScrollDepth = heroHeight, // .deep-scroll 付与深度
    currentY = 0,
    previousY = 0;

  function activeFlagTimer() {
    activeFlag = true;
    target.addClass('scrolling').removeClass('scrolled-up');

    if (activeFlagExecution !== undefined)
      clearTimeout(activeFlagExecution);
    activeFlagExecution = setTimeout(function() {
      activeFlag = false;
      if (target.hasClass('scrolling-up'))
        target.addClass('scrolled-up');
      target.removeClass('scrolling scrolling-up');
    }, activeFlagTimeout);
  };

  $(document).scroll(function() {
    activeFlagTimer();
    currentY = $(document).scrollTop();

    if (currentY < previousY)
      target.addClass('scrolling-up');
    else
      target.removeClass('scrolling-up');
    previousY = currentY;

    if (currentY > deepScrollDepth)
      target.addClass('deep-scroll');
    else
      target.removeClass('deep-scroll');
  });

}

function scrollToAnchor(target, customOffset, scrollTimer) {
  /* set header offset according to window width */
  if (breakpoint('sm'))
    var headerOffset = 0;
  else
    var headerOffset = $('#header').next().offset().top + 1;

  var customOffset = customOffset === undefined ? 0 : customOffset;

  if (scrollTimer === undefined)
    var scrollTimer = 1000;

  $("html, body").stop().animate({
    scrollTop: $(target).offset().top - headerOffset - customOffset
  }, scrollTimer);
}

