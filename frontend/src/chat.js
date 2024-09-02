import React from 'react';

function Chat() {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <iframe
        src="https://stremlit-chat-5bb5erxggymdbmds98pjid.streamlit.app" // 실제 Streamlit 앱 URL로 수정
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="AI세종대왕"
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  );
}

export default Chat;