package com.project.localfindr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.project.localfindr")
@EntityScan(basePackages = "com.project.localfindr.model.Entities")
@EnableJpaRepositories(basePackages = "com.project.localfindr.repository")
public class LocalFindrApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(LocalFindrApplication.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(LocalFindrApplication.class);
	}
}