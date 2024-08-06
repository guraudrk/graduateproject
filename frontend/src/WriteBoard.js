import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/WriteBoard.css';


//이미지 url을 이미지 저장해 두어야, s3 기능을 쉽게 사용할 수 있다.
const imageurl = "https://aikingsejong.s3.ap-northeast-2.amazonaws.com/360_F_519688679_DSpUecF3DU21l86EnlgCijX8A4zGZg4Q.jpg"

function WriteBoard(){

const [title,setTitle] = useState('');
const [content,setContent] = useState('');
const [userId, setUserId] = useState(null);
const navigate = useNavigate();

useEffect(() => {
 
  //localstorage에 저장된 아이디를 불러온다.
  const storedUserId = localStorage.getItem('userId');

 //만약 localstorage에 아이디가 있다면 setuserId에 이를 저장한다.
 if(storedUserId){
  setUserId(storedUserId)
  //setuserId로 아이디를 설정한다. 이는 상단 메뉴에서 내 아이디를 보여줄 때 사용한다.
}
else{
  //만약 아이디가 없다면 alert을 통해 로그인하지 않았음을 알려주고 메인 페이지로 이동시킨다.
  alert("로그인되지 않았습니다. 글쓰기 기능을 이용하시려면 로그인해주세요.");
  navigate("/main");
}

}, []);

const handleSubmit = (e) => {
  e.preventDefault();
  axios.post('http://localhost:8080/api/board', { title, content, userId })
  .then(() => {
      alert('게시글을 작성했습니다.');
      navigate('/bulletinboard');  //게시글 페이지로 이동한다.
  })
  .catch(error => {
      console.error('게시글을 작성하는 데에 오류가 발생했습니다.', error);
  });
};

const handleLogout = () =>{
  localStorage.removeItem('userId');
  setUserId(null); //setUserId를 null로 만든다. 이것까지 해야 완벽하게 로그아웃을 했다고 볼 수 있다.
  navigate('/main');
}

return (
   //가장 위의 div에 backgroundimage를 설정해야 배경 이미지가 페이지 전체를 커버할 수 있다.
<div className="background-image" style={{backgroundImage: `url(${imageurl})`}}>
   
<div className="top-section">
    {/*상단 회색 배경*/ }
    {
      userId &&(
        /*userId가 있을 경우에는 아래와 같은 것을 출력한다.
        
        참고로 div는 공간을 나눌 때 쓰이고, span은 길이를 가늠할 수 없을 때 쓰인다.*/
        <span>환영합니다.{userId}님!</span>
      )
    }
  </div>

  <div className="bottom-section">
    {/*로그인 되었을 때 보여지는 항목들.*/}
    {
      userId &&(
        
        <div className="ifLogined">
          <Link to="/aikingsejong">AI 세종대왕 사용</Link>
          <Link onClick={handleLogout} to="/main">로그아웃</Link>
          <Link to="/main">메인 페이지로 이동</Link>
          <Link to="/bulletinboard">게시판 페이지로 이동</Link>
          </div>
      )
    }
  </div>
   
    <div className="write-post-container">
      <h1>글 쓰기</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            제목:
            <input className="titletext"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            내용:
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="15"
              required
            />
          </label>
        </div>
        <div className="submit-button-container">
        <button type="submit" className="submit-button">제출</button>
      </div>      </form>
    </div>
    </div>
);
};

export default WriteBoard;