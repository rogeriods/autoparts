package br.com.rdsolutions.autoapi.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.rdsolutions.autoapi.domain.Produto;

public interface ProdutoRepo extends JpaRepository<Produto, Long> {

}
