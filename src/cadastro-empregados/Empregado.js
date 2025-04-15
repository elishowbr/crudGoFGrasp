class Empregado {
    constructor({ id, nome, cargo }) {
        this.id = id || Date.now().toString();
        this.nome = nome;
        this.cargo = cargo;
    }
}

module.exports = Empregado;