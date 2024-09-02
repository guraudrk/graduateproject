import React, { useEffect } from 'react';

function Chat() {
  useEffect(() => {
    // 브라우저의 히스토리에 'chat' 페이지를 추가하지 않고 리디렉션(replace를 활용한다.)
    window.location.replace("https://stremlit-chat-9ny6puwiytdlejhikqq4wg.streamlit.app/");
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* 로딩 중 메시지 */}
      <p style={{ fontSize: '48px' }}>AI세종대왕으로 이동중...</p>
    </div>
  );
}

export default Chat;