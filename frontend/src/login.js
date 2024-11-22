import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CONFIG from '../src/config';
import './css/login.css';

const imageurl = "https://aikingsejong.s3.ap-northeast-2.amazonaws.com/urbanbrush-20220920114229006134.jpg";

function Login() {


    const navigate = useNavigate();

      //아이디를 설정하는 부분
      const [id,setId] = useState('');
      //비밀번호를 설정하는 부분
      const [password,setPassword] = useState('');

      

      //로그인 버튼을 누르면 동작하는 코드이다.
      const handleSubmit = (e) =>{
        e.preventDefault();

        const requestData = JSON.stringify(  //1.백엔드로 보낼 데이터를 json 문자열로 바꿔서 보내야 한다.
          {
            userId:id,
            password:password
          }
        );

        
          //2.데이터를 보낸다.
          axios.post("http://localhost:8080/api/login",requestData,{
            headers:{
              'Content-Type':'application/json'
            }
          })
          .then(response=>{
            //로그인 처리를 한다.
            alert("로그인이 완료되었습니다.");

           // 로그인 후 아이디를 저장하고 메인 페이지로 이동
           localStorage.setItem('userId', id); // 로컬 스토리지에 아이디 저장
            
            navigate('/main'); //로그인을 완료하면 navigate을 활용해 메인 페이지로 이동한다.
          })
        .catch(error=>{
          //에러가 났을 때 처리를 한다.
          console.error("Error logging in:",error);
          
          alert("로그인 실패. 아이디 또는 비밀번호를 다시 확인해주세요.");
        });
      
      }
   
    

  
      return (
        <div className="container">
      <div className="left-section">
        <div className="logo-container"> {/* div로 감싼 다음, 그 안에 img,span을 넣는다.*/ }
        {/* a로 감싼 다음, img를 설정하면 img를 클릭 시 다른 사이트로 이동할 수 있게 해준다.*/ }
        <a href="/main">
        <img className="loginlogo" src="https://aikingsejong.s3.ap-northeast-2.amazonaws.com/aikingsejonglogo.png" alt="로고" />
        </a>

        </div>
        
        
        <form onSubmit={handleSubmit}> 
          <span className="logintext">로그인</span>
          <span className="logintext1">서비스를 이용하시고 싶으시다면 로그인해주세요.</span>
          <input  className="form-element1" type="text" placeholder="아이디를 입력해주세요." value={id} onChange={(e)=>setId(e.target.value)}/> {/*아이디가 바뀜에 따라서 id 변수의 값을 바꾼다.*/ }
          <input  className="form-element2" type="password" placeholder="비밀번호를 입력해주세요." value={password} onChange={(e)=>setPassword(e.target.value)}/> {/*비밀번호가 바뀜에 따라서 비밀번호 변수의 값을 바꾼다.*/ }
          <button  className="form-element3" type="submit">로그인</button>
        <a href="/signup" className="gotosignup">계정이 없으시면 회원가입을 해주세요.</a>
        </form>
      </div>
      <div className="right-section" style={{backgroundImage: `url(${imageurl})`}}></div>
    </div>
      );
    }
  
    export default Login;