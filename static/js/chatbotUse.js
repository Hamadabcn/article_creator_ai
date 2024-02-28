function toggleView() {
    const chatbotFrame = document.querySelector('#chatbotFrame');
    if (chatbotFrame.style.display == 'none') {
        chatbotFrame.style.display = 'block';
    } else {
        chatbotFrame.style.display = 'none';
    }
}