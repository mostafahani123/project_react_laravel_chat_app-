
import {useEffect, useState} from "react";
import Pusher from "pusher-js";
function App() {
  const [username, setUsername] = useState('username');
 const [messages, setMessages] = useState([]);
 const [message, setMessage] = useState('');
 let allMessages = [];
  useEffect( ()=>{
// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

const pusher = new Pusher('df55daaf66252a97005d', {
  cluster: 'eu'
});

const channel = pusher.subscribe('chat');
channel.bind('message', function(data) {
  allMessages.push(data);
  setMessages(allMessages);
});
  },[]);
  const submit =  async e => {
e.preventDefault();
await fetch('http://localhost:8000/api/messages', {
  method: 'POST',
  headers: {'Content-type': 'application/json'},
  body: JSON.stringify({
    username,
    message
  })
});
setMessage();
  }
 return (
    <div className="container">
    <div class="list-group list-group-flush border-bottom scrollarea">
       <div className="mb-1 container my-5">
       
       <input className="fs-5 fw-semibold" value={username} onChange={e => setUsername(e.target.value)}/>
      </div>
      <div 
      className="list-group-item list-group-item-action py-3 lh-tight">
        {messages.map(message => {
          return (
            <div>
            <div 
            className="d-flex w-100 align-items-center justify-content-between">
            <strong className="mb-1">{message.username}</strong>
           
            
            
             <div className="col-10 mb-1 small">{message.message}</div>
             </div>
             </div>
          )
        })}
          
          </div>

    </div>
    <form onSubmit={e => submit(e)}>
<input className="form-control" placeholder="write a message" value={message}
    onChange={e => setMessage(e.target.value)}/>
    </form>
    </div>
  );
}

export default App;
