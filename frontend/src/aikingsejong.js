import axios from 'axios';
import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post('http://localhost:5000/aikingsejong', { message: input });
      console.log('Server response:', result.data);  // 로그 추가
      setResponse(result.data.response);  // 서버 응답에서 'response' 필드 사용
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h1>Chat with AI</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here"
        />
        <button type="submit">Send</button>
      </form>
      <div>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;