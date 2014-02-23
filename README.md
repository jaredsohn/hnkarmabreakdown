# Hacker News Karma Breakdown

This is a Chrome extension that shows what portion of a user's karma comes from comments and what portion comes from article submissions.

## Installation

You can get it in the Chrome Web Store here:

https://chrome.google.com/webstore/detail/hacker-news-karma-details/mffigdmfbplhmdmbgncgncndjngcdlni?authuser=1

Alternatively, clone the repo to disk and point Chrome at the folder when adding an extension in developer mode.


## Usage

Go to Hacker News, and click on a user profile.  Right after you see the user's total amount of karma, it will show you the raw karma totals for article submissions and comments as well as a percentage for comment karma.


## FAQ

Q: Why do the numbers look off for popular users?

A: A single API call only gets 1000 comments/article submissions, although this should be fixable.

Q: Why does no data show up?

A: Algolia's HN API is limited to 1000 hits per hour (regardless of if you access it via this extension or through other sources.)  This extension only uses it once every time you view user info, so if this is a problem it is likely due to other software.

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
