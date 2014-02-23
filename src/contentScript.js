console.log("contentscript");

chrome.runtime.sendMessage({}, function(response) 
{
});


function onRequest(request, sender, sendResponse) {
	console.log(request);

	// TODO: update the dom now with karma totals
};

chrome.runtime.onMessage.addListener(onRequest);
