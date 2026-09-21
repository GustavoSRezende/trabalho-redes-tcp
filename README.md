# Servidor Web TCP 

Trabalho prático da disciplina de Redes de Computadores. Consiste em um servidor web construído do zero utilizando apenas o módulo nativo `net` do Node.js, sem uso de frameworks.

## Funcionalidades
- Criação e gerenciamento de conexões via **Sockets TCP**.
- Leitura e parser manual de requisições **HTTP** no backend.
- Validação de método (aceita apenas `GET`, retornando erro **405 Method Not Allowed** para outros).
- Roteamento nativo para a página principal (`/`) e página explicativa (`/sobre`), interligadas por links HTML.
- Tratamento de rotas inexistentes com devolução de erro **404 Not Found**.

## Como executar
1. Certifique-se de ter o Node.js instalado no seu computador.
2. Clone o repositório e abra o terminal na pasta do projeto.
3. Inicie o servidor com o comando:
   ```bash
   node server.js
