package com.example.kingsejong.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.kingsejong.dto.UserDTO;
import com.example.kingsejong.dto.UserDTO.LoginRequest;
import com.example.kingsejong.entity.UserEntity;
import com.example.kingsejong.service.Userservice;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController // react와의 연동을 위해 Springboot에서 RESTful API(데이터를 응답으로 제공)를 사용해 데이터를 주고받는다. json으로
                // 데이터를 응답하는 것이다.
// springboot, thymeleaf을 통해 풀스택 어플리케이션을 만들었다면, restcontroller를 사용하지 않았을 것이다.
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class Controller {

    // service를 정의한다.
    private Userservice userservice;

    @Autowired
    public void userController(Userservice userservice) {
        this.userservice = userservice;
    }

    // 이메일 체킹.
    @GetMapping("/api/checkemail")
    public ResponseEntity<Map<String, String>> checkEmail(@RequestParam String email) { // 요청 바디에서 문자열을 받음

        // 이메일 체크 로직
        // json으로 통신하는 대신 단순 문자열로 통신하는 방법을 쓴다.
        String emailResult = userservice.emailCheck(email);
        Map<String, String> response = new HashMap<>();
        response.put("message", emailResult);
        return ResponseEntity.ok(response);
    }

    // 아이디 체킹.
    @GetMapping("/api/checkid")
    public ResponseEntity<Map<String, String>> checkId(@RequestParam String id) { // 요청 바디에서 문자열을 받는다.

        String idresult = userservice.idCheck(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", idresult);
        return ResponseEntity.ok(response);
    }

    // signup.js(회원가입)에서 handlesubmit을 실행시키면 동작하는 코드. postmapping을 사용해서 디비에 데이터를
    // 보낸다.
    @PostMapping("/api/signup")
    public ResponseEntity<String> signup(@RequestBody UserDTO userDTO) {
        try {
            // userEntity 초기화. 초기화하지 않으면 오류가 난다.
            // 표면적인 이유는 밑에서 userEntity를 사용하고자 하는데, 초기화가 안되어 있으면 NullPointerException이 발생하기
            // 때문이다.
            // entity가 결국 db과 직접적으로 데이터를 주고 받는 부분이기 때문이다.
            UserEntity userEntity = UserEntity.toUserEntity(userDTO);

            // userID가 null인 경우, 기본값 설정
            if (userEntity.getUserID() == null) {
                userEntity.setUserID("defaultUserID");
            }

            // 회원가입을 서비스 계층에 전달하여 처리
            userservice.save(userDTO);

            // 회원가입이 성공한 경우
            return ResponseEntity.ok("회원가입이 완료되었습니다.");

        } catch (Exception e) {
            e.printStackTrace();
            // 예외가 발생한 경우
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입을 처리하는 동안 오류가 발생했습니다.");
        }
    }

    @PostMapping("/api/login")
    // 프론트에서는 json 형식의 데이터를 전송하고 있기 때문에, 백엔드에서는 requestbody를 써야 한다.
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {

        String userId = loginRequest.getUserId();
        String password = loginRequest.getPassword();

        String result = userservice.login(userId, password);

        // 로그인 결과에 따라 적절한 응답 반환
        if (result != null) {
            HttpSession session = request.getSession(true); // 세션이 없으면 새로 생성하도록 변경
            session.setAttribute("userId", userId); // 세션에 사용자 ID 설정
            return ResponseEntity.ok("로그인 성공! 사용자 아이디: " + userId); // 로그인이 성공하면 이 코드가 로그인 페이지로 이동한다.
        } else {
            // 로그인 실패
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패. 아이디 또는 비밀번호를 다시 확인해주세요.");
        }

    }

    // 로그아웃을 할 때 쓰이는 코드.
    // 이를 쓰기 위해서는 메인 페이지에 로그아웃 버튼을 새롭게 만들어야 한다.
    @PostMapping("/api/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // 세션을 받는다.

        if (session != null) {
            session.invalidate(); // 세션을 비활성화한다.
        }

        return ResponseEntity.ok("로그아웃 성공!");
    }

    // 이메일로 아이디 찾기 요청 처리
    // ResponseEntity.ok메서드에 전달되는 메시지는 service 함수에서 받아온 string 형식 그대로 반환한다.
    @GetMapping("/api/findid")
    public ResponseEntity<String> findIdByEmail(@RequestParam String email) {
        String result = userservice.findIdByEmail(email);
        if (result != null) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 아이디로 비밀번호 찾기 요청 처리
    // ResponseEntity.ok메서드에 전달되는 메시지는 service 함수에서 받아온 string 형식 그대로 반환한다.
    @GetMapping("/api/findpassword")
    public ResponseEntity<String> findPasswordById(@RequestParam String userId) {
        String result = userservice.findPasswordById(userId);
        if (result != null) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}