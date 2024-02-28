async function writeArticle() {
    const continueButton = document.getElementById('continue-button');
    continueButton.setAttribute('disabled', '');
    const chatDiv = document.getElementById('maqal');
    const systemSettings = 'The user will input a title. Your job is to use the title to write an article in Arabic.';
    const userInput = document.getElementById('articleTitle').value;
    await chatgptCall(systemSettings, userInput, chatDiv);
    continueButton.removeAttribute('disabled');
    writeKeywords();
  }

async function extendArticle() {
    const continueButton = document.getElementById('continue-button');
    continueButton.setAttribute('disabled', '');
    const chatDiv = document.getElementById('maqal');
    const systemSettings = 'The user will input an article. Your job is to extend the article in Arabic. Only give the extension.';
    const userInput = document.getElementById('maqal').value;
    await chatgptCall(systemSettings, userInput, chatDiv);
    continueButton.removeAttribute('disabled');
  }

async function writeKeywords() {
  const chatDiv = document.getElementById('keywords');
  const systemSettings = 'You must write keywords/tags based on the user input. These keywords/tags must be in Arabic.';
  const userInput = document.getElementById('articleTitle').value;
  await chatgptCall(systemSettings, userInput, chatDiv);
  generateImage();
}