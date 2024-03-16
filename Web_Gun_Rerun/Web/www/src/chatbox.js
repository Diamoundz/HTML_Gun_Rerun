document.addEventListener("DOMContentLoaded", function() {
    const messageInput = document.querySelector(".message-input");
    const sendButton = document.querySelector(".send-button");
    const messagePanel = document.querySelector(".message-panel");

    const displayedMessages = [];

    function sendMessage(message) {
        const formData = new FormData();
        formData.append('msg', message);
        formData.append('username', 'guest');
    
        fetch('../htbin/chatsend.py', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.num === 1) {
                console.error('Erreur, le message est absent.');
            } else if (data.num === -1) {
                console.error('Erreur de lecture du nom d\'utilisateur');
            } else if (data.num === 0) {
                console.log(data.msg);
                getMessages();
            } else {
                console.error('Unexpected response from server:', data);
            }
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });
    }

    function displayMessage(message, time, user) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        
        const isLeft = Math.random() < 0.5;
        messageDiv.classList.add(isLeft ? 'left' : 'right');
    
        if (isLeft) {
            messageDiv.innerHTML = `
                <div class="message-info">
                    <div class="message-time">${time}</div>
                    <div class="profile-picture" style="background-color: red;"></div>
                </div>
                <div class="message-text">${message}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-text">${message}</div>
                <div class="message-info">
                    <div class="message-time">${time}</div>
                    <div class="profile-picture" style="background-color: blue;"></div>
                </div>
            `;
        }
    
        messagePanel.appendChild(messageDiv);
        messagePanel.scrollTop = messagePanel.scrollHeight;
    }

    sendButton.addEventListener("click", function() {
        const message = messageInput.value.trim();
        if (message !== "") {
            sendMessage(message);
            messageInput.value = "";
        }
    });

    messageInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            const message = messageInput.value.trim();
            if (message !== "") {
                sendMessage(message);
                messageInput.value = "";
            }
        }
    });

    function getMessages() {
        fetch('../htbin/chatget.py')
        .then(response => response.json())
        .then(data => {
            data.forEach(message => {
                if (!isMessageDisplayed(message)) {
                    displayMessage(message.msg, message.time, message.user);
                    displayedMessages.push(message);
                }
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function isMessageDisplayed(message) {
        return displayedMessages.some(displayedMessage => {
            return displayedMessage.msg === message.msg &&
                   displayedMessage.user === message.user &&
                   displayedMessage.time === message.time;
        });
    }
    getMessages();
    setInterval(getMessages, 5000);
});
