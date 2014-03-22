// From http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
// Modified to work on any url string (instead of current location)
function getParameterByName(url, name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function onRequest(request, sender, sendResponse) {
    var username = getParameterByName(sender.tab.url, "id");
    var tabid = sender.tab.id;

    var hnuser = require('hnuser');
    hnuser.hnuser(username, function(hnuser_data)
    {
        console.log(hnuser_data);

        var stats = {};
        stats.username = username;
        stats.story_karma = hnuser_data.story_karma;
        stats.comment_karma = hnuser_data.comment_karma;
        stats.percent_comment_karma = (stats.comment_karma / (stats.comment_karma + stats.story_karma) * 100).toFixed() + "%";

        chrome.tabs.sendMessage(tabid, stats, function(response) 
        {
        });

    });
};

chrome.runtime.onMessage.addListener(onRequest);

