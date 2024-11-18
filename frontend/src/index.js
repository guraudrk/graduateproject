import 'bootstrap/dist/css/bootstrap.min.css';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Aikingsejong from './aikingsejong';
import App from './App';
import BoardDetail from './BoardDetail';
import BoardList from './BoardList';
import Chat from './chat'; 
import Findidpassword from './findidpassword';
import Login from './login';
import Main from './main';
import Signup from './signup';
import WriteBoard from './WriteBoard';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Router basename="/">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/findidpassword" element={<Findidpassword />} />
        <Route path="/bulletinboard" element={<BoardList />} />
        <Route path="/writeBoard" element={<WriteBoard />} />
        <Route path="/post/:id" element={<BoardDetail />} />
        <Route path="/aikingsejong" element={<Aikingsejong />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<App />} /> {/* 404를 처리하기 위해 마지막에 위치 */}
      </Routes>
    </Router>
  </StrictMode>
);
