package br.com.pastaeriso.api.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
@Configuration
public class GlobalRepositoryRestConfigurer implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry corsRegistry) {
    	corsRegistry.addMapping("/**")
                  .allowedOrigins("http://localhost:3000")
                  .allowedHeaders("*")
                  .allowedMethods("GET","POST","HEAD","DELETE","PATCH");
     }

}