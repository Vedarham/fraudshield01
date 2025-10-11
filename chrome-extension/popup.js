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


const modal = document.getElementById('uploadModal');
const uploadButton = document.getElementById('uploadButton');
const closeButton = document.querySelector('.close');
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');
const uploadSubmit = document.getElementById('uploadSubmit');

let selectedFile = null;

uploadButton.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
  resetUpload();
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
    resetUpload();
  }
});

uploadArea.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', handleFileSelect);

uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
  uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('dragover');
  
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    handleFile(files[0]);
  }
});

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    handleFile(file);
  }
}

function handleFile(file) {
  const allowedTypes = ['application/pdf', 'application/msword', 
                       'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
                       'text/plain'];
  
  if (!allowedTypes.includes(file.type)) {
    alert('Please select a valid file type (PDF, DOC, DOCX, or TXT).');
    return;
  }

  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    alert('File size must be less than 10MB.');
    return;
  }

  selectedFile = file;
  fileName.textContent = file.name;
  fileSize.textContent = formatFileSize(file.size);
  fileInfo.style.display = 'block';
  uploadSubmit.disabled = false;
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function resetUpload() {
  selectedFile = null;
  fileInput.value = '';
  fileInfo.style.display = 'none';
  uploadSubmit.disabled = true;
}

uploadSubmit.addEventListener('click', async () => {
  if (!selectedFile) {
    alert('Please select a file first.');
    return;
  }

  uploadSubmit.disabled = true;
  uploadSubmit.textContent = 'Analyzing...';

  try {
    const formData = new FormData();
    formData.append('file', selectedFile);

    const response = await fetch('http://localhost:8000/scan-document', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to analyze document');
    }

    const result = await response.json();
  
    document.getElementById('prediction').innerText = result.label;
    document.getElementById('confidence').innerText = `${result.confidence}%`;
    
    modal.style.display = 'none';
    resetUpload();
    
    alert(`Document analyzed successfully!\nResult: ${result.label}\nConfidence: ${result.confidence}%`);

  } catch (error) {
    console.error('Error analyzing document:', error);
    alert('Failed to analyze the document. Please try again.');
  } finally {
    uploadSubmit.disabled = false;
    uploadSubmit.textContent = 'Analyze Document';
  }
});
