package com.example.kingsejong.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.example.kingsejong.dto.UserDTO;
import com.example.kingsejong.entity.UserEntity;
import com.example.kingsejong.repository.UserRepository;

@Service
public class Userservice {

    /*
     * 1.entity는 실제 디비와 매핑되는 핵심 클래스이다.
     * 2.dto는 레이어간 데이터 교환이 이뤄지게 하는 객체이다.
     * 3.service에서는 컨트롤러에서 받은 dto를 entity로 변환하고, 필요한 작업을 수행한 뒤에 repository에 entity를
     * 전달한다.
     * 
     */

    // service 객체에 쓰일 repository를 정의한다.
    /*
     * 아래 두 코드를 같이 쓰는 이유가 있다.
     * 첫번째 코드의 의존성 주입을 통해 객체간의 결합도를 낮추고
     * 두번째 코드의 방식은 필수적인 의존성을 명시적으로 표시하고, 컴파일 타임에 오류를 방지해서 안정성을 제공한다.
     */

    /*
     * 이 코드는 spring에서 의존성 주입(dependency injection)을 사용해서
     * 서비스 객체에 데이터 엑세스를 위한 UserRepository를 주입한다.
     * 
     * 의존성 주입을 통해 repository를 외부에서 주입받아 사용하므로,
     * repository의 내부를 뜯어고치더라도, service의 코드를 고칠 필요가 없다.
     * 이는 코드의 유연성과 확장성을 높여준다.
     */
    @Autowired
    private final UserRepository UserRepository;

    /*
     * 이 부분은 생성자 주입을 사용해 UserRepository을 받아와서 서비스 객체를 생성하는 코드이다.
     * 
     * 이를 통해 코드의 안정성을 높여준다.
     */
    @Autowired
    public Userservice(UserRepository UserRepository) {
        this.UserRepository = UserRepository;
    }

    // 받아온 데이터들을 저장하는 메소드이다.
    @Transactional // 트랜잭션을 관리한다. 이 어노테이션이 없으면 데이터베이스에 변경 사항이 커밋되지 않을 수 있다.
    public void save(UserDTO userDTO) {
        try {
            // toUserEntity 메소드에서 NullPointerException이 발생하지 않도록 null 체크를 추가합니다.
            if (userDTO == null) {
                throw new IllegalArgumentException("UserDto 객체가 null입니다.");
            }

            // toUserEntity 메소드를 통해 UserEntity 객체로 변환합니다.
            UserEntity userEntity = UserEntity.toUserEntity(userDTO);

            // 변환된 UserEntity 객체가 null이 아닌지 확인합니다.
            if (userEntity == null) {
                throw new IllegalArgumentException("UserEntity 객체가 null입니다.");
            }

            // save 메소드를 통해 데이터베이스에 저장합니다.
            UserRepository.save(userEntity);
        } catch (IllegalArgumentException e) {
            // IllegalArgumentException이 발생한 경우 예외를 처리합니다.
            // 예외 메시지와 스택 트레이스를 출력하고 롤백합니다.
            e.printStackTrace();
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        } catch (Exception e) {
            // 기타 예외가 발생한 경우 예외를 처리합니다.
            // 예외 메시지와 스택 트레이스를 출력하고 롤백합니다.
            e.printStackTrace();
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        }
    }

    public String login(String userId, String password) {
        // 로그인을 수행할 때 수행되는 함수이다.

        // 1.회원이 입력한 아이디로 db에서 조회를 한다.
        // Optional은 Userentity를 한번 더 감싸는 개념이다.
        Optional<UserEntity> findById = UserRepository.findByUserID(userId);

        // 조회 결과가 있다면
        if (findById.isPresent()) {
            // 일단 이 구문을 통해 데이터를 벗겨낸다.
            UserEntity userEntity = findById.get();
            // 2.db에서 조회한 비밀번호(entity)가 사용자가 입력한 비밀번호(dto)가 일치하는지 판단한다.
            // 또한, 엔터티의 비밀번호가 null이 아닌지 확인한다.
            if (userEntity.getPassword() != null && userEntity.getPassword().equals(password)) {
                // 비밀번호 일치

                return "ok";
            } else {
                // 비밀번호 불일치(로그인 실패)
                return null;
            }
        } else {
            // 3.없다면(계정이 없다면)
            return null;
        }
    }

    // 회원 조회를 위한 함수이다.
    public List<UserDTO> findAll() {
        List<UserEntity> UserEntityList = UserRepository.findAll();
        // entity list를 dto list로 변환해야 한다.
        List<UserDTO> UserDTOList = new ArrayList<>();
        // 하나하나 꺼낸다.
        for (UserEntity UserEntity : UserEntityList) {
            UserDTOList.add(UserDTO.toUserDTO(UserEntity));

        }

        return UserDTOList;
    }

    public String emailCheck(String UserEmail) {
        // repository 함수를 통해 사용자가 입력한 이메일 값으로 조회를 한다. 이렇게 조회하는 것은 JPA의 repository를 통해
        // 조회할 수 있다.
        Optional<UserEntity> byUserEmail = UserRepository.findByEmail(UserEmail);
        if (byUserEmail.isPresent()) {

            // 이메일 값이 이미 있으면(회원이 중복되어 있으면)사용할 수 없다.

            return "이미 존재하는 이메일입니다.";
        }

        else {
            // 조회 결과가 없으면 사용할 수 있다.
            return "사용 가능한 이메일입니다.";
        }

    }

    // 위의 emailCheck와 동일하다고 볼 수 있다.
    public String idCheck(String UserId) {
        // repository 함수를 통해 사용자가 입력한 아이디 값으로 조회를 한다.
        Optional<UserEntity> byUserId = UserRepository.findByUserID(UserId);
        if (byUserId.isPresent()) {

            // 아이디 값이 이미 있으면(회원이 중복되어 있으면)사용할 수 없다.

            return "이미 존재하는 아이디입니다.";
        }

        else {
            // 조회 결과가 없으면 사용할 수 있다.
            return "사용 가능한 아이디입니다.";
        }

    }

    // 비밀번호를 확인하는 메서드.
    public UserEntity getPasswordByEmail(String UserEmail) {
        Optional<UserEntity> byUserEmail = UserRepository.findByEmail(UserEmail);
        return byUserEmail.orElse(null);// 사용자가 존재하면 해당 사용자 엔터티를 반환하고, 그렇지 않으면 null을 반환한다.
    }

    // Transactional 어노테이션은 여러 줄의 코드를 하나의 작업으로 처리해준다.
    // 하나의 작업으로 처리해주면, 부분적으로 오류가 난 것을 같이 처리할 수 있다는 장점이 있다.
    @Transactional
    public boolean changePassword(String email, String newPassword) {
        Optional<UserEntity> userOptional = UserRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            user.setPassword(newPassword);
            UserRepository.save(user);
            return true;
        }

        return false;
    }

    // 이메일로 아이디 찾기
    public String findIdByEmail(String email) {
        UserEntity user = UserRepository.findByEmail(email).orElse(null);
        if (user != null) {
            return "아이디는 " + user.getUserID() + "입니다";
        } else {
            return "아이디 값을 찾을 수 없습니다.";
        }
    }

    // 아이디로 비밀번호 찾기
    public String findPasswordById(String id) {
        UserEntity user = UserRepository.findByUserID(id).orElse(null);
        if (user != null) {
            return "비밀번호는 " + user.getPassword() + "입니다";
        } else {
            return "비밀번호 값을 찾을 수 없습니다.";
        }
    }

}
