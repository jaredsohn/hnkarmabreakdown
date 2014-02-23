var storyKarma = 0;
var xhr = new XMLHttpRequest();

// From http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
// Modified to work on any url string (instead of current location)
function getParameterByName(url, name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// TODO: cache it? 
// TODO: for now this will only work with the first 1000 hits (doesn't make multiple queries yet to properly handle popular users)
function onRequest(request, sender, sendResponse) {
    var username = getParameterByName(sender.tab.url, "id");

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
            //console.log(resp);
            sendResponse(resp);

            chrome.tabs.sendMessage(sender.tab.id, resp, function(response) 
            {
            });
        }
    }
    xhr.send();
};

chrome.runtime.onMessage.addListener(onRequest);

