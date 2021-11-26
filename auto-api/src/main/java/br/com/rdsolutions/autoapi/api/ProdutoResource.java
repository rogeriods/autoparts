package br.com.rdsolutions.autoapi.api;

import java.net.URI;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
     * @route PUT /api/produtos/{id}
     * @description Cria produto e carrega arquivo
     * @access Público
     */
    @PutMapping("/{id}")
    public ResponseEntity<Produto> updateProduto(@RequestBody Produto produto, @PathVariable Long id) {
	Produto produtoAtual = produtoRepo.findById(id).orElse(null);
	
	if (produto != null) {
	    produto.setId(produtoAtual.getId());
	} else {
	    return ResponseEntity.notFound().build();
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
    public ResponseEntity<Produto> saveProduto(@RequestBody Produto produto) {
	URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/produtos").toUriString());
	log.info("Criando produto {}", produto.getDescricao());
	return ResponseEntity.created(uri).body(produtoRepo.save(produto));
    }

    /**
     * @route POST /api/produtos/upload
     * @description Upload file
     * @access Público
     */
    @PostMapping("upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
	log.info("Carregando arquivo {}", file.getOriginalFilename());
	storageService.store(file);
	return new ResponseEntity<String>(file.getOriginalFilename(), HttpStatus.ACCEPTED);
    }

}
