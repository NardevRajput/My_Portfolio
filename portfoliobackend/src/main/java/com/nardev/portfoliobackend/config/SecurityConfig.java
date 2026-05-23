package com.nardev.portfoliobackend.config;

import com.nardev.portfoliobackend.jwt.JwtAuthFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {
        @Autowired
        private JwtAuthFilter jwtAuthFilter;

        // ADMIN USER
        @Bean
        public InMemoryUserDetailsManager userDetailsService(
                        PasswordEncoder passwordEncoder) {
                UserDetails admin = User.withUsername("nardev")
                                .password(passwordEncoder.encode("nardev123")).roles("ADMIN").build();
                return new InMemoryUserDetailsManager(admin);
        }

        // PASSWORD ENCODER
        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        // AUTHENTICATION MANAGER
        @Bean
        public AuthenticationManager authenticationManager(
                        AuthenticationConfiguration config) throws Exception {
                return config.getAuthenticationManager();
        }

        // SECURITY CONFIG
        @Bean
        public SecurityFilterChain securityFilterChain(
                        HttpSecurity http) throws Exception {
                http.cors(cors -> {
                })
                                .csrf(csrf -> csrf.disable())
                                .sessionManagement(session -> session.sessionCreationPolicy(
                                                SessionCreationPolicy.STATELESS))
                                .authorizeHttpRequests(auth -> auth

                                                // LOGIN API
                                                .requestMatchers("/auth/login")
                                                .permitAll()
                                                // CONTACT FORM API
                                                .requestMatchers("/api/contact")
                                                .permitAll()
                                                // ADMIN ROUTES
                                                .requestMatchers("/api/contact/admin/**")
                                                .authenticated()
                                                // TEST ROUTE
                                                .requestMatchers("/admin/test")
                                                .permitAll()
                                                .anyRequest().permitAll())
                                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                                .httpBasic(Customizer.withDefaults());
                return http.build();
        }
}