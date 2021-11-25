package br.com.rdsolutions.autoapi.service;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ConfigurationProperties("storage")
public class StorageProperties {
    
    // Folder location for storing files
    private String location = "src/main/resources/static/uploaded-images";
    
}
