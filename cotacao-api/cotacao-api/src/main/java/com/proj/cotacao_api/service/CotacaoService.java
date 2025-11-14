package com.proj.cotacao_api.service;

import com.proj.cotacao_api.model.Cotacao;
import com.proj.cotacao_api.repository.CotacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CotacaoService {

    @Autowired
    private CotacaoRepository repository;

    public Cotacao salvarCotacao(String moeda, Double valor) {
        Cotacao cotacao = new Cotacao();
        cotacao.setMoeda(moeda.toUpperCase());
        cotacao.setValor(valor);
        cotacao.setDataHora(LocalDateTime.now());
        return repository.save(cotacao);
    }

    public Cotacao buscarCotacaoAtual(String moeda) {
        return repository.findFirstByMoedaOrderByDataHoraDesc(moeda.toUpperCase())
                .orElse(null);
    }

    public List<Cotacao> buscarHistorico(String moeda, int limite) {
        List<Cotacao> todas = repository.findByMoedaOrderByDataHoraDesc(moeda.toUpperCase());
        return todas.size() > limite ? todas.subList(0, limite) : todas;
    }

    public List<Cotacao> listarTodasCotacoes() {
        return repository.findAll();
    }
}
