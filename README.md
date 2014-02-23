# Hacker News Karma Details

This is a Chrome extension that shows what portion of a user's karma comes from comments and what portion comes from article submissions.

## Installation

Clone the repo and point Chrome at the folder.  Alternatively, it will be available in the Google Web Store soon (and linked to from here.)


## Usage

Go to Hacker News, and click on a user profile.  Right after you see the user's total amount of karma, it will show you the raw karma totals for article submissions and comments as well as a percentage for comment karma.


## FAQ

Q: Why do the numbers look off for popular users?

A: A single API call only gets 1000 comments/article submissions, although this should be fixable.


Q: Why doesn't submission karma + comment karma === total karma?

A: People delete messages, both with positive and with negative karma.  Also, everyone gets 1 karma for having an account which is not included in the totals.



## Credits

This code is distributed under the MIT license (although credit is appreciated).  It makes use of the following code:

* Chrome extension started via Chrome-boilerplate (https://github.com/mahemoff/chrome-boilerplate.)

* Icons came from the HackerNew extension (https://github.com/tommoor/HackerNew).

* Uses Algolia's HN Search API (http://hn.algolia.com/api)

* Thanks to the Launch Hackathon (http://www.hackathon.launch.co/) for the energy to build this.


## Donations

Appreciated.  

Gittip: http://www.gittip.com/jaredsohn.

Flattr: https://flattr.com/profile/jaredsohn

PayPal: jared dot sohn at gmail.com
