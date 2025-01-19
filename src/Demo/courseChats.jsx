import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:9000/general', {
  transports: ['websocket'],
  withCredentials: true,
});

socket.on('connect_error', (err) => {
  console.error('Socket connection error:', err.message);
});

function CourseChat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    const data = { courseSlug: 'AFRICVSIGZW', message: message };
    socket.emit('courseGroupChat', data)
  }
  
  useEffect(() => {
    socket.on('courseGroupChat', (data) => {
      console.log('Status Updated:', data);
      if(data?.success){
        setMessages(data?.data)
      } else {
        console.log(data?.data)
        alert(data.data);
      }
    });
  }, [])

  return (
    <div className='flex items-center justify-center flex-col gap-4'>

      <div className="flex items-center justify-center flex-col gap-4 w-[50%]">
        <h1>Course Chat Send Message</h1>
        <input type="text" className='input' value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>send chat</button>
      </div>

        <div>
            {messages?.map((msg, i) => (
                <div key={i}>
                    <p>{msg?.message}</p>
                    <small>{msg?.studentName || msg?.instructorName}</small>
                </div>
            ))}
        </div>

    </div>
  );
}

export default CourseChat;
