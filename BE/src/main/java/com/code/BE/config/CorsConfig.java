package com.code.BE.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Adjust the mapping pattern as needed
                .allowedOriginPatterns("http://localhost:3000") // Add your React app's origin
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
