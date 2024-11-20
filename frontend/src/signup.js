import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/signup.css';

const imageurl = "https://aikingsejong.s3.ap-northeast-2.amazonaws.com/0628_1-1.jpg";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [idMessage, setIdMessage] = useState('');
  const [passwordMatchMessage, setPasswordMatchMessage] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email !== "") {
          try {
            const response = await axios.get('/api/checkemail', { // 절대 경로 -> 상대 경로
              params: { email: email }
            });
            const message = response.data.message;
            if (message === "이미 존재하는 이메일입니다.") {
              setEmailMessage("이미 존재하는 이메일입니다.");
            } else if (message === "사용 가능한 이메일입니다.") {
              setEmailMessage("사용 가능한 이메일입니다.");
            } else if (response.status === 400) {
              setEmailMessage("올바르지 않은 요청입니다.");
            } else {
              setEmailMessage("서버 오류가 발생했습니다.");
            }
          } catch (error) {
            console.error("Error checking email:", error);
          }
        }

        if (id !== "") {
          try {
            const idResponse = await axios.get('/api/checkid', { // 절대 경로 -> 상대 경로
              params: { id: id }
            });
            const idMessage = idResponse.data.message;
            if (idMessage === "이미 존재하는 아이디입니다.") {
              setIdMessage("이미 존재하는 아이디입니다.");
            } else {
              setIdMessage("사용 가능한 아이디입니다.");
            }
          } catch (error) {
            console.error("Error checking id:", error);
          }
        }

        if (password.length < 10) {
          setPasswordMatchMessage("비밀번호는 10자 이상이어야 합니다.");
        } else {
          setPasswordMatchMessage("");
        }

        if (password !== "" && passwordConfirm !== "") {
          if (password === passwordConfirm && password.length >= 10) {
            setPasswordMatchMessage("비밀번호와 비밀번호 확인이 일치합니다.");
          } else if (password !== passwordConfirm) {
            setPasswordMatchMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
          }
        }

        if (
          emailMessage === "사용 가능한 이메일입니다." &&
          idMessage === "사용 가능한 아이디입니다." &&
          passwordMatchMessage === "비밀번호와 비밀번호 확인이 일치합니다."
        ) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [email, id, password, passwordConfirm, emailMessage, idMessage, passwordMatchMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      const requestData = JSON.stringify({ userId: id, password: password, email: email });
      axios.post('/api/signup', requestData, { // 절대 경로 -> 상대 경로
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => {
          alert("회원가입이 완료되었습니다. 이제 세종대왕님과 즐거운 대화를 즐겨보세요:)");
          navigate('/main');
        })
        .catch(error => {
          console.error("Error signing up:", error);
          alert("회원가입을 할 수 없습니다.");
        });
    } else {
      alert("조건을 성립하지 못했습니다. 이메일 중복, 아이디 중복, 비밀번호 확인을 다시 한번 체크하세요.");
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <div className="logo-container">
          <a href="/main">
            <img className="signuplogo" src="https://aikingsejong.s3.ap-northeast-2.amazonaws.com/aikingsejonglogo.png" alt="로고" />
          </a>
        </div>
        <form onSubmit={handleSubmit}>
          <span className="signuptext">회원가입</span>
          <span className="signuptext1">회원가입을 하여 AI세종대왕 서비스를 이용해 보세요.</span>
          <input className="typeemail" type="email" placeholder="이메일 주소를 입력해주세요" value={email} onChange={(e) => setEmail(e.target.value)} />
          <span className={emailMessage === "이미 존재하는 이메일입니다." ? "red-text" : "green-text"}>{emailMessage}</span>
          <input className="typesignupid" type="text" placeholder="아이디 입력" value={id} onChange={(e) => setId(e.target.value)} />
          <span className={idMessage === "이미 존재하는 아이디입니다." ? "red-text" : "green-text"}>{idMessage}</span>
          <input className="typepassword" type="password" placeholder="비밀번호 입력(10자 이상)" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input className="typepasswordconfirm" type="password" placeholder="비밀번호를 한번 더 입력해주세요." value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
          <span className={passwordMatchMessage === "비밀번호와 비밀번호 확인이 일치합니다." ? "green-text" : "red-text"}>{passwordMatchMessage}</span>
          <button className="signup" type="submit">회원가입</button>
          <a href="/findidpassword" className="gotosignup">아이디/비밀번호를 잊으셨다면 여기를 클릭해주세요.</a>
        </form>
      </div>
      <div className="right-section" style={{ backgroundImage: `url(${imageurl})` }}></div>
    </div>
  );
}

export default Signup;
