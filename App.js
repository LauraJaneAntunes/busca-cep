import React, { useState } from 'react';  // Importa o React e useState para gerenciar o estado
import { View, StyleSheet } from 'react-native';  // Importa componentes do React Native
import { Text, TextInput, Button, Card } from 'react-native-paper';  // Importa componentes da biblioteca React Native Paper

export default function App() {
  const [cep, setCep] = useState('');  // Estado para armazenar o valor do CEP
  const [dados, setDados] = useState(null);  // Estado para armazenar os dados retornados pela API

  // Função assíncrona que busca o CEP
  const BuscaCep = async (xcep) => {
    // Valida se o CEP tem 8 caracteres
    if (xcep.length !== 8) {
      alert('CEP inválido! Insira um CEP com 8 dígitos.');  // Exibe alerta caso o CEP seja inválido
      return;  // Encerra a função se o CEP for inválido
    }

    try {
      // Cria a URL da API para buscar os dados do CEP
      let url = `https://viacep.com.br/ws/${xcep}/json/`;
      // Faz a requisição para a API
      let response = await fetch(url);
      // Converte a resposta em formato JSON
      let xjson = await response.json();
      // Atualiza o estado 'dados' com os dados retornados pela API
      setDados(xjson);
    } catch (error) {
      // Exibe um alerta caso ocorra um erro na requisição
      alert('Erro ao buscar CEP. Verifique sua conexão.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Título da tela */}
      <Text variant="headlineMedium" style={styles.title}>
        Busca CEP
      </Text>

      {/* Campo de entrada para o CEP */}
      <TextInput
        label="Digite o CEP"
        value={cep}  // Avisa qual é o valor atual do estado 'cep'
        onChangeText={setCep}  // Atualiza o estado 'cep' com o texto digitado
        keyboardType="numeric"  // Permite apenas números no campo
        maxLength={8}  // Limita o campo a 8 caracteres
        mode="flat"  // Estilo plano para o campo de texto
        style={styles.input}
      />

      {/* Botão para buscar o CEP */}
      <Button
        icon="card-search"  // Ícone de lupa (pesquisa)
        mode="contained"  // Estilo de botão preenchido
        onPress={() => BuscaCep(cep)}  // Chama a função 'BuscaCep' ao clicar no botão
        style={styles.button}
      >
        Buscar
      </Button>

      {/* Exibe os resultados se 'dados' não for nulo e não houver erro */}
      {dados && !dados.erro && (
        <Card style={styles.resultContainer}>
          <Card.Content>
            <Text style={styles.resultText}>
              <Text style={styles.label}>LOGRADOURO: </Text>
              {dados.logradouro}
            </Text>
            <Text style={styles.resultText}>
              <Text style={styles.label}>BAIRRO: </Text>
              {dados.bairro}
            </Text>
            <Text style={styles.resultText}>
              <Text style={styles.label}>CIDADE: </Text>
              {dados.localidade}
            </Text>
            <Text style={styles.resultText}>
              <Text style={styles.label}>ESTADO: </Text>
              {dados.uf}
            </Text>
          </Card.Content>
        </Card>
      )}

      {/* Exibe mensagem de erro se 'dados.erro' for verdadeiro */}
      {dados && dados.erro && (
        <Text style={styles.errorText}>CEP não encontrado!</Text>
      )}
    </View>
  );
}

// Estilos do aplicativo
const styles = StyleSheet.create({
  container: {
    flex: 1,  // Preenche toda a tela
    backgroundColor: '#f4f4f4',  // Cor de fundo
    alignItems: 'center',  // Centraliza os elementos horizontalmente
    justifyContent: 'center',  // Centraliza os elementos verticalmente
    padding: 20,  // Adiciona espaçamento ao redor da tela
  },
  title: {
    fontWeight: 'bold',  // Deixa o título em negrito
    marginBottom: 20,  // Adiciona espaçamento abaixo do título
    color: 'blueviolet',  // Cor do título
  },
  input: {
    width: 140,  // Define a largura do campo de texto
    marginBottom: 10,  // Adiciona espaçamento abaixo do campo de texto
  },
  button: {
    alignSelf: 'center',  // Centraliza o botão horizontalmente
  },
  resultContainer: {
    marginTop: 20,  // Adiciona espaçamento acima do card com os resultados
    padding: 10,  // Adiciona espaçamento interno ao card
    backgroundColor: 'white',  // Cor de fundo do card
    borderRadius: 8,  // Arredonda as bordas do card
    elevation: 3,  // Sombra para o card
    width: '100%',  // Faz o card ocupar a largura total
  },
  resultText: {
    fontSize: 16,  // Tamanho da fonte dos resultados
    color: 'blueviolet',  // Cor do texto
    marginBottom: 5,  // Adiciona espaçamento abaixo do texto
  },
  label: {
    fontWeight: 'bold',  // Deixa o texto da label em negrito
    textTransform: 'uppercase',  // Deixa as labels em maiúsculo
  },
  errorText: {
    color: 'red',  // Cor do texto de erro
    fontSize: 16,  // Tamanho da fonte
    marginTop: 10,  // Adiciona espaçamento acima da mensagem de erro
  },
});
