# 🧮 Calculadora de Equações Diferenciais 🧮
[![NPM](https://img.shields.io/github/license/Alamito/CalcEDO-NodeJS)](https://github.com/Alamito/CalcEDO-NodeJS/blob/main/LICENSE)

# 📜 Sobre o projeto 📜

<p align="justify"> 
Projeto dedicado a construir uma "calculadora" que resolve equações diferenciais, conteúdo no qual, atualmente, estudo na faculdade de Engenharia da Computação (UFRGS).

Para a resolução do projeto foram desenvolvidos três sistemas: o Front, Back-End e o Servidor local (API).
</p>

### Front-End
<p align="justify"> 
Responsável por conter e apresentar ao usuário os elementos visuais do projeto, como a entrada de dados e o resultado da equação. Além disso, também é responsável por enviar a equação digitada pelo usuário para a API e, em seguida, esperar por uma <em>flag</em> sinalizando que já foram feitos os processos necessários para consumir a imgem de resultado da equação.
</p>

### Servidor local (API)
<p align="justify"> 
Responsável por fazer a troca de informções entre o Front e o Back-End. A API possui três campos: ID, equação e status. O <b>ID</b> contém a informção de onde serão feitas as requisições tipo <em>GET</em> e <em>PUT</em> onde, nesse caso, é o ID 1; <b>equação</b> contém o <em>input</em> do usuário; <b>status</b> contém a informação das movimentações do back-end.
</p>

### Back-End
<p align="justify"> 
Responsável por capturar o <em>input</em> de equação de usuário na API, após inicializar o <em>bot</em>, viajar até o site de resolução de EDO (https://mathdf.com/dif/pt/), inserir a equação no <em>input</em> da página, esperar ser gerada a resolucão da EDO, tirar uma screenshot da resolução e salvar localmente no usuário, depois informa para a API que tais passos já foram feitos. Além disso, a partir da primeira screenshot gerada, elas passam a serem excluídas assim que outras novas são geradas.
</p>

# 🎥 Apresentação do projeto 🎥

A seguir está representado visualmente o projeto, onde foram inseridas duas equações para o programa resolver:

https://user-images.githubusercontent.com/102616676/211840992-ccc035cf-2c3f-4312-b585-ee86d10cd474.mp4

# 🧬 Tecnologias utilizadas 🧬

- HTML5;
- CSS3;
- JavaScript
- Node.js
- Módulos Node: Axios, Puppeteer, Express, UUID e FS.

# ⏯ Como executar o projeto ⏯

### Requisitos

- NodeJS e NPM;
- Nodemon instalado de forma Global (pode ser usado instalado de maneira local, mas irá mudar a maneira de execução do projeto).

### Prompt de Comando 1
```bash
# clonar repositório
git clone https://github.com/Alamito/CalcEDO-NodeJS.git

# entrar no diretório do programa
cd "CalcEDO-NodeJS"

# inicializar o servidor
npm start
```

### Prompt de Comando 2
```bash
# inicializar o Back-End
npm test
```

### Prompt de Comando 3
```bash
# inicializar o Front-End
cd "front"
index.html
```

# ✍️ Autor ✍️
Alamir Bobroski Filho 
- www.linkedin.com/in/alamirdev

<p align = "center"><em>"O poder não vem do conhecimento mantido, mas do conhecimento compartilhado"</em></p> <p align = "center">Bill Gates</p>
