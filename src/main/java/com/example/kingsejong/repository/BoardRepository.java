package com.example.kingsejong.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.kingsejong.entity.Board;

public interface BoardRepository extends JpaRepository<Board, Long> {

    // 게시판에 대한 repository.
    // jpa는 인터페이스를 자동으로 구현해서 데이터베이스 작업을 처리한다.

}
