package br.com.rdsolutions.autoapi.service;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.stream.Stream;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class StorageServiceImpl implements StorageService {

    private final Path rootLocation;

    @Autowired
    public StorageServiceImpl(StorageProperties properties) {
	this.rootLocation = Paths.get(properties.getLocation());
    }

    @Override
    public void init() {
	log.info("Inicializando storage");
	try {
	    Files.createDirectories(rootLocation);
	} catch (IOException e) {
	    log.error("Não foi possível inicializar o storage: {}", e);
	}
    }

    @Override
    public void store(MultipartFile file) {
	log.info("Store file");
	try {
	    if (file.isEmpty()) {
		log.error("Falha ao salvar arquivo em branco");
	    }
	    
	    Path destinationFile = this.rootLocation.resolve(Paths.get(file.getOriginalFilename())).normalize().toAbsolutePath();
	    if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
		// This is a security check
		log.error("Não é possível salvar o arquivo em diretório diferente");
	    }
	    
	    try (InputStream inputStream = file.getInputStream()) {
		Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
	    }
	} catch (IOException e) {
	    log.error("Erro ao salvar o arquivo: {}", e);
	}
    }

    @Override
    public void deleteAll() {
	log.info("Deletando todos arquivos");
	FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    @Override
    public Stream<Path> loadAll() {
	log.info("Carregando todos arquivos");
	try {
	    return Files.walk(this.rootLocation, 1).filter(path -> !path.equals(this.rootLocation)).map(this.rootLocation::relativize);
	}
	catch (IOException e) {
	    log.error("Erro ao ler arquivos os arquivos salvos: {}", e);
	    throw new RuntimeException("Erro ao ler arquivos os arquivos salvos", e);
	}
    }

    @Override
    public Path load(String filename) {
	log.info("Carregando arquivo {}", filename);
	return rootLocation.resolve(filename);
    }

    @Override
    public Resource loadAsResource(String filename) {
	log.info("Carregando recursos do arquivo {}", filename);
	try {
	    Path file = load(filename);
	    Resource resource = new UrlResource(file.toUri());
	    if (resource.exists() || resource.isReadable()) {
		return resource;
	    } else {
		log.error("Arquivo {} não pode ser lido", filename);
		throw new RuntimeException("Arquivo não pode ser lido: " + filename);
	    }
	} catch (MalformedURLException e) {
	    log.error("Arquivo {} não pode ser lido", filename);
	    throw new RuntimeException("Arquivo não pode ser lido: " + filename, e);
	}
    }

}
