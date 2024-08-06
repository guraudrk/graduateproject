package com.example.kingsejong.entity;

import com.example.kingsejong.dto.UserDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

/*entity는 데이터베이스에서 영속적으로 저장되는 객체를 나타낸다.
entity는 jpa와 같이 사용되며, 데이터베이스와 직접적으로 소통하는 객체라고 생각하면 된다.
그렇기에, entity를 다 설정하고 postgresql에 관한 springboot 설정을 마친 채 코드를 실행하면 postgresql에서 테이블이 생성되는 것을 알 수 있다.*/

@Entity // JPA entity로 지정한다.
@Table(name = "UserInfo") // table이라는 어노테이션은 데이터베이스에 해당 이름의 테이블이 자동으로 생기게 해준다.
@Data // lombok 라이브러리를 사용해서 getter,setter를 자동으로 생성했다.
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동으로 항목이 생성되도록 하는 어노테이션.
    private Long id; // Primary Key

    // Column 어노테이션으로, 이름 등의 옵션을 설정할 수 있다.
    @Column(name = "userID", unique = true, nullable = false)
    private String userID;

    @Column(name = "password", unique = true, nullable = false)
    private String password;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    // UserDTO를 UserEntity를 변환하는 메소드
    public static UserEntity toUserEntity(UserDTO UserDTO) {
        UserEntity UserEntity = new UserEntity();
        UserEntity.setId(UserDTO.getId());
        UserEntity.setUserID(UserDTO.getUserId());
        UserEntity.setEmail(UserDTO.getEmail());
        UserEntity.setPassword(UserDTO.getPassword());

        return UserEntity;
    }
}
