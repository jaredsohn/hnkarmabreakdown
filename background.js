var xhr;
var username = "";
var tabid = 0;
var results = {};
var resp;
var commentKarma = 0, storyKarma = 0;

// From http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
// Modified to work on any url string (instead of current location)
function getParameterByName(url, name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

onXhrReadyStateChange = function() {
    if ((typeof(xhr) !== 'undefined') && (xhr.readyState == 4)) {

        console.log("onxhrreadystate");

        resp = JSON.parse(xhr.responseText);

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

        // TODO: maybe also keep track of total number of comments, submissions


        // Create new queries to handle additional pages (using create_at_i instead of the page feature, since the latter is disabled unless you have permission).  Results will be accumulated within the content script as they come in.
        // the code below works but requires that the contentscript is smart enough to add up the results and update the display (instead of constantly adding to it); could also have this wait to send to the contentscript until all data is computed.
//        if (false)
        if (resp.nbHits > resp.hitsPerPage)
        {
            console.log("new page");
            xhr = new XMLHttpRequest();
            var endDate = resp.hits[resp.hits.length - 1].created_at_i;
            var url = "https://hn.algolia.com/api/v1/search_by_date?tags=author_" + username + "&hitsPerPage=1000&numericFilters=created_at_i%3c" + endDate;
            console.log(url);
            xhr.open("GET", url, true);
            xhr.onreadystatechange = onXhrReadyStateChange;
            xhr.send();
        } else
        {
            results = {};
            results.username = username;
            results.storyKarma = storyKarma;
            results.commentKarma = commentKarma;
            results.percentCommentKarma = (commentKarma / (commentKarma + storyKarma) * 100).toFixed() + "%";
            //console.log(sendResponse);
            console.log(results);
            //sendResponse(resp);

            chrome.tabs.sendMessage(tabid, results, function(response)
            {
            });
        }
    }
};

function onRequest(request, sender, sendResponse) {
    username = getParameterByName(sender.tab.url, "id");
    tabid = sender.tab.id;
    commentKarma = 0;
    storyKarma = 0;

    xhr = new XMLHttpRequest();
    xhr.open("GET", "https://hn.algolia.com/api/v1/search_by_date?tags=author_" + username + "&hitsPerPage=1000", true);
    xhr.onreadystatechange = onXhrReadyStateChange;

    xhr.send();
}

chrome.runtime.onMessage.addListener(onRequest);

