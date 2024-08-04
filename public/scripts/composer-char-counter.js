/**
 * Responsible for the character counter.
 */

let remainingChars = 140;
$(document).ready(function () {
  //get the input value
  $("#tweet-text").on("input", function () {
    let textCount = $(this).val().length;

    remainingChars = 140 - textCount;
    if (remainingChars < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "inherit");
    }
    $(".counter").text(remainingChars);
  });
});
