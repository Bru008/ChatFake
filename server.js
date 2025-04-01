const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(http);

// Servir arquivos estáticos da pasta 'public'
app.use(express.static('public')); // Serve a pasta public para arquivos estáticos como imagens, css, js.

// Rota para a página principal
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

// Evento quando o cliente se conecta ao servidor
io.on('connection', (socket) => {
    console.log('Usuário conectado');
    
    // Evento para cliente enviar mensagem
    socket.on('chat message', (data) => io.emit('chat message', data));

    // Evento para o cliente se desconectar do servidor
    socket.on('disconnect', () => console.log('Usuário desconectado'));
});

// Iniciar o servidor na porta 3000
http.listen(3000, () => {
    console.log('Servidor rodando na porta 3000 - Link http://localhost:3000');
});
