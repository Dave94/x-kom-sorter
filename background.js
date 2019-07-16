chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.set({color: '#3aa757'}, function() {
		console.log("The color is green.");
	});
});
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
	chrome.declarativeContent.onPageChanged.addRules([{
		conditions: [new chrome.declarativeContent.PageStateMatcher({
			pageUrl: {hostEquals: 'www.x-kom.pl'},
		})
		],
		actions: [new chrome.declarativeContent.ShowPageAction()]
	}]);
});

function logURL(requestDetails) {
  console.log("Loading: " + requestDetails.url);
}
var callback = function(details) {
	if (details.url.includes("promoapi.x-kom.pl") == 1)
    	{  chrome.storage.local.set({ api_url: details.url });}
};
var filter = {urls: ["<all_urls>"]};
var opt_extraInfoSpec = [];

chrome.webRequest.onBeforeRequest.addListener(
        callback, filter, opt_extraInfoSpec);

