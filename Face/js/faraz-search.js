function empty_value(t) {
  $(t).closest(".city").find(".country").val(""),
    $(t).closest(".city").find(".searchList").fadeIn(),
    $(t).closest(".city").find(".country").focus(),
    $(t).closest(".city").find(".ul-list").show(),
    $(t).closest(".city").siblings(".city").find(".searchList").fadeOut();
}

function city_search(t) {
  0 === t.which ||
    t.ctrlKey ||
    t.metaKey ||
    t.altKey ||
    (4 == $(t).attr("data-type")
      ? ($(t).val(""),
        $(t).closest(".city").find(".co-id").val(""),
        $(t).closest(".city").find(".mini-loading").show(),
        1 != $(t).attr("data-active")
          ? ($(t).closest(".city").find(".mini-loading").show(),
            $.ajax({
              url: "/Client_City_Search.bc",
              type: "get",
              data: {
                type: $(t).attr("data-type"),
                lid: "1",
              },
              success: function (e) {
                $(t).attr("data-active", "1"),
                  $(t).closest(".city").find(".mini-loading").hide(),
                  $(t).closest(".city").find(".countryFlight").empty().html(e),
                  $(t).closest(".city").find(".countryFlight").slideDown();
              },
            }))
          : $(t).closest(".city").find(".countryFlight").slideDown())
      : ((upper_case =
          $(t).val().substr(0, 1).toUpperCase() +
          $(t).val().substr(1).toLowerCase()),
        $(t).val(upper_case),
        "3" == $(t).attr("data-type")
          ? "رم" == $(t).val() || "قم" == $(t).val()
            ? $(t).val().length > 1
              ? ($(t).closest(".city").find(".mini-loading").show(),
                $(t).closest(".city").find(".ul-list").hide(),
                $.ajax({
                  url: "/Client_City_Search.bc",
                  type: "get",
                  data: {
                    term: $(t).val(),
                    type: $(t).attr("data-type"),
                    lid: 1,
                    select_value: 0,
                  },
                  success: function (e) {
                    $(t).closest(".city").find(".mini-loading").hide(),
                      $(t)
                        .closest(".city")
                        .find(".countryFlight")
                        .empty()
                        .html(e);
                  },
                }))
              : $(t).closest(".city").find(".countryFlight").empty()
            : $(t).val().length > 2
            ? ($(t).closest(".city").find(".mini-loading").show(),
              $(t).closest(".city").find(".ul-list").hide(),
              $.ajax({
                url: "/Client_City_Search.bc",
                type: "get",
                data: {
                  term: $(t).val(),
                  type: $(t).attr("data-type"),
                  lid: 1,
                  select_value: 0,
                },
                success: function (e) {
                  $(t).closest(".city").find(".mini-loading").hide(),
                    $(t)
                      .closest(".city")
                      .find(".countryFlight")
                      .empty()
                      .html(e);
                },
              }))
            : $(t).closest(".city").find(".countryFlight").empty()
          : "3" !== $(t).attr("data-type") &&
            ($(t).val().length > 2
              ? ($(t).closest(".city").find(".mini-loading").show(),
                $(t).closest(".city").find(".ul-list").hide(),
                $.ajax({
                  url: "/Client_City_Search.bc",
                  type: "get",
                  data: {
                    term: $(t).val(),
                    type: $(t).attr("data-type"),
                    lid: 1,
                    select_value: 0,
                  },
                  success: function (e) {
                    $(t).closest(".city").find(".mini-loading").hide(),
                      $(t)
                        .closest(".city")
                        .find(".countryFlight")
                        .empty()
                        .html(e);
                  },
                }))
              : $(t).closest(".city").find(".countryFlight").empty())));
}

$(window).width() <= 750 &&
  ($("#flightSearch").attr("action") === "/Tem3_Roundtrip_Search.bc" &&
    $("#flightSearch").attr("action", "/M_Roundtrip_Search.bc"),
  $("#flightSearch").attr("action") === "/Tem3_Oneway_Search.bc" &&
    $("#flightSearch").attr("action", "/M_Oneway_Search.bc"),
  $("#hotelsearch").attr("action", "/M_Hotel_Search.bc"),
  $("#Tour-form").attr("action", "/M_Tour_Search.bc"),
  $("#flightHotelSearch").attr("action", "/M_FlightHotel_Search.bc"),
  $(".formflight").each(function () {
    $(this).submit(function (event) {
      var ageString = "";
      $(this)
        .find(".createChildDropdown")
        .each(function () {
          ageString += $(this).find("select").val() + ",";
        });
      if (ageString !== "") {
        $(this).find(".select-age-value").val(ageString);
        var updatedAgeString = $(this)
          .find(".select-age-value")
          .val()
          .replace(/,(?=[^,]*$)/, "");
        $(this).find(".select-age-value").val(updatedAgeString);
      }

      var adults = $(this).find(".adultcount").val(),
        children = $(".childcount").val(),
        totalPassengers = parseInt(adults) + parseInt(children),
        infants = 0;

      $(".select-age").each(function () {
        if (parseInt($(this).val()) <= 2) {
          infants += 1;
        }
      });

      if (infants > adults) {
        event.preventDefault();
        $(".alert-text").html("به ازای هر بزرگسال تنها یک نوزاد انتخاب کنید!");
      }
      if (totalPassengers > 10) {
        event.preventDefault();
        $(".alert-text").html(
          "باید مجموع تعداد بزرگسال و کودک کمتر از 10 باشد !"
        );
      }
      if (adults < 1) {
        event.preventDefault();
        $(".alert-text").html("حداقل یک بزرگسال انتخاب کنید !");
      }
    });
  }));

$("#return").click(function () {
  $(this).addClass("active-r-btn");
  $("#direct").removeClass("active-r-btn");
  $("#multi").removeClass("active-r-btn");
  $("#multi-flight-form").addClass("hidden");
  $("#flightSearch #inp2-flight").prop("disabled", false);
  $(".return-date-city").removeClass("disabled-date");
  $("#flightSearch").find(".end_date").addClass("nextCalOpening");
  $(window).width() <= 750 &&
    $("#flightSearch").attr("action", "/M_Roundtrip_Search.bc");
  $("#flightSearch").show();
  $(".Flighttype-text").text("رفت و برگشت");
});

$("#direct").click(function () {
  $(this).addClass("active-r-btn"),
    $("#return").removeClass("active-r-btn"),
    $("#multi").removeClass("active-r-btn"),
    $("#multi-flight-form").addClass("hidden"),
    $("#flightSearch #inp2-flight").prop("disabled", !0),
    $("#flightSearch").find(".end_date").removeClass("nextCalOpening"),
    $(window).width() <= 750 &&
      $("#flightSearch").attr("action", "/M_Oneway_Search.bc"),
    $("#flightSearch").show();
  $(".Flighttype-text").text("یک طرفه");
  $(".return-date-city").addClass("disabled-date");
});
$(".flight-btn").click(function () {
  $(".date_info_selected").find(".type_date").text("تاریخ رفت :"),
    $(".date_info_selected").find(".day_of_date").text("---"),
    $(".date_info_selected").find(".month_of_date").text(" "),
    $(this).removeClass("inactive"),
    $(".selected").removeClass("active-module"),
    $(this).addClass("active-module"),
    $(".hotel-btn").addClass("inactive"),
    $(".tour-btn").addClass("inactive"),
    $(".flighthotel-btn").addClass("inactive"),
    $(".r-flight").show(),
    $(".r-hotel").hide(),
    $(".r-tour").hide(),
    $(".r-flighthotel").hide(),
    $("#top-banner-resize").css(
      "background-image",
      'url("../images/search-bg.jpg")'
    );
});
$(".hotel-btn").click(function () {
  return (
    $(".date_info_selected").find(".type_date").text("تاریخ رفت :"),
    $(".date_info_selected").find(".day_of_date").text("---"),
    $(".date_info_selected").find(".month_of_date").text(" "),
    $(this).removeClass("inactive"),
    $(".selected").removeClass("active-module"),
    $(this).addClass("active-module"),
    $(".flight-btn").addClass("inactive"),
    $(".flighthotel-btn").addClass("inactive"),
    $(".tour-btn").addClass("inactive"),
    $(".r-hotel").show(),
    $(".r-flight").hide(),
    $(".r-tour").hide(),
    $(".r-flighthotel").hide()
  );
});

$(".flighthotel-btn").click(function () {
  return (
    $(".date_info_selected").find(".type_date").text("تاریخ رفت :"),
    $(".date_info_selected").find(".day_of_date").text("---"),
    $(".date_info_selected").find(".month_of_date").text(" "),
    $(this).removeClass("inactive"),
    $(".selected").removeClass("active-module"),
    $(this).addClass("active-module"),
    $(".flight-btn").addClass("inactive"),
    $(".hotel-btn").addClass("inactive"),
    $(".tour-btn").addClass("inactive"),
    $(".r-flighthotel").show(),
    $(".r-hotel").hide(),
    $(".r-flight").hide(),
    $(".r-tour").hide(),
    $("#top-banner-resize").css(
      "background-image",
      'url("../images/fh-search-bg.jpg")'
    )
  );
});

$(".tour-btn").click(function () {
  return (
    $(".date_info_selected").find(".type_date").text("تاریخ رفت :"),
    $(".date_info_selected").find(".day_of_date").text("---"),
    $(".date_info_selected").find(".month_of_date").text(" "),
    $(this).removeClass("inactive"),
    $(".selected").removeClass("active-module"),
    $(this).addClass("active-module"),
    $(".flight-btn").addClass("inactive"),
    $(".hotel-btn").addClass("inactive"),
    $(".flighthotel-btn").addClass("inactive"),
    $(".r-flighthotel").hide(),
    $(".r-hotel").hide(),
    $(".r-flight").hide(),
    $(".r-tour").show(),
    $("#top-banner-resize").css(
      "background-image",
      'url("../images/fh-search-bg.jpg")'
    )
  );
});
function show_flightclass(e) {
  $(e).find(".show-flightclass").toggleClass("hidden");
}
function show_flighttype(e) {
  $(e).find(".show-flighttype").toggleClass("hidden");
}
$(document).ready(function () {
  // Prevent the document click event when clicking on FlightClass select or its ul
  $("#FlightClass1, .FlightClass ul").on("click", function (event) {
    event.stopPropagation();
  });
});

$(document).ready(function () {
  $(".FlightClass li").each(function () {
    $(this).click(function () {
      var data_value = $(this).attr("data-value");
      var data_text = $(this).text();

      $(this)
        .closest(".flightclass-box")
        .find(".FlightClass-value")
        .val(data_value);
      $(this)
        .closest(".flightclass-box")
        .find(".FlightClass-text")
        .text(data_text);
    });
  });
});
$(document).ready(function () {
  $(".close-hotel-psg").click(function () {
    $(".HotelPassengers").addClass("hidden");
    //bitaa
    let $passBox = $(this).closest(".pass-box");
    let $nextDiv = $passBox.next(".flightclass-box");

    if ($nextDiv.length) {
      $passBox
        .next(".flightclass-box")
        .find(".show-flightclass")
        .removeClass("hidden");
    }
  }),
    $(".selected").click(function () {
      $(this).attr("id"),
        $(this).hasClass("inactive") &&
          ($(".selected").addClass("inactive"),
          $(".selected").removeClass("active-module"),
          $(this).removeClass("inactive"),
          $(this).addClass("active-module"));
    });
});

$(".country").each(function () {
  $(this).on("blur", function () {
    if ($(this).closest(".city").find(".countryFlight").text().length > 0) {
      if (0 == hoverelse) {
        var t = $(this)
            .closest(".city")
            .find(".countryFlight")
            .children(".selectCountry:first")
            .find(".txtcountry")
            .text(),
          e =
            (t.split(" "),
            $(this)
              .closest(".city")
              .find(".countryFlight")
              .children(".selectCountry:first")
              .find(".countryid")
              .val());
        $(this).closest(".city").find(".country").val(t);
        var i = t.split("(");
        $(this).closest(".city").find(".split-text").text(i[0]),
          $(this).closest(".city").find(".text-value").val(t),
          $(this).closest(".city").find(".co-id").val(e),
          $(this).closest(".city").find(".countryFlight").empty();
      }
    } else $(this).closest(".city").find(".mini-loading").css("display", "none");
  });
});

function change_room_count(t) {
  (e = parseInt($(t).closest("ul").next().val())),
    (n = "+" == $(t).text() ? e + 1 : e > 0 ? e - 1 : 0),
    (o = "");

  if (!(n >= 5 || n < 1)) {
    if (($(t).closest("ul").next().val(n), e < n)) {
      var s = n;
      for ($(t).closest("form").find(".countRoom").empty(), i = 1; i <= s; i++)
        $(t)
          .closest("form")
          .find(".countRoom")
          .append(
            '<div class="contentRooms contentRoom"><div class="numberOfRooms RoomRow   text-primary float-right clear-both w-full mb-4 text-right">اتاق' +
              i +
              '</div><div class="itemlable2 clear-both w-full mb-4 text-zinc-900 float-right relative"><label class="float-right mb-1" for="textbox-adultcount' +
              i +
              '"> <span class="notshow">بزرگسال</span> </label><ul class="button-click float-left w-full h-[30px] leading-12"><li class="float-right   cursor-pointer leading-[30px] inset-0 text-3xl w-7 h-7 bg-secondary-50 text-zinc-900 !flex rounded-full !items-center !justify-center bg-white border border-secondary-300 hover:text-primary-900"><div class="button cursor-pointer secondary h-full leading-[30px]" onclick="increaseAdult(this)"><span class="hide cursor-pointer">+</span></div></li><li class="float-left cursor-pointer leading-[30px] inset-0 text-3xl w-7 h-7 bg-secondary-50 text-zinc-900 !flex rounded-full !items-center !justify-center bg-white border border-secondary-300 hover:text-primary-900 "><div class="button cursor-pointer secondary h-full leading-[30px]"  onclick="decreaseAdult(this)"><span class="cursor-pointer hide">-</span></div></li></ul><input type="text" class="cat_textbox adultcount adult-count    w-[35px] mt-2 h-[30px] !bg-transparent leading-[30px] absolute left-0 right-0 top-[25px] m-auto text-center" id="textbox-adultcount' +
              i +
              '" name="_roo$(t).rooms__' +
              i +
              '.adultcount" maxlength="4000" value="2"> <div class="clr"></div></div><div class="itemlable2 clear-both w-full mb-4 text-zinc-900 float-right relative"> <label class="float-right   leading-12 mb-1" for="textbox-childcount' +
              i +
              '"> <span class="notshow">کودک</span> </label><ul class="button-click-childRoom float-left w-full h-[30px] leading-12"><li class="float-right cursor-pointer leading-[30px] inset-0 text-3xl w-7 h-7 bg-secondary-50 text-zinc-900 !flex rounded-full !items-center !justify-center bg-white border border-secondary-300 hover:text-primary-900"><div class="button secondary h-full leading-[30px] cursor-pointer" onclick="increaseChild(this)"><span class="hide cursor-pointer">+</span></div></li><li class="float-left  cursor-pointer leading-[30px] inset-0 text-3xl w-7 h-7 bg-secondary-50 text-zinc-900 !flex rounded-full !items-center !justify-center bg-white border border-secondary-300 hover:text-primary-900"><div class="button secondary h-full leading-[30px]" onclick="decreaseChild(this)"><span class="hide">-</span></div></li><div class="clr"></div></ul><input type="text" class="cat_textbox chcount child-count w-[35px] mt-2 h-[30px] !bg-transparent leading-[30px] absolute left-0 right-0 top-[25px] m-auto text-center" id="textbox-childcount' +
              i +
              '" maxlength="4000" value="0"></div><div class="clr"></div><div class="childDropdowns section-select-age clear-both"></div><input type="hidden" name="_roo$(t).rooms__' +
              i +
              '.childcountandage" class="childcountandage" /></div></div>'
          );
    } else
      e > n && destroyRoomDropdown($(t).closest("form").find(".countRoom"), n);
    (o = o.substring(0, o.length - 2)),
      $(t).closest("form").find(".passenger-counts").show(),
      $(t).closest("form").find(".count-room .count").text(n),
      $(t).closest("form").find(".count-adultRoom .count").text(""),
      $(t).closest("form").find(".count-childRoom .count").text(""),
      $(t).closest("form").find(".hotel-inputH").attr("placeholder", "");
  }
}

var destroyRoomDropdown = function (t, e) {
  e < 1 || t.find("div.contentRooms").get(e).remove();
};

function increaseAdult(t) {
  var e = $(t),
    i = parseInt(e.closest("ul").next().val()),
    n = "+" == e.text() ? i + 1 : i > 0 ? i - 1 : 0;
  e.closest("form").find(".hotel-inputH").attr("placeholder", ""),
    n >= 10 || (e.closest("ul").next().val(n), SumAdult(t));
}

function decreaseAdult(t) {
  var e = $(t),
    i = parseInt(e.closest("ul").next().val()),
    n = "+" == e.text() ? i + 1 : i > 0 ? i - 1 : 0;
  n < 1 || (e.closest("ul").next().val(n), SumAdult(t));
}

function SumAdult(t) {
  var e,
    i = 0;
  $(t)
    .closest("form")
    .find(".countRoomHT")
    .find(".contentRooms")
    .each(function () {
      var t = parseInt($(this).find(".adultcount").val());
      i += t;
    }),
    (e = parseInt(i)),
    $(t).closest("form").find(".passenger-counts").show(),
    $(t).closest("form").find(".count-adultRoom .count").text(e);
}

function increaseChild(t) {
  var e = $(t),
    n = parseInt(e.closest("ul").next().val()),
    o = "+" == e.text() ? n + 1 : n > 0 ? n - 1 : 0,
    s = "";

  if (!(o >= 5)) {
    if ((e.closest("ul").next().val(o), n < o)) {
      var a = o;
      for (
        e.closest(".contentRooms").find(".childDropdowns").empty(), i = 1;
        i <= a;
        i++
      )
        e.closest(".contentRooms")
          .find(".childDropdowns")
          .append(
            '<div class="age-selection dir-rtl createChildDropdown mb-4 w-full float-right clear-both"><div class="label float-right   leading-12 mb-1">سن کودک ' +
              i +
              '</div><select class="select-age float-left bg-[#F8F8F8] w-[88px] h-12 leading-12 rounded-lg w-full px-2"><option value="1">تا 1 سال</option><option value="2">1 تا 2</option><option value="3">2 تا 3</option><option value="4">3 تا 4</option><option value="5">4 تا 5</option><option value="6">5 تا 6</option><option value="7">6 تا7</option><option value="8">7 تا 8</option><option value="9">8 تا 9</option><option value="10">9 تا 10</option><option value="11">10 تا 11</option><option value="12">11 تا 12</option></select><div class="clr"></div></div>'
          );
    }
    (s = s.substring(0, s.length - 2)), SumChild(t);
  }
}

function decreaseChild(t) {
  var e = $(t),
    i = parseInt(e.closest("ul").next().val()),
    n = "+" == e.text() ? i + 1 : i > 0 ? i - 1 : 0,
    o = "";
  e.closest("ul").next().val(n),
    i > n &&
      destroyChildDropdownRoom(
        e.closest(".contentRooms").find(".childDropdowns"),
        n
      ),
    (o = o.substring(0, o.length - 2)),
    SumChild(t);
}

function SumChild(t) {
  var e,
    i = 0;
  $(t)
    .closest("form")
    .find(".countRoomHT")
    .find(".contentRooms")
    .each(function () {
      var t = parseInt($(this).find(".chcount").val());
      i += t;
    }),
    (e = parseInt(i)),
    $(t).closest("form").find(".count-childRoom .count").text(e),
    $(t).closest("form").find(".passenger-counts").show(),
    $(t).closest("form").find(".hotel-inputH").attr("placeholder", "");
}
function change_pass_count(t) {
  (e = parseInt($(t).closest("ul").next().val())),
    (n = "+" == $(t).text() ? e + 1 : e > 0 ? e - 1 : 0),
    (o = "");
  if (
    ($(t).closest("form").find(".hotel-inputH").attr("placeholder", ""),
    $(t).closest(".inner-city").find(".passenger-counts").show(),
    !(n >= 5))
  ) {
    if (($(t).closest("ul").next().val(n), e < n)) {
      var s = n;
      for (
        $(t).closest("form").find(".childDropdowns").empty(), i = 1;
        i <= s;
        i++
      )
        $(t)
          .closest("form")
          .find(".childDropdowns")
          .append(
            '<div class="age-selection dir-rtl createChildDropdown mb-4 w-full float-right clear-both"><div class="label float-right   leading-12 mb-1">سن کودک ' +
              i +
              '</div><select  class="select-age float-left bg-[#F8F8F8] w-[88px] h-12 leading-12 rounded-lg w-full px-2"><option value="1">تا 1 سال</option><option value="2">1 تا 2</option><option value="3">2 تا 3</option><option value="4">3 تا 4</option><option value="5">4 تا 5</option><option value="6">5 تا 6</option><option value="7">6 تا7</option><option value="8">7 تا 8</option><option value="9">8 تا 9</option><option value="10">9 تا 10</option><option value="11">10 تا 11</option><option value="12">11 تا 12</option></select><div class="clr"></div></div>'
          );
      $(t).closest(".inner-city").find(".count-childRoom .count") &&
        $(t).closest(".inner-city").find(".count-childRoom .count").text(n);
    } else
      e > n &&
        (destroyChildDropdownRoom(
          $(t).closest("form").find(".childDropdowns"),
          n
        ),
        $(t).closest(".inner-city").find(".count-childRoom .count") &&
          $(t).closest(".inner-city").find(".count-childRoom .count").text(n));
    o = o.substring(0, o.length - 2);
  }
}
var destroyChildDropdownRoom = function (t, e) {
  t.find("div.createChildDropdown").get(e).remove();
};

// console.log($(".button-click .button"));
// $(".button-click .button").on("click", function () {
$(".button-click").on("click", ".button", function () {

  var t = $(this),
    e = parseInt(t.closest("ul").next().val()),
    i = "+" == t.text() ? e + 1 : e > 0 ? e - 1 : 0;

  // console.log(t.text());

  i >= 10 ||
    i < 1 ||
    (t.closest("ul").next().val(i),
    $(".cat_textbox").each(function () {
      $(this).next("span").text();
    }),
    t.closest("form").find(".hotel-inputF").attr("placeholder", ""),
    t.closest("form").find(".hotel-inputH").attr("placeholder", ""),
    t
      .closest("form")
      .find(".count-adult")
      .text(i + " بزرگسال "),
    t.closest(".inner-city").find(".passenger-counts").show(),
    $(this).closest(".inner-city").find(".count-adultRoom .count") &&
      $(this).closest(".inner-city").find(".count-adultRoom .count").text(i));
});
var createChildDropdown = function (t) {
    var e = $("<div />", {
      class: "createChildDropdown mb-4 w-full float-right clear-both",
    });
    return (
      e.append(
        $("<label />", {
          class: "float-right   leading-12 mb-1",
          for: "select-age-" + t,
        }).text("سن کودک " + t)
      ),
      e.append(
        $(
          '<select class="select-age float-left bg-[#F8F8F8] w-[88px] h-12 leading-12 rounded-lg w-full px-2" id="select-age' +
            t +
            '"/>'
        )
      ),
      [
        "تا 1 سال",
        "1 تا 2 سال ",
        "2 تا 3 سال",
        "3 تا 4 سال ",
        "4 تا 5 سال",
        "5 تا 6 سال",
        "6 تا 7 سال",
        "7 تا 8 سال",
        "8 تا 9 سال",
        "9 تا 10 سال",
        "10 تا 11 سال",
        "11 تا 12 سال",
      ].forEach(function (t, i) {
        e.find("select").append(
          $("<option />")
            .text(t)
            .attr("value", i + 1)
        );
      }),
      e
    );
  },
  destroyChildDropdown = function (t, e) {
    t.find("div.createChildDropdown").get(e).remove();
  };

function CheckExteraHoteldate(t) {
  var e = $(t).prop("checked");
  1 == e
    ? ($(t).val(1),
      $(".Wrapper-ExteraHoteldate").show(),
      $(".checkout").attr("required", !0),
      $(".checkin").attr("required", !0))
    : 0 == e &&
      ($(t).val(0),
      $(".Wrapper-ExteraHoteldate").hide(),
      $(".checkout").attr("required", !1),
      $(".checkin").attr("required", !1),
      $(".checkout").val(""),
      $(".checkin").val(""));
}

function SelectPlace(t) {
  var e = $(t).attr("data-id"),
    i = $(t).text(),
    n = i.split("-");
  $(t).closest(".city").find(".text-value").val(i),
    $(t).closest(".city").find(".co-id").val(e),
    $(t).closest(".city").find(".split-text").text(n[0]),
    $(t).closest(".city").find(".searchList").fadeOut(),
    $(t).closest(".city").next(".city").find(".searchList").fadeIn(),
    $(t)
      .closest(".city")
      .next(".city")
      .find(".click-content")
      .trigger("onclick");

  if ($(t).closest(".city").next("div").hasClass("Basis_Date_Box")) {
    $(t).closest(".city").next("div").find(".start_date").click();
  } else if ($(t).closest(".city").hasClass("tocity_container")) {
    $(t).closest(".first-part").next("div").find(".start_date").click();
  }
}

function ExchangeRoute(t) {
  var e = $(t).closest(".city").find(".FCD1").val(),
    i = $(t).closest(".city").next(".city").find(".FCD2").val(),
    n = $(t).closest(".city").find(".FCDid1").val(),
    o = $(t).closest(".city").next(".city").find(".FCDid2").val(),
    s = $(t).closest(".city").find(".dep-txt").text(),
    a = $(t).closest(".city").next(".city").find(".des-txt").text();
  $(t).closest(".city").find(".FCD1").val(i),
    $(t).closest(".city").next(".city").find(".FCD2").val(e),
    $(t).closest(".city").find(".FCDid1").val(o),
    $(t).closest(".city").next(".city").find(".FCDid2").val(n),
    $(t).closest(".city").find(".dep-txt").text(a),
    $(t).closest(".city").next(".city").find(".des-txt").text(s);
}

function openNextCal(t) {
  let e = $(".rezervation-item > li:not(.inactive)").attr("data-id");

  if (e === "r-flighthotel") {
    if (
      $(".Wrapper-ExteraHoteldate").is(":visible") &&
      $(".Wrapper-ExteraHoteldate").find(".checkin").val() !== ""
    ) {
      if (
        $(".Wrapper-ExteraHoteldate").find(".nextCalOpeningex").val() === ""
      ) {
        $(".Wrapper-ExteraHoteldate")
          .find(".nextCalOpeningex")
          .trigger("onclick");
      }
    } else {
      let returnDate = $("." + e)
        .find(".nextCalOpening")
        .val();
      if (returnDate == "") {
        $("." + e)
          .find(".nextCalOpening")
          .val();
        $("." + e)
          .find(".nextCalOpening")
          .trigger("onclick");
      }
    }
  } else {
    $("." + e)
      .find(".nextCalOpening")
      .trigger("onclick");
  }
}

// $(".button-click-child .button").on("click", function () {
$(".button-click-child").on("click", ".button", function () {
  var t = $(this),
    e = parseInt(t.closest("ul").next().val()),
    i = "+" == t.text() ? e + 1 : e > 0 ? e - 1 : 0,
    n = "";
  i >= 5 ||
    (t.closest("ul").next().val(i),
    t
      .closest("ul")
      .prev()
      .val(i + ","),
    t
      .closest("form")
      .find(".cat_textbox")
      .each(function () {
        var t = $(this).next("span").text();
        n += t + ": " + $(this).val() + "، ";
      }),
    e < i
      ? t.closest("form").find(".childDropdowns").append(createChildDropdown(i))
      : e > i &&
        destroyChildDropdown(t.closest("form").find(".childDropdowns"), i),
    (n = n.substring(0, n.length - 2)),
    t.closest(".inner-city").find(".passenger-counts").show(),
    t.closest("form").find(".hotel-inputF").attr("placeholder", ""),
    t
      .closest("form")
      .find(".count-child")
      .text(" کودک " + i));
}),
  $(".search-flight").click(function () {
    (s = $(this).closest("form").find(".childcountinput").val()),
      "0," == s && $(this).closest("form").find(".childcountinput").val(0),
      $(this)
        .closest("form")
        .find(".contentRooms")
        .each(function () {
          var t = $(this).find(".chcount").val(),
            e = "";
          $(this)
            .find(".select-age")
            .each(function () {
              e = e + "," + $(this).val();
            }),
            $(this)
              .find(".childcountandage")
              .val(t + e);
        });
  }),
  $(".Basis_Date").each(function () {
    $(this).click(function () {
      $(".searchList").slideUp();
    });
  }),
  $(document).ready(function () {
    $(".frm").each(function () {
      $(this).submit(function (t) {
        $(this)
          .find(
            "input[name=fdate],input[name=tdate],input[type=text].FCD1 ,input[type=text].FCD2,input[type=text].FCD,input[type=hidden].co-id"
          )
          .each(function () {
            "" != $(this).val() || $(this).is(":disabled")
              ? ($(this).closest("div").find(".notification").remove(),
                $(this).closest(".date-city").removeClass("input-alarm"))
              : (t.preventDefault(),
                $(this).after('<span class="notification p-absolute"></span>'),
                $(this).closest(".date-city").find(".selected-day").empty(),
                $(this).closest(".date-city").find(".selected-month").empty(),
                $(this).closest(".date-city").addClass("input-alarm"));
          });
      });
    });
  }),
  $(
    ".hotel-input , .count-adult , .count-child , .count-room , .count-adultRoom , .count-childRoom , .fclass, .pass-box, .pass-box .inner-city, .ui-datepicker, .ui-datepicker td, ui-datepicker td a"
  ).click(function (t) {
    const searchList = document.querySelectorAll(".searchList"),
      flighttypeUl = document.querySelector(".show-flighttype"),
      flightclassParent = document.querySelectorAll(".flightclass-box");
    flightclassParent.forEach((item) => {
      item.querySelector(".show-flightclass").classList.add("hidden");
    });
    searchList.forEach((item) => {
      item.style.display = "none";
    });
    flighttypeUl.classList.add("hidden");
    return (
      $(this)
        .parents(".city .inner-city")
        .children(".HotelPassengers")

        .toggleClass("hidden"),
      t.preventDefault(),
      !1
    );

    //bitaa
  }),
  $(document).on("click", function (t) {
    $(t.target).closest(
      ".searchList,.country,.selectCountry,.city, .form-search-input"
    ).length || $(".searchList").slideUp(),
      $(t.target).closest(
        ".hotel-input , .count-adult , .count-child , .count-room , .count-adultRoom , .count-childRoom , .fclass , .HotelPassengers div , HotelPassengers span"
      ).length || $(".HotelPassengers").addClass("hidden");

    //bitaa
  }),
  $(".Classname-box select").each(function () {
    $(this).change(function () {
      var t;
      switch ($(this).val()) {
        case "Economy":
          t = "اکونومی";
          break;
        case "BusinessClass":
          t = "بیزینس";
          break;
        case "FirstClass":
          t = "فرست";
      }
      $(this).closest(".city").find(".fclass").text(t);
    });
  });

function showMultiCity(t) {
  $("#multi-flight-form").removeClass("hidden"),
    $(t).addClass("active-r-btn"),
    $("#direct").removeClass("active-r-btn"),
    $("#return").removeClass("active-r-btn"),
    $("#flightSearch").hide(),
    $("#multi-flight-form").show(),
    $(window).width() <= 750 &&
      $("#multi-flight-form").attr("action", "/M_MultiCity_Search.bc");
  $(".Flighttype-text").text("چند مسیره");
}
$(window).width() >= 1024 &&
  $("#multi-flight-form")
    .find(".route-content")
    .each(function () {
      $(this).addClass("set_Date_Box");
    });

function addMulticityRoute(t) {
  const destination_nth_txt = [
    "مقصد اول",
    "مقصد دوم",
    "مقصد سوم",
    "مقصد چهارم",
  ];

  if (
    document
      .querySelector(".route-container")
      .querySelectorAll(".route-content").length < 4
  ) {
    const e = document
        .querySelector(".route-container")
        .querySelectorAll(".route-content")[0].innerHTML,
      i = document.createElement("div");
    (i.innerHTML = e),
      $(window).width() >= 1024
        ? (i.className =
            "route-content set_Date_Box relative clear-both flex flex-col gap-2 pb-7 pt-5 float-right w-full")
        : (i.className =
            "route-content relative clear-both flex flex-col gap-2 mb-7 mt-5 float-right w-full"),
      (i.querySelector(".multi-route-tlt").innerText =
        destination_nth_txt[
          document
            .querySelector(".route-container")
            .querySelectorAll(".route-content").length
        ]),
      i.querySelectorAll("input").forEach((t) => {
        t.value = "";
      }),
      i.insertAdjacentHTML(
        "beforeend",
        '<div class="route-minus-btn text-primary-900  left-[14px] top-[18px] absolute flex items-center cursor-pointer text-sm" onclick="deleteMulticityRoute(this)"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.81295 6.50009L12.7277 1.58528C13.0908 1.22221 13.0908 0.635366 12.7277 0.2723C12.3646 -0.0907666 11.7778 -0.0907666 11.4148 0.2723L6.5 5.18711L1.58525 0.2723C1.22219 -0.0907666 0.635353 -0.0907666 0.272294 0.2723C-0.0907647 0.635366 -0.0907647 1.22221 0.272294 1.58528L5.18704 6.50009L0.272294 11.415C-0.0907647 11.778 -0.0907647 12.3649 0.272294 12.7279C0.453359 12.909 0.691065 13 0.928771 13C1.16648 13 1.40418 12.909 1.58525 12.7279L6.5 7.81317L11.4148 12.7279C11.5958 12.909 11.8335 13 12.0712 13C12.3089 13 12.5466 12.909 12.7277 12.7279C13.0908 12.3649 13.0908 11.778 12.7277 11.415L7.81295 6.50009Z" fill="#F87171"/>\n</svg>\n</div>'
      ),
      i.querySelector(".gregorian_date") &&
        i.querySelector(".gregorian_date").remove(),
      document.querySelector(".route-container").append(i),
      i.setAttribute(
        "data-index",
        t
          .closest("form")
          .querySelector(".route-container")
          .querySelectorAll(".route-content").length
      ),
      (i.querySelector(".fromcity_container").querySelector(".country").value =
        i.previousElementSibling
          .querySelector(".tocity_container")
          .querySelector(".country").value),
      (i.querySelector(".fromcity_container").querySelector(".fromcity").value =
        i.previousElementSibling
          .querySelector(".tocity_container")
          .querySelector(".tocity").value);
  }
  checkButtonAddCity();
}

function deleteMulticityRoute(t) {
  const destination_nth_txt = [
    "مقصد اول",
    "مقصد دوم",
    "مقصد سوم",
    "مقصد چهارم",
  ];
  t.closest(".route-content").remove();
  let e = 0;
  document
    .querySelector("#multi-flight-form")
    .querySelector(".route-container")
    .querySelectorAll(".route-content")
    .forEach((t) => {
      (t.querySelector(".multi-route-tlt").innerText = destination_nth_txt[e]),
        e++,
        t.setAttribute("data-index", e);
    }),
    checkButtonAddCity();
}

function checkButtonAddCity(t) {
  document.querySelector(".route-container").querySelectorAll(".route-content")
    .length >= 4
    ? (document
        .getElementsByClassName("route-plus-btn")[0]
        .classList.remove("hvr-outline-out"),
      document
        .getElementsByClassName("route-plus-btn")[0]
        .classList.add("deactive-addmc"))
    : (document
        .getElementsByClassName("route-plus-btn")[0]
        .classList.remove("deactive-addmc"),
      document
        .getElementsByClassName("route-plus-btn")[0]
        .classList.add("hvr-outline-out"));
}

function formMulticity_search_isSubmited(t, e) {
  const destination_nth_txt = [
    "مقصد اول",
    "مقصد دوم",
    "مقصد سوم",
    "مقصد چهارم",
  ];
  let i = "";
  if (
    (t
      .querySelector(".childDropdowns")
      .querySelectorAll("select")
      .forEach((t) => {
        i = i + t.value + ",";
      }),
    "" !== i)
  ) {
    t.querySelector(".select-age-value").value = i;
    var n = t
      .querySelector(".select-age-value")
      .value.replace(/,(?=[^,]*$)/, "");
    t.querySelector(".select-age-value").value = n;
  } else t.querySelector(".select-age-value").value = 0;
  for (let e = 0; e < t.getElementsByClassName("route-content").length; e++)
    t
      .getElementsByClassName("route-content")
      [e].querySelector(".fromcity")
      .setAttribute("name", `_root.route__${e}.fromcity`),
      t
        .getElementsByClassName("route-content")
        [e].querySelector(".tocity")
        .setAttribute("name", `_root.route__${e}.tocity`),
      t
        .getElementsByClassName("route-content")
        [e].querySelector(".start_date")
        .setAttribute("name", `_root.route__${e}.departuredate`),
      t
        .getElementsByClassName("route-content")
        [e].querySelector(".fromcity-text")
        .setAttribute("name", `_root.route__${e}.fromcityName`),
      t
        .getElementsByClassName("route-content")
        [e].querySelector(".tocity-text")
        .setAttribute("name", `_root.route__${e}.tocityName`),
      t
        .getElementsByClassName("route-content")
        [e].querySelector(".multi-route-tlt")
        .insertAdjacentHTML(
          "beforeend",
          `<input type="hidden" value="${destination_nth_txt[e]}" name="_root.route__${e}.index"/>`
        );
}
function exchangeDepDes(t) {
  var e = $(t).closest(".route-content").find(".FCD1").val(),
    i = $(t).closest(".route-content").find(".FCD2").val(),
    n = $(t).closest(".route-content").find(".FCDid1").val(),
    o = $(t).closest(".route-content").find(".FCDid2").val(),
    s = $(t).closest(".route-content").find(".split-text-des").text(),
    a = $(t).closest(".route-content").find(".split-text-dep").text();
  $(t).closest(".route-content").find(".FCD1").val(i),
    $(t).closest(".route-content").find(".FCD2").val(e),
    $(t).closest(".route-content").find(".FCDid1").val(o),
    $(t).closest(".route-content").find(".FCDid2").val(n),
    $(t).closest(".route-content").find(".split-text-des").text(a),
    $(t).closest(".route-content").find(".split-text-dep").text(s);
}
$("#tourSearch .country").on("keyup", function () {
  var t = $(this).val().toLowerCase();
  $(".selectCountry").hide(),
    $(".selectCountry")
      .filter(function () {
        return $(this).text().toLowerCase().includes(t);
      })
      .show();
});

document.body.addEventListener("click", (e) => {
  const flighttypeUl = document.querySelector(".show-flighttype");
  const flightParent = document.querySelector(".flight-items ");
  const flightclassParent = document.querySelectorAll(".flightclass-box");
  if (!flightParent.contains(e.target)) {
    flighttypeUl.classList.add("hidden");
  }
  flightclassParent.forEach((item) => {
    if (!item.contains(e.target)) {
      item.querySelector(".show-flightclass").classList.add("hidden");
    }
  });
});

