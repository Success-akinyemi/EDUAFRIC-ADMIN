import React, { useState } from 'react';
import io from 'socket.io-client';

function Chat() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState([]);
    const socket = io('http://localhost:9000');  // Adjust to match the actual server URL

    // Send a message to the server when clicking "Send"
    const sendMessage = () => {
        socket.emit('aiChat', { user: true, message });
    };

    // Listen for AI responses from the server
    socket.on('aiChatResponse', (data) => {
        setResponse(data.msg);
        console.log('AI Response:', data.msg);
    });

    return (
        <div className='flex items-center flex-col justify-center w-[100vw] h-[100vh]' >
            <input 
                type="text" 
                placeholder="Type your message" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
            />
            <button onClick={sendMessage}>Send</button>
            <div className='w-[50%] flex flex-col gap-3 '>
                <h4>AI Response:</h4>
                <div className='flex flex-col gap-12 w-full h-[300px] overflow-y-auto'>
                    {response?.map((msg) => (
                        <p className={`${msg?.role === 'user' ? 'ml-auto' : 'mr-auto'}`}>
                            {msg?.chat}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Chat;
