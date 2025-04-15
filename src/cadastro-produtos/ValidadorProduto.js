class ValidadorProduto {
    static validar(produto) {
        if (!produto.nome) throw new Error("Nome é obrigatório");
        if (produto.preco <= 0) throw new Error("Preço inválido");
    }
}

module.exports = ValidadorProduto;