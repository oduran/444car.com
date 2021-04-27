$(document).ready(function () {
  var bigimage = $("#big");
  var thumbs = $("#thumbs");
  //var totalslides = 10;
  var syncedSecondary = true;

  bigimage
    .owlCarousel({
      items: 1,
      slideSpeed: 2000,
      nav: true,
      autoplay: true,
      dots: false,
      loop: true,
      responsiveRefreshRate: 200,
      navText: [
        '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
        '<i class="fa fa-arrow-right" aria-hidden="true"></i>',
      ],
    })
    .on("changed.owl.carousel", syncPosition);
  thumbs.on("initialized.owl.carousel", function () {
    thumbs.find(".owl-item").eq(0).addClass("current");
  })
    .owlCarousel({
      items: 4,
      autoHeight: true,
      dots: false,
      nav: true,
      navText: [
        '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
        '<i class="fa fa-arrow-right" aria-hidden="true"></i>',
      ],
      smartSpeed: 200,
      slideSpeed: 500,
      slideBy: 4,
      responsiveRefreshRate: 100,
    })
    .on("changed.owl.carousel", syncPosition2);

  function syncPosition(el) {
    //if loop is set to false, then you have to uncomment the next line
    //var current = el.item.index;

    //to disable loop, comment this block
    var count = el.item.count - 1;
    var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

    if (current < 0) {
      current = count;
    }
    if (current > count) {
      current = 0;
    }
    //to this
    thumbs
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");
    var onscreen = thumbs.find(".owl-item.active").length - 1;
    var start = thumbs.find(".owl-item.active").first().index();
    var end = thumbs.find(".owl-item.active").last().index();

    if (current > end) {
      thumbs.data("owl.carousel").to(current, 100, true);
    }
    if (current < start) {
      thumbs.data("owl.carousel").to(current - onscreen, 100, true);
    }
  }

  function syncPosition2(el) {
    if (syncedSecondary) {
      var number = el.item.index;
      bigimage.data("owl.carousel").to(number, 100, true);
    }
  }

  thumbs.on("click", ".owl-item", function (e) {
    e.preventDefault();
    var number = $(this).index();
    bigimage.data("owl.carousel").to(number, 300, true);
  });
});

var addInput = "#previousowners";
var n = 0;
$(addInput).val(n);
$("#plus").on("click", function () {
  $(addInput).val(++n);
});
$("#minus").on("click", function () {
  if (n >= 1) {
    $(addInput).val(--n);
  } else {
  }

});

$(window).scroll(function (event) {
  var scroll = $(window).scrollTop();
  if (scroll > 150) {
    $("header").addClass("sticky_header");
  } else {
    $("header").removeClass("sticky_header");
  }
});

$(function () {

    var sync1 = $("#sync1");
    var sync2 = $("#sync2");
    var slidesPerPage = 5; //globaly define number of elements per page
    var syncedSecondary = true;

    sync1
      .owlCarousel({
      items: 1,
      slideSpeed: 3000,
      nav: true,

      //   animateOut: 'fadeOut',
      animateIn: "fadeIn",
      autoplayHoverPause: true,
      autoplaySpeed: 1400, //過場速度
      dots: false,
      loop: true,
      responsiveClass: true,
      responsive: {
        0: {
          item: 1,
          autoplay: false
        },
        600: {
          items: 1,
          autoplay: true
        }
      },
      responsiveRefreshRate: 200,
      navText: [
        '<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>',
        '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'
      ]
    })
      .on("changed.owl.carousel", syncPosition);

    sync2
      .on("initialized.owl.carousel", function() {
      sync2
        .find(".owl-item")
        .eq(0)
        .addClass("current");
    })
      .owlCarousel({
      items: slidesPerPage,
      dots: true,
      //   nav: true,
      smartSpeed: 1000,
      slideSpeed: 1000,
      slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
      responsiveRefreshRate: 100
    })
      .on("changed.owl.carousel", syncPosition2);

    function syncPosition(el) {
      //if you set loop to false, you have to restore this next line
      //var current = el.item.index;

      //if you disable loop you have to comment this block
      var count = el.item.count - 1;
      var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

      if (current < 0) {
        current = count;
      }
      if (current > count) {
        current = 0;
      }

      //end block

      sync2
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
      var onscreen = sync2.find(".owl-item.active").length - 1;
      var start = sync2
      .find(".owl-item.active")
      .first()
      .index();
      var end = sync2
      .find(".owl-item.active")
      .last()
      .index();

      if (current > end) {
        sync2.data("owl.carousel").to(current, 100, true);
      }
      if (current < start) {
        sync2.data("owl.carousel").to(current - onscreen, 100, true);
      }
    }

    function syncPosition2(el) {
      if (syncedSecondary) {
        var number = el.item.index;
        sync1.data("owl.carousel").to(number, 100, true);
      }
    }

    sync2.on("click", ".owl-item", function(e) {
      e.preventDefault();
      var number = $(this).index();
      sync1.data("owl.carousel").to(number, 300, true);
    });


  $('[data-toggle="tooltip"]').tooltip();

  $("select").select2({
    minimumResultsForSearch: -1,
  });
  $(".promo").owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 500000,
    items: 1,
    nav: true,
    margin: 0,
    navText: [
      "<i class='fas fa-chevron-left'></i>",
      "<i class='fas fa-chevron-right'></i>",
    ],
    responsive: {
      0: {
        nav: false,
      },
      768: {
        nav: true,
      },
    },
  });

  $(".owl-dot").each(function () {
    $(this)
      .children("span")
      .text($(this).index() + 1);
  });
  $(".hamburgerbtn").click(function () {
    $(this).toggleClass("open");
    $(".header_right").slideToggle();
  });
  $(".corporate").click(function () {
    $(this).addClass("active");
    $(".individual").removeClass("active");
    $(".bireysel_item").hide();
    $(".kurumsal_item").slideDown();
  });

  $(".individual").click(function () {
    $(".corporate").removeClass("active");
    $(this).addClass("active");
    $(".kurumsal_item").hide();
    $(".bireysel_item").slideDown();
  });

  $(".password_change").click(function () {
    $(".forgot_password").slideToggle();
  });

  $(".clear_text").click(function () {
    $('input[type=text], textarea').val('');
  });
});

// addMessage("success", "content", "mesaj");
// addMessage("danger", "content", "mesaj");
// addMessage("info", "content", "mesaj");

// addModal("info", "content", "mesaj");
// addModal("success", "content", "mesaj");
// addModal("error", "content", "mesaj");
// addPopup("content");

function addMessage(type, title, message) {
  refreshMessage();
  var text = "";
  if (type == "danger") {
    text = addDangerMessage(title, message);
  } else if (type == "success") {
    text = addSuccessMessage(title, message);
  } else if (type == "info") {
    text = addInfoMessage(title, message);
  }
  $("body").append(text);
  setTimeout(function () {
    $(".alert").fadeOut(500);
  }, 3000);
}

function addSuccessMessage(title, message) {
  var text = '<div class="alert alert-success">';
  text += "<strong>";
  text += title;
  text += "</strong>";
  text += "<label>";
  text += message;
  text += "</label>";
  text += "</div>";
  return text;
}

function addDangerMessage(title, message) {
  var text = '<div class="alert alert-danger">';
  text += "<strong>";
  text += title;
  text += "</strong>";
  text += " <label>";
  text += message;
  text += "</label>";
  text += "</div>";
  return text;
}

function addInfoMessage(title, message) {
  var text = '<div class="alert alert-info">';
  text += "<strong>";
  text += title;
  text += "</strong>";
  text += " <label>";
  text += message;
  text += "</label>";
  text += "</div>";
  return text;
}

function refreshMessage() {
  $(".success").remove();

  $(".info").remove();

  $(".danger").remove();
}

function addModal(type, title, content) {
  $("#modal").remove();
  $(".modal-backdrop").remove();

  var text = "";
  if (type == "error") {
    text = addErrorModal(title, content);
  } else if (type == "success") {
    text = addSuccesModal(title, content);
  } else if (type == "info") {
    text = addInfoModal(title, content);
  }
}

function addErrorModal(title, content) {
  var text =
    '   <div id="modal" class="modal fade" role="dialog">  ' +
    '           <div class="modal-dialog  modal-lg modal-dialog-centered">  ' +
    '               <div class="modal-content">  ' +
    '                 <i data-dismiss="modal" class="close fas fa-times"></i> ' +
    '                   <div class="modal-header modal_error ">  ' +
    title +
    "                   </div>  " +
    '                   <div class="modal-body">  ' +
    '  <i class="modal_error_icon fas fa-exclamation-triangle"></i>   ' +
    " " +
    content +
    "                   </div>  " +
    ' <div class="modal-footer"> ' +
    '   <button type="button" class="btn btn-secondary" data-dismiss="modal">Kapat</button>' +
    " </div> " +
    "               </div>  " +
    "     " +
    '               <div class="clearfix"></div>  ' +
    "           </div>  " +
    "     " +
    "      </div>  ";

  $("body").append(text);
  $("#modal").modal();
}

function addSuccesModal(title, content) {
  var text =
    '   <div id="modal" class="modal fade" role="dialog">  ' +
    '           <div class="modal-dialog  modal-lg modal-dialog-centered">  ' +
    '               <div class="modal-content">  ' +
    '                 <i data-dismiss="modal" class="close fas fa-times"></i> ' +
    '                   <div class="modal-header modal_succes">  ' +
    title +
    "                   </div>  " +
    '                   <div class="modal-body">  ' +
    '  <i class="modal_succes_icon far  fa-check-square"></i>   ' +
    " " +
    content +
    "                   </div>  " +
    ' <div class="modal-footer"> ' +
    '   <button type="button" class="btn btn-secondary" data-dismiss="modal">Kapat</button>' +
    " </div> " +
    "               </div>  " +
    "     " +
    '               <div class="clearfix"></div>  ' +
    "           </div>  " +
    "     " +
    "      </div>  ";

  $("body").append(text);
  $("#modal").modal();
}

function addInfoModal(title, content) {
  var text =
    '   <div id="modal" class="modal fade" role="dialog">  ' +
    '           <div class="modal-dialog  modal-lg modal-dialog-centered">  ' +
    '               <div class="modal-content">  ' +
    '                 <i data-dismiss="modal" class="close fas fa-times"></i> ' +
    '                   <div class="modal-header modal_info ">  ' +
    title +
    "                   </div>  " +
    '                   <div class="modal-body">  ' +
    '  <i class="modal_info_icon fas fa-info"></i>   ' +
    " " +
    content +
    "                   </div>  " +
    ' <div class="modal-footer"> ' +
    '   <button type="button" class="btn btn-secondary" data-dismiss="modal">Kapat</button>' +
    " </div> " +
    "               </div>  " +
    "     " +
    '               <div class="clearfix"></div>  ' +
    "           </div>  " +
    "     " +
    "      </div>  ";

  $("body").append(text);
  $("#modal").modal();
}

function addPopup(content) {
  var text =
    '<div style="display: none;" id="popuptext-content"> ' +
    "     <p> " +
    content +
    "</p> " +
    " </div > ";
  $("body").append(text);
  $.fancybox.open({ src: "#popuptext-content" });
}

function addPopupImage(ImageUrl) {
  var text =
    '<div style="display: none;" id="ImagePopup"> ' +
    '     <p> <img src="' +
    ImageUrl +
    '"> </p> ' +
    " </div > ";
  $("body").append(text);
  $.fancybox.open({ src: "#ImagePopup" });
}

function addHtmlVideo(Mp4Link) {
  var text =
    '<video width="640" height="320" controls id="Mp4Video" style="display:none;"> ' +
    '<source src = "' +
    Mp4Link +
    '" type = "video/mp4" > ' +
    "</video>";
  $("body").append(text);
  $.fancybox.open({ src: "#Mp4Video" });
}

function addPopupYoutube(YoutubeUrl) {
  var text =
    '<a id="YoutubePopup" data-fancybox href="' + YoutubeUrl + '">' + " </a> ";
  $("body").append(text);
  $("#YoutubePopup").trigger("click");
}

var sse1 = (function () {
  var rebound = 0;
  var slip, k;
  return {
    buildMenu: function () {
      var m = document.getElementById("navigation");
      if (!m) return;
      var ul = m.getElementsByTagName("ul")[0];
      m.style.width = ul.offsetWidth + 1 + "px";
      var items = m.getElementsByTagName("li");
      var a = m.getElementsByTagName("a");

      slip = document.createElement("li");
      slip.className = "highlight";
      ul.appendChild(slip);

      var url = document.location.href.toLowerCase();
      k = -1;
      var nLength = -1;
      for (var i = 0; i < a.length; i++) {
        if (
          url.indexOf(a[i].href.toLowerCase()) != -1 &&
          a[i].href.length > nLength
        ) {
          k = i;
          nLength = a[i].href.length;
        }
      }

      if (k == -1 && /:\/\/(?:www\.)?[^.\/]+?\.[^.\/]+\/?$/.test) {
        for (var i = 0; i < a.length; i++) {
          if (a[i].getAttribute("maptopuredomain") == "true") {
            k = i;
            break;
          }
        }
        if (k == -1 && a[0].getAttribute("maptopuredomain") != "false") k = 0;
      }

      if (k > -1) {
        slip.style.width = items[k].offsetWidth + "px";
        //slip.style.left = items[k].offsetLeft + "px";
        sse1.move(items[k]); //comment out this line and uncomment the line above to disable initial animation
      } else {
        slip.style.visibility = "hidden";
      }

      for (var i = 0; i < items.length - 1; i++) {
        items[i].onmouseover = function () {
          if (k == -1) slip.style.visibility = "visible";
          if (this.offsetLeft != slip.offsetLeft) {
            sse1.move(this);
          }
        };
      }

      m.onmouseover = function () {
        if (slip.t2) slip.t2 = clearTimeout(slip.t2);
      };

      m.onmouseout = function () {
        if (k > -1 && items[k].offsetLeft != slip.offsetLeft) {
          slip.t2 = setTimeout(function () {
            sse1.move(items[k]);
          }, 50);
        }
        if (k == -1)
          slip.t2 = setTimeout(function () {
            slip.style.visibility = "hidden";
          }, 50);
      };
    },
    move: function (target) {
      clearInterval(slip.timer);
      var direction = slip.offsetLeft < target.offsetLeft ? 1 : -1;
      slip.timer = setInterval(function () {
        sse1.mv(target, direction);
      }, 15);
    },
    mv: function (target, direction) {
      if (direction == 1) {
        if (slip.offsetLeft - rebound < target.offsetLeft)
          this.changePosition(target, 1);
        else {
          clearInterval(slip.timer);
          slip.timer = setInterval(function () {
            sse1.recoil(target, 1);
          }, 15);
        }
      } else {
        if (slip.offsetLeft + rebound > target.offsetLeft)
          this.changePosition(target, -1);
        else {
          clearInterval(slip.timer);
          slip.timer = setInterval(function () {
            sse1.recoil(target, -1);
          }, 15);
        }
      }
      this.changeWidth(target);
    },
    recoil: function (target, direction) {
      if (direction == -1) {
        if (slip.offsetLeft > target.offsetLeft) {
          slip.style.left = target.offsetLeft + "px";
          clearInterval(slip.timer);
        } else slip.style.left = slip.offsetLeft + 2 + "px";
      } else {
        if (slip.offsetLeft < target.offsetLeft) {
          slip.style.left = target.offsetLeft + "px";
          clearInterval(slip.timer);
        } else slip.style.left = slip.offsetLeft - 2 + "px";
      }
    },
    changePosition: function (target, direction) {
      if (direction == 1) {
        //following +1 will fix the IE8 bug of x+1=x, we force it to x+2
        slip.style.left =
          slip.offsetLeft +
          Math.ceil(
            Math.abs(target.offsetLeft - slip.offsetLeft + rebound) / 10
          ) +
          1 +
          "px";
      } else {
        //following -1 will fix the Opera bug of x-1=x, we force it to x-2
        slip.style.left =
          slip.offsetLeft -
          Math.ceil(
            Math.abs(slip.offsetLeft - target.offsetLeft + rebound) / 10
          ) -
          1 +
          "px";
      }
    },
    changeWidth: function (target) {
      if (slip.offsetWidth != target.offsetWidth) {
        var diff = slip.offsetWidth - target.offsetWidth;
        if (Math.abs(diff) < 4) slip.style.width = target.offsetWidth + "px";
        else slip.style.width = slip.offsetWidth - Math.round(diff / 3) + "px";
      }
    },
  };
})();

if (window.addEventListener) {
  window.addEventListener("load", sse1.buildMenu, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", sse1.buildMenu);
} else {
  window["onload"] = sse1.buildMenu;
}
