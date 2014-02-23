// TODO: issue with this.  can also be 'deleted karma' with unknown source.  so maybe show three numbers.


// From http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
// Modified to work on any url string (instead of current location)
function getParameterByName(url, name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


// TODO: some other stats
    // total # comments, stories; maybe polls, etc. too
    // link to some searches on hnsearch
    // percentage of comments vs stories
    // recent {comments, karma, etc.}


var storyKarma = 0;
var xhr = new XMLHttpRequest();

// TODO: cache it? 
// TODO: for now this will only work with the first 1000 hits (doesn't make multiple queries yet to properly handle popular users)
function onRequest(request, sender, sendResponse) {
    // TODO: parse request.url to get username
    // TODO: look at sender.tab.url

    console.log(sender.tab.url);
    var username = getParameterByName(sender.tab.url, "id");
    console.log(username);

    // TODO: hardcoded for jaredsohn at the moment (should derive from URL); should do this when webpage changes
    xhr.open("GET", "https://hn.algolia.com/api/v1/search?tags=author_" + username + "&hitsPerPage=1000", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var resp = JSON.parse(xhr.responseText);

            var commentKarma = 0, storyKarma = 0;

            for (i = 0; i < resp.hits.length; i++)
            {
                for (j = 0; j < resp.hits[i]._tags.length; j++)
                {
                    if ((resp.hits[i])._tags[j] === "comment")
                    {
                        commentKarma += resp.hits[i].points - 1;
                        break;
                    } else if ((resp.hits[i])._tags[j] === "story")
                    {
                        storyKarma += resp.hits[i].points - 1;
                        break;
                    }
                }
            }

            var resp = {};
            resp.username = username;
            resp.storyKarma = storyKarma;
            resp.commentKarma = commentKarma;
            resp.percentCommentKarma = (commentKarma / (commentKarma + storyKarma) * 100).toFixed() + "%";
            //console.log(sendResponse);
            console.log(resp);
            sendResponse(resp);

            chrome.tabs.sendMessage(sender.tab.id, resp, function(response) 
            {
            });
        }
    }
    xhr.send();
};

chrome.runtime.onMessage.addListener(onRequest);





getParameterByName("https://news.ycombinator.com/user?id=jaredsohn&foo2=foo3", "id")

