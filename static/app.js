class Chatbox {
    constructor() {
        this.args = {
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];
    }
    display() {
        const {chatBox, sendButton} = this.args;



        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if(this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }
    

    
    onSendButton(chatbox) {
        var textField = document.querySelector('input');
        let chatwait = document.querySelector('.chatbox__messages p')
        
        let text1 = textField.value;
        let i = text1.length; 
       
        console.log(i)
        if (i >= 20){
            text1 = "";
        }
        if (text1 == "خدافظ"){
            textField.style = "display:none;"
            location.reload()
        }
      
        if (text1 == "goodbye"){
            textField.style = "display:none;"
            location.reload()
        }
        if (text1 == ""){
            return;
        }
        
       

        let msg1 = { name: "User", message: text1 }
        this.messages.push(msg1);

        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(r => r.json())
          .then(r => {
            let msg2 = { name: "Ariala", message: r.answer };
            
            this.messages.push(msg2);
            this.updateChatText(chatbox)
            textField.value = ''

        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
          });
    }
    

    async updateChatText(chatbox) {
        var html = '';
        var selectedlocal = localStorage.getItem('theme')?localStorage.getItem("theme"):"dark-defulat"
        this.messages.slice().reverse().forEach(function(item, index) {
            if (item.name === "User")
            {
                html += '<div class="messages__item messages__item--operator">User: ' + item.message + '</div>'
            }
            if (item.name === "Ariala" && selectedlocal === "light")
            {
            
               html += '<div class="messages__item messages__item--visitor"><h4 style="color:#19a406;">Ariala: '+'<span class="light" style="font-size:16px;">'+ item.message + "</span>"+' </h4></div>'
            }
            if (item.name === "Ariala" && selectedlocal === "dark-anna")
            {
                html += '<div class="messages__item messages__item--visitor"><h4 style="color:#19a406;">Ariala: '+'<span class="dark-anna" style="font-size:16px;">'+ item.message + "</span>"+' </h4></div>' 
            }
            if (item.name === "Ariala" && selectedlocal === "dark-defulat")
            {
                html += '<div class="messages__item messages__item--visitor"><h4 style="color:#19a406;">Ariala: '+'<span class="dark-defulat" style="font-size:16px;">'+ item.message + "</span>"+' </h4></div>' 
            }
          });

        const chatmessage = document.querySelector('.chatbox__messages div');
        let chatwait = document.querySelector('.chatbox__messages p')
        
        if (chatmessage.innerHTML != html){
            chatwait.style = "display:block"
            chatwait.innerHTML = '<img src="https://private-user-images.githubusercontent.com/76871038/289192671-f21addf0-7774-4b54-bb73-fe9506b25589.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDIwNzA4MTgsIm5iZiI6MTcwMjA3MDUxOCwicGF0aCI6Ii83Njg3MTAzOC8yODkxOTI2NzEtZjIxYWRkZjAtNzc3NC00YjU0LWJiNzMtZmU5NTA2YjI1NTg5LmdpZj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzEyMDglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMxMjA4VDIxMjE1OFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWViNDc5NGE4YmM3NmNiY2NhMWQyZDk1Y2ViYzE4NmZlNzY0NGZlNmNmMjM1MzNlZWVmNzE5MGFhMjAxMWMxNWImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.7yv1Uv2MzYrt7IwWlOk2RdM1NEgxeuwUB4-OeKXXHiI" style="width:45px; border-radius: 2px;">'
           
        }
        
        await setTimeout(() => chatmessage.innerHTML = html ,2000)
        if (await setTimeout(() => chatmessage == html,2000)){
            await setTimeout(()=>chatwait.style = "display:none",2000)
            

        }

    }
    
    
}


const chatbox = new Chatbox();
chatbox.display();
chatbox.onSendButton();


