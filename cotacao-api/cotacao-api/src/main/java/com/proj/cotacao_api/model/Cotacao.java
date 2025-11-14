package com.proj.cotacao_api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "cotacoes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cotacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 10)
    private String moeda;

    @Column(nullable = false)
    private Double valor;

    @Column(name = "data_hora", nullable = false)
    private LocalDateTime dataHora;
}