const Produto = require("./Produto");
const ValidadorProduto = require("./ValidadorProduto");

class ProdutoRepository {
    constructor() {
        this.produtos = [];
        this.contadorId = 1;
    }

    criarProduto(dados) {
        const produto = new Produto({
            id: this.contadorId++, // Atribui o próximo ID disponível
            nome: dados.nome,
            preco: dados.preco
        });
        ValidadorProduto.validar(produto);
        this.produtos.push(produto);
        return produto;
    }

    buscarPorId(id) {
        return this.produtos.find(p => p.id === id);
    }

    atualizarProduto(id, novosDados) {
        const produto = this.buscarPorId(id);
        if (produto) {
            Object.assign(produto, novosDados);
            ValidadorProduto.validar(produto);
        }
        return produto;
    }

    deletarProduto(id) {
        this.produtos = this.produtos.filter(p => p.id !== id);
    }
}

module.exports = ProdutoRepository;