package com.proj.cotacao_api.repository;

import com.proj.cotacao_api.model.Cotacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CotacaoRepository extends JpaRepository<Cotacao, Long> {

    List<Cotacao> findByMoedaOrderByDataHoraDesc(String moeda);

    Optional<Cotacao> findFirstByMoedaOrderByDataHoraDesc(String moeda);
}