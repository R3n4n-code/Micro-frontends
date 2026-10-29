# 🍽️ Restaurante Ponto Sabor — Microfrontends

Projeto para portifolio desenvolvido utilizando a arquitetura de **Microfrontends** com **Webpack Module Federation**, React e JavaScript.

## Estrutura dos Microfrontends
Este ecossistema está dividido e hospedado de forma independente:
* **Host (Orquestrador):** [https://micro-frontends-five.vercel.app] - Une os módulos e gerencia a casca do app.
* **Micro-Cardápio:** [https://micro-frontends-cardapio.vercel.app/] - Responsável pela listagem e dados dos produtos.
* **Micro-Pedido:** [https://micro-frontends-pedido.vercel.app] - Responsável pelas regras de negócio do carrinho de compras.

---

# ⚙️ Tecnologias utilizadas

* React
* JavaScript
* Webpack
* Webpack Module Federation
* Babel
* HTML Webpack Plugin
* Webpack Dev Server

---

# Instalação

Primeiramente, clone ou baixe o projeto.

Depois, é necessário instalar as dependências de **cada aplicação separadamente**.

### Host

Entre na pasta:

```bash
cd host
```

Instale as dependências:

```bash
npm install
```

### microCardapio

Volte para a pasta principal:

```bash
cd ..
```

Entre no microfrontend:

```bash
cd microCardapio
```

Instale as dependências:

```bash
npm install
```

### microPedido

Volte novamente:

```bash
cd ..
```

Entre no `microPedido`:

```bash
cd microPedido
```

Instale as dependências:

```bash
npm install
```

---

# Como executar o projeto

É necessário executar os **três projetos ao mesmo tempo**, pois o Host depende dos dois microfrontends.

Cada aplicação utiliza uma porta diferente.


---

## 1. Executando o microCardapio

Abra um terminal na pasta:

```bash
cd microCardapio
```

Execute:

```bash
npm start
```

O microfrontend será executado em:

```text
http://localhost:3001
```

Além da aplicação, o Module Federation disponibiliza o arquivo:

```text
http://localhost:3001/remoteEntry.js
```

Esse arquivo permite que outras aplicações encontrem os módulos disponibilizados pelo `microCardapio`.

---

## 2. Executando o microPedido

Abra **outro terminal**.

Entre na pasta:

```bash
cd microPedido
```

Execute:

```bash
npm start
```

O `microPedido` será executado em:

```text
http://localhost:3002
```

Seu Module Federation também disponibiliza:

```text
http://localhost:3002/remoteEntry.js
```

---

## 3. Executando o Host

Abra um **terceiro terminal**.

Entre na pasta:

```bash
cd host
```

Execute:

```bash
npm start
```

O Host ficará disponível em:

```text
http://localhost:3000
```

A aplicação principal é responsável por carregar os dois microfrontends.

---

# 🔗 Como o Module Federation funciona

O projeto utiliza o **Webpack Module Federation** para permitir que uma aplicação utilize componentes de outra aplicação sem precisar copiar os arquivos.

Por exemplo, o `microCardapio` disponibiliza o componente `Grid`:

```js
new ModuleFederationPlugin({
    name: "microCardapio",

    filename: "remoteEntry.js",

    exposes: {
        "./Grid": "./src/Grid.jsx",
    },
})
```

---

## Consumindo o microCardapio

O Host registra o `microCardapio` e o `microPedido` como Remote:

```js
remotes: {
    microCardapio:
        "microCardapio@http://localhost:3001/remoteEntry.js",

    microPedido:
        "microPedido@http://localhost:3002/remoteEntry.js",
},
```

Assim, o Host sabe onde encontrar os microfrontends.

O componente pode então ser importado:

```js
import Grid from "microCardapio/Grid";
```

Dessa forma, o Host consegue utilizar o componente `Grid` que pertence ao `microCardapio`.

---

# 📡 Comunicação entre os microfrontends

Além do compartilhamento de componentes pelo Module Federation, os microfrontends também precisam trocar informações.

Neste projeto, a comunicação é realizada utilizando **eventos globais do navegador** através de:

```js
window.dispatchEvent()
```

e:

```js
window.addEventListener()
```

---

# Papel de cada aplicação

### 🏠 Host

É responsável por:

* Reunir os microfrontends.
* Carregar os Remotes.
* Disponibilizar a aplicação principal.
* Servir como ponto de entrada do sistema.

### 🍔 microCardapio

É responsável por:

* Exibir os produtos.
* Exibir nome, descrição, imagem e preço.
* Permitir que o usuário adicione produtos ao carrinho.
* Enviar produtos através de eventos globais.

### 🛒 microPedido

É responsável por:

* Receber produtos enviados pelo cardápio.
* Armazenar os produtos no carrinho.
* Exibir os itens adicionados.
* Calcular o preço total do pedido.

---

