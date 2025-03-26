import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, List } from 'react-native-paper';

export default function App() {
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [expanded, setExpanded] = useState(false); // Accordion estado
  const estados = ['SP', 'RJ', 'MG', 'ES', 'BA', 'RS', 'SC', 'PR', 'PE', 'CE', 'GO'];

  const BuscaCep = async (xcep) => {
    if (xcep.length !== 8) {
      alert('CEP inválido! Insira um CEP com 8 dígitos.');
      return;
    }

    try {
      let url = `https://viacep.com.br/ws/${xcep}/json/`;
      let response = await fetch(url);
      let xjson = await response.json();
      if (!xjson.erro) {
        setRua(xjson.logradouro || '');
        setBairro(xjson.bairro || '');
        setCidade(xjson.localidade || '');
        setEstado(xjson.uf || '');
      } else {
        alert('CEP não encontrado!');
      }
    } catch (error) {
      alert('Erro ao buscar CEP. Verifique sua conexão.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Formulário de Endereço
      </Text>

      <TextInput
        label="CEP"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
        maxLength={8}
        style={styles.input}
      />

      <Button
        icon="card-search"
        mode="contained"
        onPress={() => BuscaCep(cep)}
        style={styles.button}
      >
        Buscar CEP
      </Button>

      <TextInput
        label="Rua"
        value={rua}
        onChangeText={setRua}
        style={styles.input}
      />

      <TextInput
        label="Número"
        value={numero}
        onChangeText={setNumero}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        label="Bairro"
        value={bairro}
        onChangeText={setBairro}
        style={styles.input}
      />

      <TextInput
        label="Cidade"
        value={cidade}
        onChangeText={setCidade}
        style={styles.input}
      />

      {/* Accordion para selecionar estado */}
      <List.Section style={styles.accordionContainer}>
        <List.Accordion
          title={estado ? `Estado: ${estado}` : 'Selecione o Estado'}
          expanded={true}
          onPress={() => setExpanded(!expanded)}
          left={(props) => <List.Icon {...props} icon="map-marker" />}
        >
          {estados.map((uf) => (
            <List.Item
              key={uf}
              title={uf}
              onPress={() => {
                setEstado(uf);
                setExpanded(false);
              }}
            />
          ))}
        </List.Accordion>
      </List.Section>

      <Button
        icon="check"
        mode="contained"
        onPress={() => alert('Endereço salvo com sucesso!')}
        style={styles.button}
      >
        Salvar Endereço
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'blueviolet',
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    marginVertical: 10,
    width: '100%',
  },
  accordionContainer: {
    width: '100%',
    marginBottom: 10,
  },
});
