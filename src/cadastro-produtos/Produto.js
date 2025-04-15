class Produto {
    constructor({ id, nome, preco }) {
        this.id = id || Date.now().toString();
        this.nome = nome;
        this.preco = preco;
    }
}

module.exports = Produto;