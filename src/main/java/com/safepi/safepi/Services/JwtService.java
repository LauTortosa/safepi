package com.safepi.safepi.Services;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {
    private final SecretKey secretKey;
    private final long expirationTime;
    private final String issuer;

    public JwtService(Environment env) {
        String secret = env.getProperty("jwt.secret");
        if (secret == null || secret.isEmpty()) {
            throw new IllegalArgumentException("La clave secreta no está en las variables de entorno");
        }

        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes());
        this.expirationTime = Long.parseLong(env.getProperty("jwt.expiration"));
        this.issuer = env.getProperty("jwt.issuer");
    }

    public SecretKey getSecretKey() {
        return this.secretKey;
    }
    public String generateToken(String subject, String role) {
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + expirationTime);

        return Jwts.builder()
                .setSubject(subject)
                .claim("role", role)
                .setIssuedAt(now)
                .setExpiration(expirationDate)
                .setIssuer(issuer)
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    public String extractToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");

        if (header == null) return null;

        header = header.trim();
        if (header.toLowerCase().startsWith("bearer ")) {
            return header.substring(7);
        }
        return null;
    }

    public String extractUserName(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (JwtException e) {
            return null;
        }
    }
}
