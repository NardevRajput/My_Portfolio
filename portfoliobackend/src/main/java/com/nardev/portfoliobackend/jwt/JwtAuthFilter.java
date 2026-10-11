package com.nardev.portfoliobackend.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

        @Autowired
        private JwtService jwtService;

        @Autowired
        private UserDetailsService userDetailsService;

        @Override
        protected void doFilterInternal(
                        HttpServletRequest request,
                        HttpServletResponse response,
                        FilterChain filterChain) throws ServletException, IOException {

                String path = request.getServletPath();

                // Public endpoints: JWT is not required
                if (path.equals("/auth/login")
                                || path.equals("/auth/forgot-password")
                                || path.equals("/auth/verify-otp")
                                || path.equals("/auth/reset-password")
                                || path.equals("/api/contact")
                                || path.equals("/admin/test")
                                || path.equals("/api/home/status")
                                || path.equals("/api/home/hero-image")
                                                && request.getMethod().equals("GET")) {

                        filterChain.doFilter(request, response);
                        return;
                }

                // Read JWT from request header
                String authHeader = request.getHeader("Authorization");

                if (authHeader != null && authHeader.startsWith("Bearer ")) {

                        String token = authHeader.substring(7);

                        try {
                                String username = jwtService.extractUsername(token);

                                if (username != null
                                                && SecurityContextHolder.getContext()
                                                                .getAuthentication() == null) {

                                        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                                        if (jwtService.validateToken(
                                                        token, userDetails.getUsername())
                                                        && userDetails.isEnabled()
                                                        && userDetails.isAccountNonLocked()
                                                        && userDetails.isAccountNonExpired()
                                                        && userDetails.isCredentialsNonExpired()) {

                                                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                                                                userDetails,
                                                                null,
                                                                userDetails.getAuthorities());

                                                authentication.setDetails(
                                                                new WebAuthenticationDetailsSource()
                                                                                .buildDetails(request));

                                                SecurityContextHolder.getContext()
                                                                .setAuthentication(authentication);
                                        }
                                }

                        } catch (Exception e) {
                                SecurityContextHolder.clearContext();
                        }
                }

                filterChain.doFilter(request, response);
        }
}