const Produto = require("./Produto");
const ValidadorProduto = require("./ValidadorProduto");

class ProdutoRepository {
    constructor() {
        this.produtos = [];
    }

    criarProduto(dados) {
        const produto = new Produto(dados);
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