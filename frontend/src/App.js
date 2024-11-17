import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './css/main.css';


//이미지 url을 이미지 지정해 두어야, s3 기능을 쉽게 사용할 수 있다.
const imageurl = "https://aikingsejong.s3.ap-northeast-2.amazonaws.com/2013100715011489.jpg";


function App() {





    const [currentUser,setCurrentUser] = useState(null);
        useEffect(() => {
   
          //페이지 로드 시 localStorage에서 사용자 아이디 가져오기
          const storedUserId = localStorage.getItem('userId');
          if (storedUserId) { //가져온 아이디를 setCurrentUser에 저장한다.
            setCurrentUser(storedUserId);
          }
    
    }, []);
    useEffect(() => {
      if (currentUser) {
         
      } else {
      }
  }, [currentUser]);// currentUser가 업데이트 될 때마다 실행
    //fetch를 사용해서 요청을 보낸다. 간단한 http 요청을 보내고 응답을 처리하는 데 사용할 수 있다.
  
  

    //로그아웃을 할 때 쓰는 함수.
    const handleLogout = () =>{

    
        //로그아웃 성공 시 localStorage에서 사용자 정보 제거
        localStorage.removeItem('userId');
        setCurrentUser(null); //currentuser를 null로 만든다.

  
    }


//메인 페이지에 들어가면, background image가 그냥 나타나는 것이 아니라 반응형으로 나타나게 하기.
//배경음도 넣으면 좋다.

    return (
      <div>
        {/* 상단 회색 배경 */}
        <div className="top-section">
          {/* 내용 */}
          {
            currentUser && (
               /*currentUser가 있을 경우에는 아래와 같은 것을 출력한다.*/              <div>
                <span>환영합니다. {currentUser}님!</span>
              </div>
            )
          }
        </div>

         {/* 아래쪽 흰색 배경
         이 부분에는 각 페이지로 이동할 수 있는 링크들이 존재한다. */}
         {/*로그인이 되었을 때 보여지는 항목들*/ }
         <div className="bottom-section">
          {currentUser &&(
            <div className="ifLogined">
              <Link to="/bulletinboard">게시판</Link>
              <Link to="/chat">AI 세종대왕 사용</Link>
              <Link to="/signup">회원가입</Link>
              <Link onClick={handleLogout} to="/main">로그아웃</Link> 

            </div>
          )}
          {/*로그아웃 되었을 때 보여지는 항목들*/ }
          {!currentUser&&(
            <div className="ifNotLogined">
              <Link to="/chat">AI 세종대왕 사용</Link>
              <Link to="/signup">회원가입</Link>
              <Link to="/login">로그인</Link>
              </div>
          )}
        </div>

        {/* 배경 이미지 ----aws s3를 이용해서 이미지를 불러모은다.*/}
        <div className="background-image" style={{backgroundImage: `url(${imageurl})`}}>        {/* 이미지 위의 텍스트 및 버튼 */}
        <div className="text-container">
          <h1>AI 세종대왕에 오신 것을 환영합니다!</h1>
          <p>AI 세종대왕은 세종대왕님과 대화할 수 있는 서비스입니다.</p>
          <p>세종대왕님에 대한 많은 정보를 얻어가세요!</p>
          <button onClick={() => { window.location.href = "/chat"; }}>
  Click Me
</button>
          
        </div>
      </div>


      </div>
    );
  }
  
  export default App;