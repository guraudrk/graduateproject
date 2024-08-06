package com.example.kingsejong.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.kingsejong.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    // jparepository를 상속받는다.
    // 첫번째 인자는 엔터티이고, 두번째 인자는 primary key의 자료형이다.

    // 인터페이스로 repository를 정의한다.
    /*
     * 가장 중요한 이유는 인터페이스를 사용하면 스프링부트에서 다양한 jpa를 구현할 수 있기 때문이다.
     * hibernate 등의 jpa 구현체를 사용할 수 있다.
     */

    // 이메일로 찾기
    // Optional을 사용해서 값이 없을 때를 대비한다.
    Optional<UserEntity> findByEmail(String email);

    // member_id로 찾기
    Optional<UserEntity> findByUserID(String userID);

}
