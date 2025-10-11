
function getSelectedText() {
  const selection = window.getSelection();
  return selection.toString();
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'scanText') {
    const text = getSelectedText();
    sendResponse({ selectedText: text });
  }
});
