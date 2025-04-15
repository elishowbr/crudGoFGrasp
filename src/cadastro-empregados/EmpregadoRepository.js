const Empregado = require("./Empregado");

class EmpregadoRepository {
    constructor() {
        this.empregados = [];
    }

    criarEmpregado(dados) {
        const empregado = new Empregado(dados);
        this.empregados.push(empregado);
        return empregado;
    }

    buscarPorId(id) {
        return this.empregados.find(e => e.id === id);
    }
}

module.exports = EmpregadoRepository;