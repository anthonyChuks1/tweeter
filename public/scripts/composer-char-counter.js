/**
 * Responsible for the character counter.
 */


$(document).ready(function () {
  //get the input value
  let remainingChars = 140;
  $("#tweet-text").on("input", function () {
    let textCount = $(this).val().length;

    remainingChars = 140 - textCount;
    if (remainingChars < 0) {
      $(".counter").addClass("counter-red");
    } else {
      $(".counter").removeClass("counter-red");
    }
    $(".counter").text(remainingChars);
  });
});
