import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/BoardList.css';
//이미지 url을 이미지 저장해 두어야, s3 기능을 쉽게 사용할 수 있다.
const imageurl = "https://aikingsejong.s3.ap-northeast-2.amazonaws.com/360_F_519688679_DSpUecF3DU21l86EnlgCijX8A4zGZg4Q.jpg"
function BoardList(){

    //리스트를 받을 것이기 때문에, useState도 list이다.
    const [data,setdatas] = useState([]);

    //로그인된 아이디를 받는다.
    const [userId,setuserId] = useState([]);

    //navigate을 위한 변수를 저장한다.
    const navigate = useNavigate();



    useEffect(()=>{


      //페이지 로드 시, localstorage에서 사용자 아이디를 가져온다.
      const storedUserId = localStorage.getItem('userId');


      //만약 localstorage에 아이디가 있다면 setuserId에 이를 저장한다.
      if(storedUserId){
        setuserId(storedUserId)
        //setuserId로 아이디를 설정한다. 이는 상단 메뉴에서 내 아이디를 보여줄 때 사용한다.
      }
      else{
        //만약 아이디가 없다면 alert을 통해 로그인하지 않았음을 알려주고 메인 페이지로 이동시킨다.
        alert("로그인되지 않았습니다. 게시판 기능을 이용하시려면 로그인해주세요.");
        navigate("/main");
      }
      
      //axios를 통해 백엔드에서 게시판 관련 정보를 받아온다.
        axios.get('/api/board')
        .then(response=>{
            setdatas(response.data); //응답받은 데이터를 토대로 data를 set 한다.
            //여기서 받아온 데이터를 토대로 게시판들을 보여주는 것이다.
        })
        .catch(error=>{
            console.error("게시판 정보를 불러오는 데 오류가 발생했습니다.",error);
        });

        // 페이지가 로드될 때 fade-in 클래스를 추가
        document.body.classList.add('fade-in');
    },[]);

    //로그아웃 시 작동하는 함수
    const handleLogout = ()=> {

      //로그아웃 성공 시 localStorage에서 아이디 제거
      localStorage.removeItem('userId');
      setuserId(null); //setuserId를 null로 만든다. 이것까지 해야 완벽하게 로그아웃을 했다고 볼 수 있다.
    }

    return (
    
    //가장 위의 div에 backgroundimage를 설정해야 배경 이미지가 페이지 전체를 커버할 수 있다.
<div className="background-image" style={{backgroundImage: `url(${imageurl})`}}>        {/* 이미지 위의 텍스트 및 버튼 */}
  
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
    {/*로그인 되었을 때 보여지는 항목들*/}
    {
      userId &&(
        <div className="ifLogined">
          <Link to="/chat">AI 세종대왕 사용</Link>
          <Link onClick={handleLogout} to="/main">로그아웃</Link>
          <Link to="/main">메인 페이지로 이동</Link>
          </div>
      )
    }
  </div>
        <div className="board-list-container">
        <h1 className="boardListTitle">게시판</h1>
        <ul className="board-list">
          {data.map(boardData => (
            <li key={boardData.id} className="board-list-item">
              <Link to={`/post/${boardData.id}`} className="board-list-link">
                <h2>{boardData.title}</h2>
                <p>{boardData.content.slice(0, 100)}...</p>
                <small>{new Date(boardData.createdDate).toLocaleString()}</small>
              </Link>
            </li>
          ))}
        </ul>
    <Link to="/writeBoard" className="write-link">글쓰기</Link>
      </div>
      </div>
    );
};

export default BoardList;