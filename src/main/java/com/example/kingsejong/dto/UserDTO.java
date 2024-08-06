package com.example.kingsejong.dto;

import com.example.kingsejong.entity.UserEntity;

import lombok.Data;

@Data // Data 어노테이션은 다음과 같은 기능을 수행한다.
/*
 * getter:모든 필드에 대한 getter 메서드를 생성한다.
 * setter:모든 필드에 대한 setter 메서드를 생성한다.
 * tostring: 객체의 tostring 메서드를 생성한다.
 */

/*
 * dto는 데이터 전송 객체를 나타낸다. 주로 서비스 간 데이터 전송을 위해 사용된다.
 * 클라이언트에서 서버로 데이터를 전송하거나 서버에서 클라이언트로 데이터를 전송할 때 사용된다.
 * 순수하게 데이터를 전송하는 데에만 사용이 된다.
 */
public class UserDTO {
    private Long id;
    private String userId;
    private String password;
    private String email;

    // entity를 dto로 변환할 때 쓴다.
    // 이렇게 변환을 해야 더 효율적으로 쓸 수 있다.
    public static UserDTO toUserDTO(UserEntity UserEntity) {
        UserDTO UserDTO = new UserDTO();
        UserDTO.setId(UserEntity.getId());
        UserDTO.setUserId(UserEntity.getUserID());
        UserDTO.setPassword(UserEntity.getPassword());
        UserDTO.setEmail(UserEntity.getEmail());
        return UserDTO;
    }

    // 정적(inner) 클래스로 수정---내부 클래스는 정적으로 선언해야 한다.
    /*
     * 외부클래스의 인스턴스와 독립적으로 생성하기 위해 정적으로 선언한다.
     */
    public static class LoginRequest {
        private String userId;
        private String password;

        // 기본 생성자 추가---기본 생성자가 없으면 컴파일러가 기본 생성자를 자동으로 생성하지 않는다.
        public LoginRequest() {
        }

        public String getUserId() {
            return userId;
        }

        public void setUserId(String userId) {
            this.userId = userId;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}
