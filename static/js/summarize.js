async function summarizeArticle() {
    const userInput = document.getElementById('toSummarize').value;
    const chatDiv = document.getElementById('summarized');
    const systemSettings = 'The user will input a piece of text. Your job is to write a short summary, in Arabic.';
    await chatgptCall(systemSettings, userInput, chatDiv, true);
    writeTitle();
}

async function writeTitle() {
  const chatDiv = document.getElementById('title');
  const systemSettings = 'You are given a short text. Give this text a suitable title in Arabic.';
  const userInput = document.getElementById('summarized').value.slice(0, 3000);
  await chatgptCall(systemSettings, userInput, chatDiv);
  writeKeywords();
}

async function writeKeywords() {
  const userInput = document.getElementById('summarized').value.slice(0, 3000);
  const chatDiv = document.getElementById('keywords');
  const systemSettings = 'You must write keywords/tags based on the user input. These keywords/tags must be in Arabic, separated by commas.';
  await chatgptCall(systemSettings, userInput, chatDiv);
  generateImage();
}
