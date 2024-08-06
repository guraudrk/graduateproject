import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/signup.css';
const imageurl = "https://aikingsejong.s3.ap-northeast-2.amazonaws.com/0628_1-1.jpg";


function Signup() {


  //navigate을 이용해서 페이지를 이동시킨다.
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
              const response = await axios.get(`http://localhost:8080/api/checkemail`, {
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
          const idResponse = await axios.get(`http://localhost:8080/api/checkid`,{
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
          //dto의 데이터 형식에 맞게 데이터 변수명을 조정한다.
        });
        axios.post("http://localhost:8080/api/signup",requestData,{
          headers:{
            'Content-Type':'application/json'
          }
        })
        .then(response => {
          // 회원가입 성공
          //ResponseEntity.ok에서 대답을 잘 받으면 이 부분이 처리된다.
          alert("회원가입이 완료되었습니다. 이제 세종대왕님과 즐거운 대화를 즐겨보세요:)");
       //회원가입 완료 시 메인 페이지로 이동.
       navigate('/main');
       
        })
        .catch(error => {
          // 회원가입 실패
          console.error("Error signing up:", error);
          alert("회원가입을 할 수 없습니다.");
        });
      } else {
        alert("조건을 성립하지 못했습니다. 이메일 중복, 아이디 중복, 비밀번호 확인을 다시 한번 체크하세요.");
      }
      
    };

//메인 페이지에 들어가면, background image가 그냥 나타나는 것이 아니라 반응형으로 나타나게 하기.
//배경음도 넣으면 좋다.

    return (
        <div className="container">
        <div className="left-section">
          <div className="logo-container"> {/* div로 감싼 다음, 그 안에 img,span을 넣는다.*/ }
          {/* a로 감싼 다음, img를 설정하면 img를 클릭 시 다른 사이트로 이동할 수 있게 해준다.*/ }
          <a href="/main">
          <img className="signuplogo" src="https://aikingsejong.s3.ap-northeast-2.amazonaws.com/aikingsejonglogo.png" alt="로고" />
          </a>
  
          </div>
          
          
          <form onSubmit={handleSubmit}>
            <span className="signuptext">회원가입</span>
            <span className="signuptext1">회원가입을 하여 AI세종대왕 서비스를 이용해 보세요.</span>
            {/*
            1.먼저 클래스 이름(className)을 설정한다. 이는 css 스타일링을 위해 사용된다.
            2.type="email"은 입력 필드가 이메일 주소를 입력받는 것으로 지정한다. 브라우저는 이메일 형식의 입력을 검사해서 유효성을 확인할 수 있다.
            3.value={email}:입력 필드의 현재값으로 email 변수의 값을 설정한다. 
            4.onchange을 통해 필드의 값이 변경될 때마다 호출되게 한다. setEmail 함수를 활용해 email 변수에 업데이트한다.
            */}
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
        <div className="right-section" style={{backgroundImage: `url(${imageurl})`}}></div>
      </div>
    );
  }
  
  export default Signup;