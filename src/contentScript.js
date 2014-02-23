console.log("contentscript");

chrome.runtime.sendMessage({}, function(response) 
{
	console.log("got a response");

	console.log(response);

	// TODO: update the dom now with karma totals
});


function onRequest(request, sender, sendResponse) {
	console.log("received message!");
	console.log(request);
};

chrome.runtime.onMessage.addListener(onRequest);
