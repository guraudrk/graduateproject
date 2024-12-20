import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CONFIG from '../src/config';
import './css/signup.css';

const imageurl = "https://aikingsejong.s3.ap-northeast-2.amazonaws.com/0628_1-1.jpg";

function Signup() {
  const navigate = useNavigate();
  
    const [email,setEmail] = useState(''); //usestate을 통해 컴포넌트에서 바뀌는 값을 관리할 수 있다.
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [idMessage, setIdMessage] = useState('');
    const [passwordMatchMessage, setPasswordMatchMessage] = useState('');
    const [isValid, setIsValid] = useState(false);

    //useEffect를 사용해 이메일,아이디, 비밀번호 로직을 짜는 것은 상당히 새로우니 코드를 잘 파악하자.
    useEffect(() => {
      const fetchData = async () => {
        try {
          // 이메일 중복 체크
          if (email !== "") {
            try {
              //이메일 주소를 백엔드에 보낸다.
              const response = await axios.get(`${CONFIG.API_URL}/api/checkemail`, {
                params: { email: email } // 쿼리 파라미터로 email을 전달
              });
              const message = response.data.message; //백엔드에서 보내준 data를 받는다.
              
              if (message === "이미 존재하는 이메일입니다.") {
                setEmailMessage("이미 존재하는 이메일입니다.");
              } else if (message === "사용 가능한 이메일입니다.") {
                setEmailMessage("사용 가능한 이메일입니다.");
              } 
                // HTTP 에러 코드에 따라 적절한 처리
               else if (response.status === 400) {
                  setEmailMessage("올바르지 않은 요청입니다.");
                } else {
                  setEmailMessage("서버 오류가 발생했습니다.");
                }
            }
             catch (error) {
              console.error("Error checking email:", error);
            }
          }

      // 아이디 중복 체크
      if (id !== "") {
        try {
          const idResponse = await axios.get(`${CONFIG.API_URL}/api/checkid`,{
            params : {id:id} //param으로 아이디를 전달
          }
          );
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

      //비밀번호 길이 검사
      if(password.length<10){
        setPasswordMatchMessage("비밀번호는 10자 이상이어야 합니다.");
      }else{
        //비밀번호 길이가 충분하면 메시지 초기화
        setPasswordMatchMessage("");
      }

      // 비밀번호 일치 여부 확인
      //비밀번호 길이 제한이 있어서 로직이 약간 복잡하다.
      if (password !== "" && passwordConfirm !== "") {
        if (password === passwordConfirm && password.length>=10) {
          setPasswordMatchMessage("비밀번호와 비밀번호 확인이 일치합니다.");
        } else if(password === passwordConfirm &&password.length<10){
          setPasswordMatchMessage("비밀번호는 10자 이상이어야 합니다.");
        }
        else if(password !== passwordConfirm &&password.length>=10){
          setPasswordMatchMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        }
        else{
          setPasswordMatchMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        }
      }

      // 모든 조건을 만족하는지 확인
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

    //백엔드로 데이터를 보낼 때는 json을 문자열로 바꿔서 보내야 한다.
    const handleSubmit = (e) => {
      e.preventDefault();
      if (isValid) {
        // 회원가입 요청 보내기. 모든 조건이 만족될 때 요청을 보낸다고 할 수 있다.
        const requestData = JSON.stringify({
          userId:id,
          password:password,
          email:email
        });
        axios.post(`${CONFIG.API_URL}/api/signup`,requestData,{
          headers:{
            'Content-Type':'application/json'
          }
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
            <input  className="typeemail" type="email" placeholder="이메일 주소를 입력해주세요" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <span className={emailMessage === "이미 존재하는 이메일입니다." ? "red-text" : "green-text"}>{emailMessage}</span>
            <input  className="typesignupid" type="text" placeholder="아이디 입력" value={id} onChange={(e)=>setId(e.target.value)}/>
            <span className={idMessage === "이미 존재하는 아이디입니다." ? "red-text" : "green-text"}>{idMessage}</span>
            <input  className="typepassword" type="password" placeholder="비밀번호 입력(10자 이상)" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <input className="typepasswordconfirm" type="password"placeholder="비밀번호를 한번 더 입력해주세요." value={passwordConfirm} onChange={(e)=>setPasswordConfirm(e.target.value)}></input>
            <span className={passwordMatchMessage === "비밀번호와 비밀번호 확인이 일치합니다." ? "green-text" : "red-text"}>{passwordMatchMessage}</span>
            <button  className="signup" type="submit">회원가입</button>
          <a href="/findidpassword" className="gotosignup">아이디/비밀번호를 잊으셨다면 여기를 클릭해주세요.</a>
        </form>
      </div>
      <div className="right-section" style={{ backgroundImage: `url(${imageurl})` }}></div>
    </div>
  );
}

export default Signup;
