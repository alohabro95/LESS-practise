var slickSettings = {
  dots: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  prevArrow:
    "<button class='prev slider__btn'><img src='products__images/right.svg'></button>",
  nextArrow:
    "<button class='next slider__btn'><img src='products__images/right.svg'></button>",
  responsive: [
    {
      breakpoint: 768,
      settings: {
        centerMode: false,
        variableWidth: false,
      },
    },
  ],
};
$(".rooms__slider").slick(slickSettings);
