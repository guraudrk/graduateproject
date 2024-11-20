import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/login.css';

const imageurl = "https://aikingsejong.s3.ap-northeast-2.amazonaws.com/urbanbrush-20220920114229006134.jpg";

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = JSON.stringify({
      userId: id,
      password: password
    });

    axios.post('/api/login', requestData, { // 절대 경로 -> 상대 경로
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      alert("로그인이 완료되었습니다.");
      localStorage.setItem('userId', id);
      navigate('/main');
    })
    .catch(error => {
      console.error("Error logging in:", error);
      alert("로그인 실패. 아이디 또는 비밀번호를 다시 확인해주세요.");
    });
  };

  return (
    <div className="container">
      <div className="left-section">
        <div className="logo-container">
          <a href="/main">
            <img className="loginlogo" src="https://aikingsejong.s3.ap-northeast-2.amazonaws.com/aikingsejonglogo.png" alt="로고" />
          </a>
        </div>
        <form onSubmit={handleSubmit}>
          <span className="logintext">로그인</span>
          <input className="form-element1" type="text" placeholder="아이디를 입력해주세요." value={id} onChange={(e) => setId(e.target.value)} />
          <input className="form-element2" type="password" placeholder="비밀번호를 입력해주세요." value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="form-element3" type="submit">로그인</button>
          <a href="/signup" className="gotosignup">계정이 없으시면 회원가입을 해주세요.</a>
        </form>
      </div>
      <div className="right-section" style={{ backgroundImage: `url(${imageurl})` }}></div>
    </div>
  );
}

export default Login;
