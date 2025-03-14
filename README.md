# Busca CEP

Este é um aplicativo simples desenvolvido em React Native para a aula de Desenvolvimento Mobile 2. 
Permite buscar informações sobre um endereço com base no CEP (Código de Endereçamento Postal), utilizando a API gratuita ViaCEP para buscar os dados de endereço, como logradouro, bairro, cidade e estado.

## Funcionalidades

- O usuário insere um CEP no campo de texto.
- Ao clicar no botão "Buscar", o aplicativo valida o CEP e faz uma requisição para a API ViaCEP.
- Os dados de endereço são exibidos em um card logo abaixo, com informações como:
  - Logradouro
  - Bairro
  - Cidade
  - Estado
- Se o CEP não for encontrado ou for inválido, o aplicativo exibe uma mensagem de erro.

## Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento de aplicativos móveis nativos.
- **React Native Paper**: Biblioteca de componentes para UI.
- **Fetch API**: Utilizada para fazer requisições HTTP à API ViaCEP.
- **API ViaCEP**: Serviço gratuito para busca de endereços a partir do CEP.

## Como Rodar o Projeto

### Requisitos

- Node.js
- React Native (Instale o React Native CLI ou use o Expo)
- Android Studio ou Xcode (para emular o aplicativo, caso necessário)

### Passos

1. Clone este repositório:

No terminal/ bash: git clone https://github.com/seu-usuario/busca-cep.git

2. Clone este repositório:

No terminal/ bash: cd busca-cep

3. Instale as dependências:

No terminal/ bash: npm i

4. Para rodar o aplicativo no emulador ou dispositivo:

ANDROID
No terminal/ bash: npx react-native run-android

IOS
No terminal/ bash: npx react-native run-ios

### Utilizando o aplicativo

- Abra o aplicativo em seu dispositivo ou emulador. Uso o expo. (https://expo.dev/)
- Insira um CEP válido no campo de entrada.
- Clique no botão "Buscar" para visualizar as informações do endereço.
- Se o CEP não for encontrado ou for inválido, uma mensagem de erro será exibida.

### Licença
Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para mais detalhes.

Laura Jane Antunes

