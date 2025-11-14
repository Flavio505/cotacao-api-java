package com.proj.cotacao_api.controller;

import com.proj.cotacao_api.model.Cotacao;
import com.proj.cotacao_api.service.CotacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cotacoes")
@CrossOrigin(origins = "*")
public class CotacaoController {

    @Autowired
    private CotacaoService service;

    @GetMapping
    public ResponseEntity<List<Cotacao>> listarTodas() {
        return ResponseEntity.ok(service.listarTodasCotacoes());
    }

    @GetMapping("/{moeda}")
    public ResponseEntity<?> getCotacaoAtual(@PathVariable String moeda) {
        Cotacao cotacao = service.buscarCotacaoAtual(moeda);

        if (cotacao == null) {
            Map<String, String> erro = new HashMap<>();
            erro.put("erro", "Cotação não encontrada para a moeda: " + moeda);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);
        }

        return ResponseEntity.ok(cotacao);
    }

    @GetMapping("/{moeda}/historico")
    public ResponseEntity<List<Cotacao>> getHistorico(
            @PathVariable String moeda,
            @RequestParam(defaultValue = "10") int limite) {
        return ResponseEntity.ok(service.buscarHistorico(moeda, limite));
    }

    @PostMapping
    public ResponseEntity<Cotacao> criarCotacao(@RequestBody Map<String, Object> payload) {
        try {
            String moeda = (String) payload.get("moeda");
            Double valor = Double.parseDouble(payload.get("valor").toString());

            Cotacao novaCotacao = service.salvarCotacao(moeda, valor);
            return ResponseEntity.status(HttpStatus.CREATED).body(novaCotacao);

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
