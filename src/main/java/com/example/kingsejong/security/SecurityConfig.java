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
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebSecurity
@Configuration
public class SecurityConfig implements WebMvcConfigurer {

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .cors(cors -> cors.configurationSource(corsConfigurationSource())) // CORS 설정 유지
        .csrf(csrf -> csrf.disable()) // CSRF 비활성화
        .authorizeRequests(authorize -> authorize
            .requestMatchers("/actuator/**").permitAll() // Actuator 엔드포인트 접근 허용
            .anyRequest().permitAll()) // 나머지 요청은 허용
        .logout(logout -> logout.permitAll());

    return http.build();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration
        .setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://52.79.138.214:3000", "http://52.79.138.214")); // 로컬
                                                                                                                         // 및
                                                                                                                         // EC2
                                                                                                                         // 주소
                                                                                                                         // 추가
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true); // CORS에 대한 인증 허용
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }
}
