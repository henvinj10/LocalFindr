package com.project.localfindr.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<UserTypeFilter> userTypeFilterRegistration() {
        FilterRegistrationBean<UserTypeFilter> registration = new FilterRegistrationBean<>();
        registration.setFilter(new UserTypeFilter());
        registration.addUrlPatterns("/auth/*", "/vendor/*", "/customer/*", "/user/*", "/user/profile", "/user/update");
        return registration;
    }
}
