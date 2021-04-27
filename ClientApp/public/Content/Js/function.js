$(function () {

  $(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    if (scroll > 150) {
      $('header').addClass('sticky_header')
    } else {
      $('header').removeClass('sticky_header')

    }
  });
  $('[data-toggle="tooltip"]').tooltip()

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
    $(".individual").removeClass('active');
    $(".bireysel_item").hide();
    $(".kurumsal_item").slideDown();
  });

  $(".individual").click(function () {
    $(".corporate").removeClass('active');
    $(this).addClass("active");
    $(".kurumsal_item").hide();
    $(".bireysel_item").slideDown();
  });




  $(".password_change").click(function () {
    $(".forgot_password").slideToggle();
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
