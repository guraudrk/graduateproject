import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import CONFIG from '../src/config';
import './css/main.css';

// 이미지 URL을 지정하여 S3 기능을 쉽게 사용할 수 있습니다.
const imageurl = "https://aikingsejong.s3.ap-northeast-2.amazonaws.com/2013100715011489.jpg";

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [idMessage, setIdMessage] = useState(""); // 아이디를 백엔드에서 담아온다.
    const [passwordMessage, setPasswordMessage] = useState(""); // 비밀번호를 백엔드에서 담아온다.

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

    // 아이디 찾기 함수
    const handleIdSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${CONFIG.API_URL}/api/findid`, {
                params: { // 프론트에서 데이터를 보낼 때, params에 매개변수를 올바르게 담아야 한다. 그렇지 않으면 오류가 난다.
                    email: email
                }
            });
            setIdMessage(response.data);
        } catch (error) {
            setErrorMessage("이메일을 찾는 동안 오류가 발생했습니다.");
            console.log(error);
        }
    };

    // 비밀번호 찾기 함수
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${CONFIG.API_URL}/api/findpassword`, {
                params: {
                    userId: userId
                }
            });
            setPasswordMessage(response.data);
        } catch (error) {
            setErrorMessage("아이디를 찾는 동안 오류가 발생했습니다.");
            console.log(error);
        }
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

            {/* 아이디/비밀번호 찾기 섹션 */}
            <div className="find-section">
                <form>
                    <span className="findidpasswordtext">아이디/비밀번호찾기</span>
                    <span className="findidpasswordtext1">아이디/비밀번호를 잊어버리셨다면, 이메일/아이디를 입력해서 아이디/비밀번호를 다시 찾으세요.</span>
                    <input className="typeemail" type="text" placeholder="이메일 주소를 입력해주세요" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button className="findemail" type="submit" onClick={handleIdSubmit}>아이디 찾기</button>
                    <span className={idMessage === "아이디 값을 찾을 수 없습니다." ? "red-text" : "green-text"}>{idMessage}</span>
                    <input className="typeid" type="text" placeholder="아이디를 입력해주세요." value={userId} onChange={(e) => setUserId(e.target.value)} />
                    <button className="findidpassword" type="submit" onClick={handlePasswordSubmit}>비밀번호 찾기</button>
                    <span className={passwordMessage === "비밀번호 값을 찾을 수 없습니다." ? "red-text" : "green-text"}>{passwordMessage}</span>
                    <a href="/main" className="gotomain">메인 페이지로 돌아가시려면 여기를 클릭해주세요.</a>
                </form>
            </div>
        </div>
    );
}

export default App;
