import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/WriteBoard.css';

const imageurl = "https://aikingsejong.s3.ap-northeast-2.amazonaws.com/360_F_519688679_DSpUecF3DU21l86EnlgCijX8A4zGZg4Q.jpg";

function WriteBoard() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      alert("로그인되지 않았습니다. 글쓰기 기능을 이용하시려면 로그인해주세요.");
      navigate("/main");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/board', { title, content, userId }) // 절대 경로 -> 상대 경로
      .then(() => {
        alert('게시글을 작성했습니다.');
        navigate('/bulletinboard');
      })
      .catch(error => {
        console.error('게시글을 작성하는 데에 오류가 발생했습니다.', error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUserId(null);
    navigate('/main');
  };

  return (
    <div className="background-image" style={{ backgroundImage: `url(${imageurl})` }}>
      <div className="top-section">
        {userId && (
          <span>환영합니다.{userId}님!</span>
        )}
      </div>
      <div className="bottom-section">
        {userId && (
          <div className="ifLogined">
            <Link to="/aikingsejong">AI 세종대왕 사용</Link>
            <Link onClick={handleLogout} to="/main">로그아웃</Link>
            <Link to="/main">메인 페이지로 이동</Link>
            <Link to="/bulletinboard">게시판 페이지로 이동</Link>
          </div>
        )}
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default WriteBoard;
