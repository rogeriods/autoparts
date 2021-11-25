package br.com.rdsolutions.autoapi.api;

import java.net.URI;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.rdsolutions.autoapi.domain.Produto;
import br.com.rdsolutions.autoapi.repo.ProdutoRepo;
import br.com.rdsolutions.autoapi.service.StorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/produtos")
public class ProdutoResource {
    
    private final ProdutoRepo produtoRepo;
    private final StorageService storageService;
    
    /**
     * @route GET /api/produtos
     * @description Retorna todos produtos
     * @access Público 
     */
    @GetMapping
    public ResponseEntity<List<Produto>> getProdutos() {
	log.info("Carregando todos produtos");
	return ResponseEntity.ok().body(produtoRepo.findAll());
    }
    
    /**
     * @route GET /api/produtos/{id}
     * @description Retorna produto pelo id
     * @access Público 
     */
    @GetMapping("/{id}")
    public ResponseEntity<Produto> getProdutoById(@PathVariable Long id) {
	log.info("Carregando produto pelo id: {}", id);
	return produtoRepo.findById(id).map(produto -> ResponseEntity.ok().body(produto)).orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * @route DELETE /api/produtos/{id}
     * @description Deleta produto pelo id
     * @access Público 
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProdutoById(@PathVariable Long id) {
	log.info("Deletando produto pelo id: {}", id);
	Produto produtoToDelete = produtoRepo.findById(id).orElse(null);
	
	if (produtoToDelete == null) {
	    return ResponseEntity.notFound().build();
	} else {
	    produtoRepo.delete(produtoToDelete);
	    return new ResponseEntity<String>("Produto deletado com sucesso!", HttpStatus.ACCEPTED);
	}	
    }
    
    /**
     * @route PUT /api/produtos
     * @description Cria produto e carrega arquivo
     * @access Público 
     */
    @PutMapping
    public ResponseEntity<Produto> updateProduto(Produto produto, @RequestParam(value = "file", required = false) MultipartFile file) {	
	Produto produtoAtual = produtoRepo.findById(produto.getId()).orElse(null);
	
	if (file != null) {
	    produto.setImageName(file.getOriginalFilename());
	    log.info("Carregando arquivo {}", file.getOriginalFilename());
	    storageService.store(file);	   
	} else {
	    // Consist image if I didn't change on form
	    produto.setImageName(produtoAtual.getImageName());
	}
	
	URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/produtos/" + produto.getId()).toUriString());
	log.info("Atualizando produto {}", produto.getDescricao());
	return ResponseEntity.created(uri).body(produtoRepo.save(produto));
    }
    
    /**
     * @route POST /api/produtos
     * @description Cria produto e carrega arquivo
     * @access Público 
     */
    @PostMapping
    public ResponseEntity<Produto> saveProduto(Produto produto, @RequestParam(value = "file", required = false) MultipartFile file) {
	if (file != null) {
	    produto.setImageName(file.getOriginalFilename());
	    log.info("Carregando arquivo {}", file.getOriginalFilename());
	    storageService.store(file);	   
	} else {
	    produto.setImageName("default.png");
	}
	
	URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/produtos").toUriString());
	log.info("Criando produto {}", produto.getDescricao());
	return ResponseEntity.created(uri).body(produtoRepo.save(produto));
    }

}
