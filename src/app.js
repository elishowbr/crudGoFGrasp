const ProdutoController = require("./cadastro-produtos/ProdutoController");
const EmpregadoController = require("./cadastro-empregados/EmpregadoController");
const SistemaNotificacao = require("./cadastro-empregados/SistemaNotificacao");
const EmpregadoServiceDecorator = require("./cadastro-empregados/EmpregadoServiceDecorator");

// Configuração do Observer
const notificacao = new SistemaNotificacao();
notificacao.addObserver({
    update: (evento, dados) => console.log(`[NOTIFICAÇÃO] ${evento}:`, dados)
});

// Logger para o Decorator
const logger = {
    log: (mensagem) => console.log(mensagem)
};

// Uso do Cadastro de Produtos
const produtoController = new ProdutoController();
const novoProduto = produtoController.create({ nome: "Notebook", preco: 5000 });
console.log("Produto criado:", novoProduto);

// Uso do Cadastro de Empregados (com Decorator)
const empregadoRepository = new (require("./cadastro-empregados/EmpregadoRepository"))();
const empregadoService = new EmpregadoServiceDecorator(
    { criarEmpregado: (dados) => empregadoRepository.criarEmpregado(dados) },
    logger
);
const empregadoController = new EmpregadoController(notificacao);
const novoEmpregado = empregadoController.create({ nome: "João", cargo: "Dev" });
console.log("Empregado criado:", novoEmpregado);