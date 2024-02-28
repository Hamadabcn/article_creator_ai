async function transcribeFunction() {
    const transcribeButton = document.querySelector('#transcribeAudio');
    const textarea = document.getElementById('toSummarize');
    const fileInput = document.getElementById('file');
    transcribeButton.innerHTML = 'جاري التفريغ...'
    transcribeButton.style.background = '#99d1ff';
    transcribeButton.style.borderColor = '#99d1ff';

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    const response = await fetch('/transcribe-api', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const transcription = await response.text();
    textarea.value = transcription;

    transcribeButton.innerHTML = 'اكتب'
    transcribeButton.style.background = '';
    transcribeButton.style.borderColor = '';
    writeKeywords();};

async function writeKeywords() {
  const chatDiv = document.getElementById('keywords');
  const systemSettings = 'You must write keywords/tags based on the user input. These keywords/tags must be in Arabic.';
  const userInput = document.getElementById('toSummarize').value.slice(0, 3000);
  await chatgptCall(systemSettings, userInput, chatDiv);
  generateImage();
};
