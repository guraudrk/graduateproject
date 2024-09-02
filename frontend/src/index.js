import 'bootstrap/dist/css/bootstrap.min.css';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Aikingsejong from './aikingsejong';
import App from './App';
import BoardDetail from './BoardDetail';
import BoardList from './BoardList';
import Chat from './chat'; // 이 라인을 추가하세요.
import Findidpassword from './findidpassword';
import Login from './login';
import Main from './main';
import Signup from './signup';
import WriteBoard from './WriteBoard';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/findidpassword" element={<Findidpassword />} />
        <Route path="/bulletinboard" element={<BoardList />} />
        <Route path="/writeBoard" element={<WriteBoard />} />
        <Route path="/post/:id" element={<BoardDetail />} />
        <Route path="/aikingsejong" element={<Aikingsejong />} />
        <Route path="/chat" element={<Chat />} /> {/* 이 라인을 추가하세요. */}
      </Routes>
    </Router>
  </StrictMode>
);