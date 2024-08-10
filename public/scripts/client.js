/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

// Function to create a tweet element from a tweet object
const createTweetElement = function (tweet) {
  const { user, content, created_at } = tweet;

  // Constructing the tweet element using template literals
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
          <p class="tweet-content">
            <!-- This is where the tweet text will go -->
            ${content.text}
          </p>
          <footer>
            <!-- Timestamp and action icons go here -->
            <div>${new Date(created_at).toLocaleString()}</div>
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
  // Log the tweets being rendered
  console.log("Rendering tweets:", tweets);

  // Loop through each tweet
  for (let tweet of tweets) {
    // Create a tweet element
    const tweetElement = createTweetElement(tweet);

    // Append the tweet element to the tweets container
    $("#tweets-container").prepend(tweetElement);
  }
};

// Document ready function to ensure DOM is fully loaded
$(document).ready(function() {
  // Render initial tweets
  renderTweets(data);

  // Event listener for new tweet submission
  $('form').on('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    const serializedData = $(this).serialize(); // Serialize form data

    // AJAX POST request to submit the new tweet
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: serializedData,
      success: function(response) {
        console.log('Tweet posted successfully:', response);
        console.log(serializedData);
      },
      error: function(error) {
        console.error('Error posting tweet:', error);
      }
    });
  });
});