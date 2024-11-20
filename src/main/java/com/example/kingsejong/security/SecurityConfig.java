package com.example.kingsejong.security;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .cors(cors -> cors.configurationSource(corsConfigurationSource())) // CORS 설정
        .csrf(csrf -> csrf.disable()) // CSRF 비활성화
        .authorizeHttpRequests(authorize -> authorize
            .requestMatchers("/actuator/**").permitAll() // Actuator 접근 허용
            .anyRequest().permitAll()) // 모든 요청 허용
        .logout(logout -> logout.permitAll()); // 로그아웃 허용

    return http.build();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList(
        "http://localhost:3000", // 로컬 React 개발 환경
        "http://52.79.138.214:3000", // EC2에서 React 개발 서버 실행
        "http://52.79.138.214" // EC2에서 배포된 서버
    ));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // 허용 메서드
    configuration.setAllowedHeaders(Arrays.asList("*")); // 모든 헤더 허용
    configuration.setAllowCredentials(true); // 인증 정보 포함 허용 (쿠키 사용 등)

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration); // 모든 경로에 대해 CORS 설정 적용
    return source;
  }
}
