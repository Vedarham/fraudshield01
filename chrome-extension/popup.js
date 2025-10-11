document.getElementById('scanButton').addEventListener('click', async () => {
  const text = document.getElementById('inputText').value;

  if (!text) {
    alert("Please enter some text to scan.");
    return;
  }

  try {
    const response = await fetch('http://localhost:8000/scan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });

    const result = await response.json();
    document.getElementById('prediction').innerText = result.label;
    document.getElementById('confidence').innerText = `${result.confidence}%`;

  } catch (error) {
    console.error('Error scanning text:', error);
    alert("Failed to scan the text. Please try again.");
  }
});
