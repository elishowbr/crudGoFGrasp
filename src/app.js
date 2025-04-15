const readline = require('readline');
const ProdutoController = require('./cadastro-produtos/ProdutoController');
const EmpregadoController = require('./cadastro-empregados/EmpregadoController');
const SistemaNotificacao = require('./cadastro-empregados/SistemaNotificacao');

// Configuração do sistema
const notificacao = new SistemaNotificacao();
notificacao.addObserver({
    update: (evento, dados) => console.log(`\n[NOTIFICAÇÃO] ${evento}:`, dados)
});

const produtoController = new ProdutoController();
const empregadoController = new EmpregadoController(notificacao);

// Interface de leitura
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função para exibir o menu principal
function mostrarMenuPrincipal() {
    console.log('\n=== SISTEMA DE GESTÃO ===');
    console.log('1. Cadastro de Produtos');
    console.log('2. Cadastro de Empregados');
    console.log('3. Sair');
    rl.question('Escolha uma opção: ', (opcao) => {
        switch (opcao) {
            case '1':
                mostrarMenuProdutos();
                break;
            case '2':
                mostrarMenuEmpregados();
                break;
            case '3':
                console.log('Saindo do sistema...');
                rl.close();
                break;
            default:
                console.log('Opção inválida!');
                mostrarMenuPrincipal();
        }
    });
}

// Menu de Produtos
function mostrarMenuProdutos() {
    console.log('\n=== CADASTRO DE PRODUTOS ===');
    console.log('1. Criar Produto');
    console.log('2. Listar Produtos');
    console.log('3. Buscar Produto por ID');
    console.log('4. Atualizar Produto');
    console.log('5. Remover Produto');
    console.log('6. Voltar ao menu principal');
    rl.question('Escolha uma opção: ', async (opcao) => {
        switch (opcao) {
            case '1':
                await criarProduto();
                break;
            case '2':
                listarProdutos();
                break;
            case '3':
                await buscarProduto();
                break;
            case '4':
                await atualizarProduto();
                break;
            case '5':
                await removerProduto();
                break;
            case '6':
                mostrarMenuPrincipal();
                break;
            default:
                console.log('Opção inválida!');
                mostrarMenuProdutos();
        }
    });
}

// Menu de Empregados
function mostrarMenuEmpregados() {
    console.log('\n=== CADASTRO DE EMPREGADOS ===');
    console.log('1. Criar Empregado');
    console.log('2. Listar Empregados');
    console.log('3. Voltar ao menu principal');
    rl.question('Escolha uma opção: ', (opcao) => {
        switch (opcao) {
            case '1':
                criarEmpregado();
                break;
            case '2':
                listarEmpregados();
                break;
            case '3':
                mostrarMenuPrincipal();
                break;
            default:
                console.log('Opção inválida!');
                mostrarMenuEmpregados();
        }
    });
}

// Operações de Produto
async function criarProduto() {
    rl.question('Nome do produto: ', (nome) => {
        rl.question('Preço do produto: ', (preco) => {
            try {
                const produto = produtoController.create({
                    nome,
                    preco: parseFloat(preco)
                });
                console.log('Produto criado com sucesso:', produto);
            } catch (error) {
                console.error('Erro ao criar produto:', error.message);
            } finally {
                mostrarMenuProdutos();
            }
        });
    });
}

function listarProdutos() {
    // Como estamos usando arrays em memória, precisamos acessar o repository diretamente
    // Em uma aplicação real, isso seria substituído por produtoController.list()
    if (produtoController.repository.produtos.length === 0) {
        console.log('Nenhum produto cadastrado.');
    } else {
        console.log('\n=== PRODUTOS CADASTRADOS ===');
        produtoController.repository.produtos.forEach(produto => {
            console.log(`ID: ${produto.id} | Nome: ${produto.nome} | Preço: R$ ${produto.preco.toFixed(2)}`);
        });
    }
    mostrarMenuProdutos();
}

async function buscarProduto() {
    rl.question('ID do produto: ', (id) => {
        const produto = produtoController.read(id);
        if (produto) {
            console.log('Produto encontrado:', produto);
        } else {
            console.log('Produto não encontrado.');
        }
        mostrarMenuProdutos();
    });
}

async function atualizarProduto() {
    rl.question('ID do produto a ser atualizado: ', (id) => {
        const produto = produtoController.read(id);
        if (!produto) {
            console.log('Produto não encontrado.');
            return mostrarMenuProdutos();
        }

        rl.question(`Novo nome (atual: ${produto.nome}): `, (nome) => {
            rl.question(`Novo preço (atual: ${produto.preco}): `, (preco) => {
                try {
                    const atualizado = produtoController.update(id, {
                        nome: nome || produto.nome,
                        preco: preco ? parseFloat(preco) : produto.preco
                    });
                    console.log('Produto atualizado com sucesso:', atualizado);
                } catch (error) {
                    console.error('Erro ao atualizar produto:', error.message);
                } finally {
                    mostrarMenuProdutos();
                }
            });
        });
    });
}

async function removerProduto() {
    rl.question('ID do produto a ser removido: ', (id) => {
        const produto = produtoController.read(id);
        if (!produto) {
            console.log('Produto não encontrado.');
        } else {
            produtoController.delete(id);
            console.log('Produto removido com sucesso.');
        }
        mostrarMenuProdutos();
    });
}

// Operações de Empregado
function criarEmpregado() {
    rl.question('Nome do empregado: ', (nome) => {
        rl.question('Cargo do empregado: ', (cargo) => {
            try {
                const empregado = empregadoController.create({ nome, cargo });
                console.log('Empregado criado com sucesso:', empregado);
            } catch (error) {
                console.error('Erro ao criar empregado:', error.message);
            } finally {
                mostrarMenuEmpregados();
            }
        });
    });
}

function listarEmpregados() {
    // Acessando diretamente o repository (em memória)
    if (empregadoController.repository.empregados.length === 0) {
        console.log('Nenhum empregado cadastrado.');
    } else {
        console.log('\n=== EMPREGADOS CADASTRADOS ===');
        empregadoController.repository.empregados.forEach(empregado => {
            console.log(`ID: ${empregado.id} | Nome: ${empregado.nome} | Cargo: ${empregado.cargo}`);
        });
    }
    mostrarMenuEmpregados();
}

// Iniciar o sistema
console.log('Bem-vindo ao Sistema de Gestão de Cadastros');
mostrarMenuPrincipal();

// Fechar corretamente ao sair
rl.on('close', () => {
    process.exit(0);
});