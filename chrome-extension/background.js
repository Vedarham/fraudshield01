chrome.runtime.onInstalled.addListener(() => {
  console.log("Scam Text Scanner extension installed.");
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'scanText') {
    try {
      const response = await fetch('http://localhost:8000/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: message.selectedText })
      });

      const result = await response.json();
      sendResponse(result);

    } catch (error) {
      console.error('Error scanning selected text:', error);
      sendResponse({ error: 'Failed to scan the text.' });
    }
  }
  return true; 
});
