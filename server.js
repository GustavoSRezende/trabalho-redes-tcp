const net = require('net'); //importando o modulo net do Node.js para criar um servidor TCP

const PORTA = 8080; //porta que o servidor vai escutar

const servidor = net.createServer((socket) => { //cria o servidor, socket e a conexao individual, se 5 pessoas se conectarem, cada uma terá seu socket individual
    socket.on('data', (dados) => { //o evento 'data' e disparado quando o servidor recebe dados do cliente
        const requisicao = dados.toString(); //transforma os dados recebidos em string
        
        console.log('\n--- REQUISIÇÃO COMPLETA ---');
        console.log(requisicao);
        console.log('---------------------------\n');

        //pega a primeira linha da requisicao, que contem o metodo, a rota e a versao do protocolo
        const primeiraLinha = requisicao.split('\r\n')[0];
        //entao ele pega algo como "GET /sobre HTTP/1.1" e separa em um array ["GET", "/sobre", "HTTP/1.1"]
        const metodo = primeiraLinha.split(' ')[0]; //extrai o método da requisição
        const rota = primeiraLinha.split(' ')[1];  //separa mais uma vez e pega o segundo elemento do array, que é a rota pedida pelo navegador, no caso "/sobre" ou "/"
        
        console.log(`---> O navegador pediu o método ${metodo} para a rota: ${rota}`); //exibe no console qual rota foi pedida pelo navegador

        //valida se a requisição é do tipo GET
        if (metodo === 'GET') {
            
            //entra no caso de if dependendo da rota pedida pelo navegador, se for a rota principal "/" ele envia a pagina principal, se for a rota "/sobre" ele envia a pagina sobre redes de computadores, se for qualquer outra rota ele envia a pagina de erro 404
            if (rota === '/') {
                const html = "<html><body><h1>Pagina Principal</h1><p>Pagina principal do servidor TCP.</p></body></html>"; //define o corpo da resposta, que é o conteudo que será exibido no navegador
                
                socket.write("HTTP/1.1 200 OK\r\n"); //socket write para enviar a resposta HTTP para o navegador
                                                     //identifica o http e o status 200 da resposta 
                socket.write("Content-Type: text/html; charset=utf-8\r\n\r\n"); ////define o tipo de conteudo da resposta como HTML e o charset como UTF-8 pra poder exibir acentos e caracteres especiais
                socket.write(html); //envia o corpo da resposta, que é o conteudo que será exibido no navegador
            } 
            else if (rota === '/sobre') { //se a rota pedida pelo navegador for "/sobre", ele envia a pagina sobre redes de computadores
                //define o corpo da resposta, o que vai ser exibido la 
                const html = ` 
                    <html>
                    <body>
                        <h1>Sobre Redes de Computadores</h1>
                        <ul>
                            <li><b>Socket:</b> É a porta de comunicação entre dois programas na rede.</li>
                            <li><b>TCP:</b> Protocolo da Camada de Transporte que garante a entrega dos dados.</li>
                            <li><b>HTTP:</b> Protocolo da Camada de Aplicação que formata a comunicação Web.</li>
                        </ul>
                    </body>
                    </html>
                `;
                
                socket.write("HTTP/1.1 200 OK\r\n"); 
                socket.write("Content-Type: text/html; charset=utf-8\r\n\r\n");
                socket.write(html);
            } 
            else {
                //se não for nenhuma das anteriores, devolve o Erro 404
                const html = "<html><body><h1>Erro 404</h1><p>Ops! Página não encontrada.</p></body></html>";
                
                socket.write("HTTP/1.1 404 Not Found\r\n");
                socket.write("Content-Type: text/html; charset=utf-8\r\n\r\n");
                socket.write(html);
            }
            
        } else {
            //se o método não for GET, devolve o Erro 405
            const html = `<html><body><h1>Erro 405</h1><p>Método ${metodo} não permitido. O servidor aceita apenas requisições GET.</p></body></html>`;
            
            socket.write("HTTP/1.1 405 Method Not Allowed\r\n");
            socket.write("Content-Type: text/html; charset=utf-8\r\n\r\n");
            socket.write(html);
        }

        socket.end(); //encerra a conexao com o cliente (navegador) apos enviar a resposta
    });
    
    socket.on('error', (err) => { //o evento 'error' é disparado quando ocorre algum erro na conexao
        console.log('Conexao interrompida:', err.message); //evita que o servidor quebre caso o cliente feche a conexao antes do servidor enviar a resposta
    });
});

servidor.listen(PORTA, () => { //faz o servidor escutar a porta definida, fica num loop infinito esperando conexoes
    console.log(`Servidor funcionando Acesse: http://localhost:${PORTA}`);
});