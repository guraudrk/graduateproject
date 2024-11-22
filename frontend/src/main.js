import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './css/main.css';

// 이미지 URL을 지정하여 S3 기능을 쉽게 사용할 수 있습니다.
const imageurl = "https://aikingsejong.s3.ap-northeast-2.amazonaws.com/2013100715011489.jpg";

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // 페이지 로드 시 localStorage에서 사용자 아이디 가져오기
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) { // 가져온 아이디를 setCurrentUser에 저장
            setCurrentUser(storedUserId);
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            // 사용자 정보가 있을 때 필요한 추가 작업을 여기에 작성
        } else {
            // 사용자 정보가 없을 때 필요한 추가 작업을 여기에 작성
        }
    }, [currentUser]); // currentUser가 업데이트될 때마다 실행

    // 로그아웃 함수
    const handleLogout = () => {
        // 로그아웃 성공 시 localStorage에서 사용자 정보 제거
        localStorage.removeItem('userId');
        setCurrentUser(null); // currentUser를 null로 설정
    };

    return (
        <div>
            {/* 상단 회색 배경 */}
            <div className="top-section">
                {/* 현재 사용자가 로그인된 경우 환영 메시지 출력 */}
                {currentUser && (
                    <div>
                        <span>환영합니다. {currentUser}님!</span>
                    </div>
                )}
            </div>

            {/* 아래쪽 흰색 배경 */}
            <div className="bottom-section">
                {currentUser && (
                    <div className="ifLogined">
                        <Link to="/bulletinboard">게시판</Link>
                        <Link to="/chat">AI 세종대왕 사용</Link>
                        <Link to="/signup">회원가입</Link>
                        <Link onClick={handleLogout} to="/main">로그아웃</Link>
                    </div>
                )}
                {!currentUser && (
                    <div className="ifNotLogined">
                        <Link to="/chat">AI 세종대왕 사용</Link>
                        <Link to="/signup">회원가입</Link>
                        <Link to="/login">로그인</Link>
                    </div>
                )}
            </div>

            {/* 배경 이미지 */}
            <div className="background-image" style={{ backgroundImage: `url(${imageurl})` }}>
                {/* 이미지 위의 텍스트 및 버튼 */}
                <div className="text-container">
                    <h1>AI 세종대왕에 오신 것을 환영합니다!</h1>
                    <p>AI 세종대왕은 세종대왕님과 대화할 수 있는 서비스입니다.</p>
                    <p>세종대왕님에 대한 많은 정보를 얻어가세요!</p>
                    <button onClick={() => { window.location.href = "https://stremlit-chat-ilv4bn5rmirhgxcenbzzou.streamlit.app/"; }}>
                        Click Me
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
