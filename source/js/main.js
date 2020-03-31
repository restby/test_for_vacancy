$(function () {
  /*slick settings*/
  $("#reviews-slick").slick({
    autoplay: false,
    autoplaySpeed: 2500,
    speed: 600,
    arrows: true,
    dots: false,
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
    lazyLoad: "progressive",
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 1170,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
          dots: false
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true
        }
      }
    ]
  });

  /*owlCarousel settings*/
  $("#gallery-owl-carousel").owlCarousel({
    loop: true,
    lazyLoad: true,
    // autoplay: true,
    autoplaySpeed: 1500,
    responsive: {
      0: {
        items: 1,
        dots: true,
        nav: false
      },
      768: {
        items: 1,
        dots: true,
        nav: false
      },
      992: {
        items: 2,
        dots: true,
        nav: true,
        margin: 10
      },
      1170: {
        items: 4,
        nav: true,
        dots: true,
        margin: 20
      }
    }
  });
  $(".owl-prev span").text("");
  $(".owl-next span").text("");

  /*twentytwenty*/
  $('#before-after-twentytwenty').twentytwenty({
    before_label: 'До',
    after_label: 'После',
    default_offset_pct: 0.6
  });

  $(".navigation__btn").click(function (e) {
    e.preventDefault();
    $(".navigation ul").slideToggle("slow");
    $(this).toggleClass("navigation__btn--close");
  });

  // $(".main-header__btn-down").click(function () {
  //   $('html, body').animate({
  //       scrollTop: $(document).height() - $(window).height()
  //     },
  //     2500
  //   );
  // });
});
