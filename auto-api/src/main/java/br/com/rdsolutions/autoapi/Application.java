package br.com.rdsolutions.autoapi;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import br.com.rdsolutions.autoapi.domain.Produto;
import br.com.rdsolutions.autoapi.repo.ProdutoRepo;
import br.com.rdsolutions.autoapi.service.StorageProperties;
import br.com.rdsolutions.autoapi.service.StorageService;

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class Application implements WebMvcConfigurer {

    public static void main(String[] args) {
	SpringApplication.run(Application.class, args);
    }

    @Bean
    CommandLineRunner init(StorageService storageService, ProdutoRepo produtoRepo) {
	return (args) -> {
	    storageService.init();
	    produtoRepo.save(new Produto(null, "Produto 01", null, null, 1, null, "default.png"));
	    produtoRepo.save(new Produto(null, "Produto 02", null, null, 1, null, "default.png"));
	    produtoRepo.save(new Produto(null, "Produto 03", null, null, 1, null, "default.png"));
	    produtoRepo.save(new Produto(null, "Produto 04", null, null, 1, null, "default.png"));
	    produtoRepo.save(new Produto(null, "Produto 05", null, null, 1, null, "default.png"));
	};
    }
    
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
	registry.addResourceHandler("/**").addResourceLocations("classpath:/static/","classpath:/uploaded-images/")
        .setCachePeriod(0);
    }
        
}
