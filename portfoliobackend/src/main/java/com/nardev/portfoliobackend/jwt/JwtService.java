package com.nardev.portfoliobackend.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.function.Function;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

        private static final String SECRET_KEY = "myverysecuresecretkeymyverysecuresecretkey123456789";

        public String generateToken(String username) {

                return Jwts.builder()

                                .setSubject(username)

                                .setIssuedAt(new Date())

                                .setExpiration(
                                                new Date(System.currentTimeMillis() + 1000 * 60 * 60))

                                .signWith(
                                                Keys.hmacShaKeyFor(
                                                                SECRET_KEY.getBytes()),
                                                SignatureAlgorithm.HS256)

                                .compact();
        }

        public String extractUsername(String token) {

                return extractClaim(token, Claims::getSubject);
        }

        public Date extractExpiration(String token) {

                return extractClaim(token, Claims::getExpiration);
        }

        public <T> T extractClaim(
                        String token,
                        Function<Claims, T> claimsResolver) {

                final Claims claims = extractAllClaims(token);

                return claimsResolver.apply(claims);
        }

        private Claims extractAllClaims(String token) {

                return Jwts.parser()

                                .setSigningKey(
                                                Keys.hmacShaKeyFor(
                                                                SECRET_KEY.getBytes()))

                                .parseClaimsJws(token)

                                .getBody();
        }

        public boolean isTokenExpired(String token) {

                return extractExpiration(token).before(new Date());
        }

        public boolean validateToken(
                        String token,
                        String username) {

                final String extractedUsername = extractUsername(token);

                return (extractedUsername.equals(username)
                                &&
                                !isTokenExpired(token));
        }
}