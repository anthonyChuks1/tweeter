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

$(document).ready(function () {
  const createTweetElement = function (tweet) {
    const { user, content, created_at } = tweet;
    /* Your code for creating the tweet element */
    let $tweet = ` 
          <article class="tweet">
            <header>
              <!-- User avatar and name go here -->
               <div>
              <img src=${user.avatars} alt="User avatar" class="avatar">
              <p class="username">${user.name}</p>
              </div>
              <p>${user.handle} </p>
            </header>
            <p class="tweet-content">
              <!-- This is where the tweet text will go -->
              ${content.text}
            </p>
            <footer>
              <!-- Action icons go here -->
               <div>${created_at}</div>
               <div>
              <i class="fa fa-reply"></i>
              <i class="fa fa-retweet"></i>
              <i class="fa fa-heart"></i>
              </div>
            </footer>
          </article>
        `;
    // ...
    return $tweet;
  };

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    console.log("Rendering tweets:", tweets);
    for (let tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $("#tweets-container").append(tweetElement);
    }
  };

  renderTweets(data)
});


