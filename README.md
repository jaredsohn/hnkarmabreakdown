# Hacker News Karma Breakdown

This is a Chrome extension that shows what portion of a user's karma comes from comments and what portion comes from article submissions.

## Installation

You can get it in the Chrome Web Store here:

https://chrome.google.com/webstore/detail/hacker-news-karma-details/mffigdmfbplhmdmbgncgncndjngcdlni

Alternatively, clone the repo to disk and point Chrome at the folder when adding an extension in developer mode.


## Usage

Go to Hacker News, and click on a user profile.  Right after you see the user's total amount of karma, it will show you the raw karma totals for article submissions and comments as well as a percentage for comment karma.


## FAQ

Q: Why does no data show up?

A: It could just be slow.  If a user has over 1000 comments or article submissions, it requires making multiple requests.  Because the paging is done based on timestamp, they must be downloaded serially.

You also might have run into Algolia's HN API limit of 1000 requests per hour via this or other software.  This extension only makes requests when you visit user pages so you are unlikely to run into this problem if you only access the API through it.


Q: Why doesn't submission karma + comment karma === total karma?

A: People delete messages, both with positive and with negative karma.  Also, everyone gets 1 karma for having an account which is not included in the totals.  There may be other reasons (Are polls treated separately?  Does the API of karma for really old posts? etc.) that are still being investigated.)

## Build instructions

This extension requires extra build instructions because it shares code with the hnuser npm module.

1. Check out this repo

2. Run
	npm install hnuser request-browser browserify

3. Modify node_modules/hnuser/lib/hnuser.js to require 'request-browser' instead of 'request'.

4. Run 
	browserify background.js -o bundle.js


## Credits

This code is distributed under the MIT license (although credit is appreciated).  It makes use of the following code:

* Chrome extension started via Chrome-boilerplate (https://github.com/mahemoff/chrome-boilerplate.)

* Icons came from the HackerNew extension (https://github.com/tommoor/HackerNew).

* Uses Algolia's HN Search API (http://hn.algolia.com/api)

* Thanks to the Launch Hackathon (http://www.hackathon.launch.co/) for the initial energy to build this.

* Browserify (https://github.com/substack/node-browserify) made it easy share code with the npm module hnuser (http://www.github.com/jaredsohn/hnuser).

## Donations

Appreciated.  

http://pages.cs.wisc.edu/~sohn/donate/index.html
