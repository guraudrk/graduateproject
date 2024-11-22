import React, { useEffect } from 'react';
function Chat() {
  useEffect(() => {
    window.location.replace("https://stremlit-chat-ilv4bn5rmirhgxcenbzzou.streamlit.app/");
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontSize: '48px' }}>AI세종대왕으로 이동중...</p>
    </div>
  );
}

export default Chat;
