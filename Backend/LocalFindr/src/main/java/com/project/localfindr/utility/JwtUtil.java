package com.project.localfindr.utility;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtUtil {

    private static final String SECRET_KEY = "TopSecretKey";
    private static final long EXPIRATION_TIME = 86400000; // 1 day in milliseconds

    public static String generateToken(String email, String userType) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", email);
        claims.put("userType", userType);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }
}
