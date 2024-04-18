var slickSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  variableWidth: true,
  adaptiveHeight: true,
  prevArrow: '<button type="button" class="slick-prev">&#10094;</button>',
  nextArrow: '<button type="button" class="slick-next">&#10095;</button>',
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
