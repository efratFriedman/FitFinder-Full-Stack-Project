package com.example.fs_project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class FsProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(FsProjectApplication.class, args);
	}

}
