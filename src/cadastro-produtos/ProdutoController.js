const ProdutoRepository = require("./ProdutoRepository");

class ProdutoController {
    constructor() {
        this.repository = new ProdutoRepository();
    }

    create(dados) {
        return this.repository.criarProduto(dados);
    }

    read(id) {
        return this.repository.buscarPorId(id);
    }

    update(id, novosDados) {
        return this.repository.atualizarProduto(id, novosDados);
    }

    delete(id) {
        return this.repository.deletarProduto(id);
    }
}

module.exports = ProdutoController;