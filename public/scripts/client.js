/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Function to create a tweet element from a tweet object
const createTweetElement = function (tweet) {
  const { user, content, created_at } = tweet;

  // Constructing the tweet element using template literals
  const safeHTML = `<p class="tweet-content">
            <!-- This is where the tweet text will go -->
            ${escape(content.text)}
          </p>`;
  let $tweet = ` 
        <article class="tweet">
          <header>
            <!-- User avatar and name go here -->
            <div>
              <img src=${user.avatars} alt="User avatar" class="avatar">
              <p class="username">${user.name}</p>
            </div>
            <p>${user.handle}</p>
          </header>
          ${safeHTML}
          <footer>
            <!-- Timestamp and action icons go here -->
            <div>
              ${timeago.format(created_at, "en_US")}              
            </div>
            <div>
              <i class="fa fa-reply"></i>
              <i class="fa fa-retweet"></i>
              <i class="fa fa-heart"></i>
            </div>
          </footer>
        </article>
      `;
  return $tweet;
};

// Function to render tweets on the page
const renderTweets = function (tweets) {

  // Loop through each tweet
  for (let tweet of tweets) {
    // Create a tweet element
    const tweetElement = createTweetElement(tweet);

    // Append the tweet element to the tweets container
    $("#tweets-container").prepend(tweetElement);
    
  }
};

// Document ready function to ensure DOM is fully loaded
$(document).ready(function () {
  // Render initial tweets
  //renderTweets(data);

  // Event listener for new tweet submission
  $("form").on("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const tweetText = $("#tweet-text").val().trim();

    if (!isTweetValid(tweetText)) return;

    const serializedData = $(this).serialize(); // Serialize form data

    // AJAX POST request to submit the new tweet
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: serializedData,
      success: function (response) {
        console.log("Tweet posted successfully:", response);
        console.log(serializedData);
        loadTweets();
        resetTxtarea();
      },
      error: function (error) {
        console.error("Error posting tweet:", error);
      },
    });
  });

  //Event listener for the new tweet show and hide form
  $("form").hide();
  let hidden = true;
  $("#new-tweet-button").on("click", function (event) {
    if (!hidden) {
      $("form").slideUp('slow');
      hidden = true;
    } else {
      $("form").slideDown('slow');
      $("#tweet-text").focus();
      
      hidden = false;
    }  
  });

  //event listener that scrolls to the top when clicked
  $("#scroll-up").hide();
  $(this).on("scroll", function() {
    if ($(this).scrollTop() > 100) {
      $("#scroll-up").fadeIn('slow');
    } else {
      $("#scroll-up").fadeOut('slow');
    }
  });
  $("#scroll-up").on("click", function(){
    $('html, body').animate({scrollTop: 0}, 1000);
  });


  // Function to load tweets from the server and render them on the page
  $("#limit-alert").hide();
  const loadTweets = function () {
    // Clear the textarea content
    $("#tweets-container").empty();

    // Perform a GET request to fetch tweets
    $.get("/tweets").then(function (data) {
      // Render the fetched tweets
      renderTweets(data);
    });
  };
  // Initial call to load tweets when the page loads
  loadTweets();
});

// Function to reset the textarea and counter
const resetTxtarea = function () {
  // Clear the textarea content
  $("#tweet-text").val("");

  // Reset the character counter to 140
  $(".counter").val("140");
};

// Function to validate the tweet text
const isTweetValid = function (text) {
  $("#limit-alert").hide();
  // Check if the tweet is empty
  if (!text.length) {
    $("#limit-alert").text("⚠️ You cannot enter an empty tweet. ⚠️").slideDown('fast');    
    setTimeout(() => $("#limit-alert").slideUp('slow'), 5000);
    return false;
  }
  // Check if the tweet exceeds 140 characters
  else if (text.length > 140) {
    $("#limit-alert").text(" ⚠️ Woah. The limit is 140 letters. ⚠️").slideDown('fast');
    setTimeout(() => $("#limit-alert").slideUp('slow'), 5000);
    return false;
  }

  return true;
};

// Function to escape potentially unsafe characters in a string
const escape = function (str) {
  // Create a temporary div element
  let div = document.createElement("div");

  // Append the text node to the div
  div.appendChild(document.createTextNode(str));

  // Return the escaped HTML content
  return div.innerHTML;
};
