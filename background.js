// TODO: issue with this.  can also be 'deleted karma' with unknown source.  so maybe show three numbers.


var storyKarma = 0;
var xhr = new XMLHttpRequest();


// TODO: issue: want to maybe make multiple requests to algolia (unless i can combine effectively?  or call them in sequence?)
function onRequest(request, sender, sendResponse) {
    // TODO: parse request.url to get username
    // TODO: look at sender.tab.url

    console.log(request);

    // code adapted from https://github.com/jaredsohn/hnkarmadetails
    // TODO: hardcoded for jaredsohn at the moment (should derive from URL); should do this when webpage changes

    xhr.open("GET", "https://hn.algolia.com/api/v1/search?tags=story,author_jaredsohn", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            // JSON.parse does not evaluate the attacker's scripts.
            var resp = JSON.parse(xhr.responseText);
            // TODO: calculate story karma

            storyKarma = 0;
            var storyCount = resp.hits.length;


            for (i = 0; i < resp.hits.length; i++)
            {
                storyKarma += resp.hits[i].points - 1;
            }
            console.log("story karma: ");
            console.log(storyKarma);

            // TODO: publish storyKarma to contentscript (along with commentKarma and deletedKarma)
            // TODO: also cache it? 


            var resp = {};
            resp.storyKarma = storyKarma;
            //console.log(sendResponse);
            console.log(resp);
            sendResponse(resp);

            chrome.tabs.sendMessage(sender.tab.id, resp, function(response) 
            {
                console.log("response for sendmessage");
            });
        }
    }
    xhr.send();
};

chrome.runtime.onMessage.addListener(onRequest);
