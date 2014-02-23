chrome.runtime.sendMessage({}, function(response) {});  	// Let the background know that this tab is active

function onRequest(request, sender, sendResponse) {
	// Show karma subtotals in parentheses after karma total
	var totalKarma = (request.commentKarma + request.storyKarma);
	document.getElementsByTagName("tr")[6].getElementsByTagName("td")[1].innerHTML += " (" + request.percentCommentKarma + " comments, " + request.commentKarma + "/" + totalKarma + ")"
};

chrome.runtime.onMessage.addListener(onRequest);