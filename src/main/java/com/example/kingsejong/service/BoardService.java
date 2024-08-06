package com.example.kingsejong.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.kingsejong.entity.Board;
import com.example.kingsejong.repository.BoardRepository;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardrepository;

    // 모든 boards를 찾는 코드. list를 정의한다.
    public List<Board> getAllBoards() {
        return boardrepository.findAll();
    }

    public Board getBoardById(Long id) {

        // 아이디를 찾고 찾지 못하면 null 반환.
        return boardrepository.findById(id).orElse(null);
    }

    // 작성한 게시물을 저장하는 service.
    public Board createPost(Board board) {
        return boardrepository.save(board);
    }

    public void deletePost(Long id) {
        boardrepository.deleteById(id);
    }

    // 게시물 수정에 대한 service 코드이다.
    public Board updatePost(Long id, Board updatedBoard) {
        Board board = boardrepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid board Id:" + id));
        board.setTitle(updatedBoard.getTitle()); // board의 entity에서 data어노테이션을 통해 getter,setter를 설정할 필요가 없어졌다.
        board.setContent(updatedBoard.getContent());
        board.setCreatedDate(LocalDateTime.now()); // 수정 날짜를 현재 시간으로 설정
        return boardrepository.save(board);
    }

}
