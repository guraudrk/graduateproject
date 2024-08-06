package com.example.kingsejong.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Board")
@Data
public class Board {

    // 게시판 table을 생성하는 entity 코드.

    @Id // 아이디를 통해 게시물을 판별!
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
    private LocalDateTime createdDate = LocalDateTime.now();
    private String userId;

    // getter와 setter는 Data 어노테이션으로 대체되었다.
    // getter와 setter를 사용하지 않아도 되는 것이 바로 lombok의 장점이다.

    @PrePersist
    protected void onCreate() {
        createdDate = LocalDateTime.now();
    }
}
