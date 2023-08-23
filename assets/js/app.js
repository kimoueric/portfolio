let carrousel = {
  nbSlide: 0,
  nbCurrent: 1,
  elemCurrent: null,
  elem: null,
  timer: null,

  init: function (elem) {
    this.elem = elem;
    this.nbSlide = elem.find(".slide").length;
    this.elemCurrent = elem.find(".slide:first");

    elem.find(".slide").hide();
    elem.find(".slide:first").show();
    elem.find(".pages span:first").addClass("active");

    elem.find(".pages span").click(function () {
      carrousel.gotoSlide($(this).text());
    });

    carrousel.play();

    elem.mouseover(function () {
      carrousel.stop();
    });
    elem.mouseout(function () {
      carrousel.play();
    });
  },
  gotoSlide: function (numSlide) {
    if (numSlide == this.nbCurrent) {
      return;
    }

    let sens = 1;
    if (numSlide < this.nbCurrent) sens = -1;
    this.elem
      .find("#slide" + numSlide)
      .show()
      .css({
        left: sens * this.elem.width(),
      });

    this.elem.find("#slide" + numSlide).animate(
      {
        left: 0,
        top: 0,
      },
      500
    );
    this.elemCurrent.animate(
      {
        left: -sens * this.elem.width(),
      },
      500
    );
    this.elem.find(".pages span").removeClass("active");
    this.elem.find(".pages span:eq(" + (numSlide - 1) + ")").addClass("active");
    this.nbCurrent = numSlide;
    this.elemCurrent = this.elem.find("#slide" + numSlide);
  },

  next: function () {
    let numberOf = this.nbCurrent + 1;
    if (numberOf > this.nbSlide) numberOf = 1;

    this.gotoSlide(numberOf);
  },

  stop: function () {
    clearInterval(carrousel.timer);
  },
  play: function () {
    this.timer = setInterval(() => {
      carrousel.next();
    }, 3000);
  },
};

$(function () {
  carrousel.init($(".carrousel"));

  $(".nav-link").removeClass("activeNavItem");
  $(".nav-link:first").addClass("activeNavItem");
  $(".nav-link").click(function (event) {
    $(".nav-link").removeClass("activeNavItem");
    $(this).addClass("activeNavItem");
  });
});
