import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, List, Portal, Dialog, Provider as PaperProvider, Card, Divider } from 'react-native-paper';

export default function App() {
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const estados = ['AC','AM', 'AP','AL', 'BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];

  const BuscaCep = async (xcep) => {
    if (xcep.length !== 8) {
      setDialogMessage('CEP inválido! Insira um CEP com 8 dígitos.');
      setDialogVisible(true);
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
        setDialogMessage('CEP não encontrado!');
        setDialogVisible(true);
      }
    } catch (error) {
      setDialogMessage('Erro ao buscar CEP. Verifique sua conexão.');
      setDialogVisible(true);
    }
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          Formulário
        </Text>

        {/* CARD DADOS PESSOAIS */}
        <Card style={styles.card}>
          <Card.Title title="Dados Pessoais" />
          <Card.Content>
            <TextInput
              label="Nome"
              value={nome}
              onChangeText={setNome}
              style={styles.input}
            />

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={styles.input}
            />

            <TextInput
              label="Data de Nascimento"
              value={dataNascimento}
              onChangeText={setDataNascimento}
              placeholder="DD/MM/AAAA"
              keyboardType="numeric"
              style={styles.input}
            />
          </Card.Content>
        </Card>

        <Divider style={{ marginVertical: 10 }} />

        {/* CARD ENDEREÇO */}
        <Card style={styles.card}>
          <Card.Title title="Endereço" />
          <Card.Content>
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

            <List.Section style={styles.accordionContainer}>
              <List.Accordion
                title={estado ? `Estado: ${estado}` : 'Selecione o Estado'}
                expanded={expanded}
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
          </Card.Content>
        </Card>

        <Button
          icon="check"
          mode="contained"
          onPress={() => alert('Endereço salvo com sucesso!')}
          style={styles.button}
        >
          Salvar Endereço
        </Button>

        {/* Dialog de Erro */}
        <Portal>
          <Dialog
            visible={dialogVisible}
            onDismiss={() => setDialogVisible(false)}
          >
            <Dialog.Title>Atenção</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">{dialogMessage}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setDialogVisible(false)}>Fechar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
    </PaperProvider>
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
  card: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    marginVertical: 10,
    width: '200',
    alignItems: 'center',
  },
  accordionContainer: {
    width: '100%',
    marginBottom: 10,
  },
});
