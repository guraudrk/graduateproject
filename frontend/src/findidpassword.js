import axios from "axios";
import { useState } from 'react';
import './css/findidpassword.css';

const imageurl = "https://aikingsejong.s3.ap-northeast-2.amazonaws.com/0628_1-1.jpg";

function App() {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [idMessage, setIdMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const handleIdSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/findid', { // 절대 경로 -> 상대 경로
        params: { email: email }
      });
      setIdMessage(response.data);
    } catch (error) {
      setErrorMessage("이메일을 찾는 동안 오류가 발생했습니다.");
      console.log(errorMessage);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/findpassword', { // 절대 경로 -> 상대 경로
        params: { userId: userId }
      });
      setPasswordMessage(response.data);
    } catch (error) {
      setErrorMessage("아이디를 찾는 동안 오류가 발생했습니다.");
      console.log(errorMessage);
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <div className="logo-container">
          <a href="/main">
            <img className="findidpasswordlogo" src="https://aikingsejong.s3.ap-northeast-2.amazonaws.com/aikingsejonglogo.png" alt="로고" />
          </a>
        </div>
        <form>
          <span className="findidpasswordtext">아이디/비밀번호찾기</span>
          <input className="typeemail" type="text" placeholder="이메일 주소를 입력해주세요" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="findemail" type="submit" onClick={handleIdSubmit}>아이디 찾기</button>
          <span className={idMessage === "아이디 값을 찾을 수 없습니다." ? "red-text" : "green-text"}>{idMessage}</span>
          <input className="typeid" type="text" placeholder="아이디를 입력해주세요." value={userId} onChange={(e) => setUserId(e.target.value)} />
          <button className="findidpassword" type="submit" onClick={handlePasswordSubmit}>비밀번호 찾기</button>
          <span className={passwordMessage === "비밀번호 값을 찾을 수 없습니다." ? "red-text" : "green-text"}>{passwordMessage}</span>
          <a href="/main" className="gotomain">메인 페이지로 돌아가시려면 여기를 클릭해주세요.</a>
        </form>
      </div>
      <div className="right-section" style={{ backgroundImage: `url(${imageurl})` }}></div>
    </div>
  );
}

export default App;
