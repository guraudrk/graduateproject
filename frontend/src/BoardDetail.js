import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './css/BoardDetail.css';
// 이미지 URL 지정
const imageurl = "https://aikingsejong.s3.ap-northeast-2.amazonaws.com/360_F_519688679_DSpUecF3DU21l86EnlgCijX8A4zGZg4Q.jpg";

function BoardDetail() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setCurrentUserId(storedUserId);
    } else {
      alert("로그인하지 않으면 게시물 조회를 할 수 없습니다. 로그인해주세요.");
      navigate("/main");
    }

    // 절대 경로를 상대 경로로 변경
    axios.get(`/api/board/${id}`)
      .then(response => {
        setBoard(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch(error => {
        console.error("게시글을 조회하는데 오류가 생겼습니다.", error);
      });
  }, [id, navigate]);

  const handleDelete = () => {
    // 절대 경로를 상대 경로로 변경
    axios.delete(`/api/board/${id}`)
      .then(() => {
        alert("게시물 삭제가 완료되었습니다.");
        navigate('/bulletinboard');
      })
      .catch(error => {
        console.error("게시글을 삭제하는데 오류가 생겼습니다.", error);
        alert("게시글을 삭제하는데 오류가 생겼습니다.");
      });
  };

  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 절대 경로를 상대 경로로 변경
    axios.put(
      `/api/board/${id}`,
      { title, content },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true // 인증 정보 포함
      }
    )
      .then(() => {
        alert('게시글이 수정되었습니다.');
        setIsEditing(false);
        navigate(`/post/${id}`);
      })
      .catch(error => {
        alert('게시글을 수정하는 데에 오류가 발생했습니다.', error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setCurrentUserId(null);
  };

  if (!board) return <div>로딩중입니다....</div>;

  return (
    <div className="background-image" style={{ backgroundImage: `url(${imageurl})` }}>
      <div className="top-section">
        {currentUserId && (
          <span>환영합니다.{currentUserId}님!</span>
        )}
      </div>

      <div className="bottom-section">
        {currentUserId && (
          <div className="ifLogined">
            <Link to="/chat">AI 세종대왕 사용</Link>
            <Link onClick={handleLogout} to="/main">로그아웃</Link>
            <Link to="/main">메인 페이지로 이동</Link>
            <Link to="/bulletinboard">게시판 페이지로 이동</Link>
          </div>
        )}
      </div>
      <div className="write-post-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              제목:
              <input className="titletext"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                readOnly={!isEditing}
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
                readOnly={!isEditing}
                required
              />
            </label>
            <small className="Board-Detail-Date">{new Date(board.createdDate).toLocaleString()} by {board.userId}</small>
          </div>
          {currentUserId === board.userId && (
            <div className="button-container">
              <button type="button" onClick={handleDelete} className="delete-button">삭제</button>
              {!isEditing && <button type="button" onClick={handleUpdate} className="update-button">수정</button>}
              {isEditing && <button type="submit" className="submit-button">제출</button>}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default BoardDetail;
