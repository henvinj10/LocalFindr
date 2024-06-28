package com.project.localfindr.config;
import com.project.localfindr.utility.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
@Order(1)// Filter order if you have multiple filters
public class UserTypeFilter extends OncePerRequestFilter {


    @Autowired
    private JwtUtil jwtUtil;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Extract userType from JWT token (assuming you have a method to get it)
        String userType = extractUserTypeFromToken(request);
        // Get request URI
        String requestURI = request.getRequestURI();

        // Check userType and filter requests accordingly
        if (requestURI.startsWith("/auth/")) {
            // Allow all userTypes
            filterChain.doFilter(request, response);
        } else if (requestURI.startsWith("/vendor/") && "VENDOR".equals(userType)) {
            // Allow only VENDOR userType for /vendor/**
            filterChain.doFilter(request, response);
        } else if (requestURI.startsWith("/customer/") && "CUSTOMER".equals(userType)) {
            // Allow only CUSTOMER userType for /customer/**
            filterChain.doFilter(request, response);
        } else if (requestURI.startsWith("/user/profile")) {
            filterChain.doFilter(request, response);
        } else if (requestURI.startsWith("/user/update") && "VENDOR".equals(userType)) {
            // Allow only CUSTOMER userType for /customer/**
            filterChain.doFilter(request, response);
        } else {
            response.setStatus(HttpStatus.FORBIDDEN.value());
        }
    }

    private String extractUserTypeFromToken(HttpServletRequest request) {
        final String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return jwtUtil.getUserTypeFromToken(authorizationHeader.substring(7));
        }
        return "NO_USERTYPE";
    }

}
