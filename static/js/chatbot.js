async function sendMessage() {
    const userInput = document.getElementById('humanInput').value;
    document.getElementById('humanInput').value = '';

    const newMessage = document.createElement("div");
    newMessage.classList.add('humanMessage')
    newMessage.innerHTML = userInput;

    const messageList = document.getElementById('messageList');
    messageList.appendChild(newMessage);

    const replyMessage = document.createElement("div");
    replyMessage.classList.add('botMessage')
    messageList.appendChild(replyMessage);
    const systemSettings = 'You are a chat bot. Please reply in Arabic.';

    await chatgptCall(systemSettings, userInput, replyMessage);
  }

  function langchainSend() {
    const userInput = document.getElementById('humanInput').value;

    const newMessage = document.createElement("div");
    newMessage.classList.add('humanMessage')
    newMessage.innerHTML = userInput;

    const messageList = document.getElementById('messageList');
    messageList.appendChild(newMessage);

    const replyMessage = document.createElement("div");
    replyMessage.classList.add('botMessage')
    messageList.appendChild(replyMessage);
    replyMessage.innerHTML = 'نفكر...'
    document.getElementById('humanInput').value = '';
    const url = '/langchain-gpt';
    const data = {
      user_input: userInput
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(text => {
      replyMessage.innerHTML = text;
    })
  }
