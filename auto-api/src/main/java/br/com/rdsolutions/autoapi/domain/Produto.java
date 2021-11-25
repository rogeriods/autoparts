package br.com.rdsolutions.autoapi.domain;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Produto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String descricao;
    
    @Column(columnDefinition = "TEXT")
    private String observacoes;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal preco;
    
    private int estoqueMinimo;
    private String codigoBarras;
    private String imageName;

}
