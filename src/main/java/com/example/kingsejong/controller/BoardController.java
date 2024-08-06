package com.example.kingsejong.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.kingsejong.entity.Board;
import com.example.kingsejong.service.BoardService;

import lombok.RequiredArgsConstructor;

//게시판 관련 controller이다.

@RestController // react와의 연동을 위해 Springboot에서 RESTful API(데이터를 응답으로 제공)를 사용해 데이터를 주고받는다. json으로
                // 데이터를 응답하는 것이다.
// springboot, thymeleaf을 통해 풀스택 어플리케이션을 만들었다면, restcontroller를 사용하지 않았을 것이다.
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE })
@RequestMapping("api/board") // 여기에서 미리 앤드포인트를 지정하면 좋다. 밑에서 굳이 엔드포인트를 지정할 필요가 없다.
public class BoardController {

    // service를 미리 정의한다.
    @Autowired
    private BoardService boardService;

    // 게시판 페이지에서, 리스트를 보여줄 때 모든 데이터를 가져오게 하는 함수.
    @GetMapping
    public List<Board> getAllBoard() {
        return boardService.getAllBoards();
    }

    // 헤당 아이디에 맞는 게시물을 가져오는 함수.
    @GetMapping("/{id}")
    public Board getBoardById(@PathVariable Long id) {
        return boardService.getBoardById(id);
    }

    // 글을 다 작성하고, 그 글을 저장소에 저장하는 함수
    @PostMapping
    public Board createBoard(@RequestBody Board board) {
        return boardService.createPost(board);
    }

    // 게시물 삭제를 위한 메서드. deletemapping을 쓴다.
    // pathvariable은 경로 변수를 표기하기 위해 메서드의 매개변수에 사용된다.
    @DeleteMapping("/{id}")
    public void deleteBoard(@PathVariable Long id) {
        boardService.deletePost(id);
    }

    // put 엔드포인트를 추가해서 게시글을 업데이트 한다.
    @PutMapping("/{id}")
    public Board updateBoard(@PathVariable Long id, @RequestBody Board updateBoard) {
        return boardService.updatePost(id, updateBoard);

    }
}
