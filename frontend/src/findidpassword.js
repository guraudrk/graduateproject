import axios from "axios";
import { useState } from 'react';
import './css/findidpassword.css';


const imageurl = "https://aikingsejong.s3.ap-northeast-2.amazonaws.com/0628_1-1.jpg";


function App() {





  const [email,setEmail] = useState("");
  const [userId,setUserId] = useState("");
  const [errorMessage,setErrorMessage] = useState("");
  const [idMessage,setIdMessage] = useState(""); //아이디를 백엔드에서 담아온다.
  const [passwordMessage,setPasswordMessage] = useState(""); //비밀번호를 백엔드에서 담아온다.

  //이메일을 입력할 때 작동하는 함수.
  //아이디,비밀번호를 찾는 함수에서는 버튼을 클릭하면 결과가 나오게 한다.
   const handleIdSubmit = async(e)=>{

    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:8080/api/findid", {
        params: { //프론트에서 데이터를 보낼 때, params에 매개변수를 올바르게 담아야 한다. 그렇지 않으면 오류가 난다.
          email: email
        }
      });
      setIdMessage(response.data);
    } catch (error) {
      setErrorMessage("이메일을 찾는 동안 오류가 발생했습니다.");
      console.log(errorMessage);
    }
    }
      
    

    const handlePasswordSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.get("http://localhost:8080/api/findpassword", {
          params: { 
            userId: userId
          }
        });
        setPasswordMessage(response.data);
      } catch (error) {
        setErrorMessage("아이디를 찾는 동안 오류가 발생했습니다.");
        console.log(errorMessage);
      }
    }
   
//메인 페이지에 들어가면, background image가 그냥 나타나는 것이 아니라 반응형으로 나타나게 하기.
//배경음도 넣으면 좋다.

    return (
        <div className="container">
        <div className="left-section">
          <div className="logo-container"> {/* div로 감싼 다음, 그 안에 img,span을 넣는다.*/ }
          {/* a로 감싼 다음, img를 설정하면 img를 클릭 시 다른 사이트로 이동할 수 있게 해준다.*/ }
          <a href="/main">
          <img className="findidpasswordlogo" src="https://aikingsejong.s3.ap-northeast-2.amazonaws.com/aikingsejonglogo.png" alt="로고" />
          </a>
  
          </div>
          
          
          <form>
            <span className="findidpasswordtext">아이디/비밀번호찾기</span>
            <span className="findidpasswordtext1">아이디/비밀번호를 잊어버리셨다면, 이메일/아이디를 입력해서 아이디/비밀번호를 다시 찾으세요.</span>
            <input  className="typeemail" type="text" placeholder="이메일 주소를 입력해주세요" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <button  className="findemail" type="submit" onClick={handleIdSubmit}>아이디 찾기</button>
            <span className={idMessage==="아이디 값을 찾을 수 없습니다."? "red-text":"green-text"}>{idMessage}</span>
            <input  className="typeid" type="text" placeholder="아이디를 입력해주세요." value={userId} onChange={(e)=>setUserId(e.target.value)} />
            <button  className="findidpassword" type="submit"onClick={handlePasswordSubmit}>비밀번호 찾기</button>
            <span className={passwordMessage ==="비밀번호 값을 찾을 수 없습니다."? "red-text":"green-text"}>{passwordMessage}</span>
          <a href="/main" className="gotomain">메인 페이지로 돌아가시려면 여기를 클릭해주세요.</a>
          </form>
        </div>
        <div className="right-section" style={{backgroundImage: `url(${imageurl})`}}></div>
      </div>
    );
  }
  
  export default App;