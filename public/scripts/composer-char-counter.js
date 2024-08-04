/**
 * Responsible for the character counter.
 */
const MAXCHAR = 140;

$(document).ready(function () {
  //get the input value
  let remainingChars = MAXCHAR;
  $("#tweet-text").on("input", function () {
    let textCount = $(this).val().length;

    remainingChars = MAXCHAR - textCount;
    if (remainingChars < 0) {
      $(".counter").addClass("counter-red");
    } else {
      $(".counter").removeClass("counter-red");
    }
    $(".counter").text(remainingChars);
  });
});
