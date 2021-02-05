package br.com.pastaeriso.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EnableAutoConfiguration
@EntityScan("br.com.pastaeriso")
public class SistemaPastaERisoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SistemaPastaERisoApplication.class, args);
	}

}
