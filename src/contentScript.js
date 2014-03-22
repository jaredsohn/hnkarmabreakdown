chrome.runtime.sendMessage({}, function(response) {});  	// Let the background know that this tab is active

function onRequest(request, sender, sendResponse) {
	// Show karma subtotals in parentheses after karma total
	var total_karma = (request.comment_karma + request.story_karma);
	document.getElementsByTagName("tr")[6].getElementsByTagName("td")[1].innerHTML += " (" + request.percent_comment_karma + " comments, " + request.comment_karma + "/" + total_karma + ")"
};

chrome.runtime.onMessage.addListener(onRequest);