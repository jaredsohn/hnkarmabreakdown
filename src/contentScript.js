chrome.runtime.sendMessage({}, function(response) 
{
	// Let the background know that this tab is active
});

function onRequest(request, sender, sendResponse) {
	//console.log(request);
	var totalKarma = (request.commentKarma + request.storyKarma);
	document.getElementsByTagName("tr")[6].getElementsByTagName("td")[1].innerHTML += " (" + request.percentCommentKarma + " comments, " + request.commentKarma + "/" + totalKarma + ")"
};

chrome.runtime.onMessage.addListener(onRequest);
