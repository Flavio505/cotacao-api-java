import { useState, useEffect } from 'react';
import styles from './Cotacoes.module.css';

function Cotacoes() {
  const [cotacaoAtual, setCotacaoAtual] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [novaMoeda, setNovaMoeda] = useState('');
  const [novoValor, setNovoValor] = useState('');
  const [moedaSelecionada, setMoedaSelecionada] = useState('USD');

  const buscarCotacaoAtual = async (moeda) => {
    try {
      const response = await fetch(`http://localhost:8081/api/cotacoes/${moeda}`);
      
      if (response.ok) {
        const dados = await response.json();
        setCotacaoAtual(dados);
      } else {
        setCotacaoAtual(null);
        alert('Cotação não encontrada!');
      }
    } catch (erro) {
      console.error('Erro ao buscar cotação:', erro);
    }
  };

  const buscarHistorico = async (moeda) => {
    try {
      const response = await fetch(`http://localhost:8081/api/cotacoes/${moeda}/historico?limite=10`);
      const dados = await response.json();
      setHistorico(dados);
    } catch (erro) {
      console.error('Erro ao buscar histórico:', erro);
    }
  };

  const criarCotacao = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8081/api/cotacoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          moeda: novaMoeda.toUpperCase(),
          valor: parseFloat(novoValor)
        })
      });

      if (response.ok) {
        alert('Cotação criada com sucesso!');
        setNovaMoeda('');
        setNovoValor('');
        
        buscarCotacaoAtual(novaMoeda.toUpperCase());
        buscarHistorico(novaMoeda.toUpperCase());
      }
    } catch (erro) {
      console.error('Erro ao criar cotação:', erro);
    }
  };

  useEffect(() => {
    buscarCotacaoAtual(moedaSelecionada);
    buscarHistorico(moedaSelecionada);
  }, [moedaSelecionada]);

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Sistema de Cotações</h1>

      <div className={styles.seletorMoeda}>
        <label>Escolher moeda: </label>
        <select 
          value={moedaSelecionada} 
          onChange={(e) => setMoedaSelecionada(e.target.value)}
        >
          <option value="USD">Dólar (USD)</option>
          <option value="EUR">Euro (EUR)</option>
          <option value="GBP">Libra (GBP)</option>
        </select>
      </div>

      <div className={styles.cotacaoAtual}>
        <h2>Cotação Atual - {moedaSelecionada}</h2>
        {cotacaoAtual ? (
          <div>
            <p><strong>Valor:</strong> R$ {cotacaoAtual.valor.toFixed(2)}</p>
            <p><strong>Atualizado em:</strong> {new Date(cotacaoAtual.dataHora).toLocaleString('pt-BR')}</p>
          </div>
        ) : (
          <p className={styles.mensagemVazio}>Nenhuma cotação cadastrada ainda.</p>
        )}
      </div>

      <div className={styles.formContainer}>
        <h2>Adicionar Nova Cotação</h2>
        <form onSubmit={criarCotacao}>
          <div className={styles.formGroup}>
            <label>Moeda: </label>
            <input 
              type="text" 
              value={novaMoeda}
              onChange={(e) => setNovaMoeda(e.target.value)}
              placeholder="Ex: USD, EUR"
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Valor (R$): </label>
            <input 
              type="number" 
              step="0.01"
              value={novoValor}
              onChange={(e) => setNovoValor(e.target.value)}
              placeholder="Ex: 5.25"
              required
            />
          </div>
          
          <button type="submit" className={styles.btnSalvar}>
            Salvar Cotação
          </button>
        </form>
      </div>

      <div className={styles.historicoContainer}>
        <h2>Histórico - {moedaSelecionada}</h2>
        {historico.length > 0 ? (
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>Data/Hora</th>
                <th>Valor (R$)</th>
              </tr>
            </thead>
            <tbody>
              {historico.map((item) => (
                <tr key={item.id}>
                  <td>{new Date(item.dataHora).toLocaleString('pt-BR')}</td>
                  <td>R$ {item.valor.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.mensagemVazio}>Nenhum histórico encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default Cotacoes;