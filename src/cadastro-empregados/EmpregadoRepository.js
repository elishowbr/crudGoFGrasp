const Empregado = require("./Empregado");

class EmpregadoRepository {
    constructor() {
        this.empregados = [];
        this.contadorId = 1;
    }

    criarEmpregado(dados) {
        const empregado = new Empregado({
            id: this.contadorId++,
            nome: dados.nome,
            cargo: dados.cargo
        });
        this.empregados.push(empregado);
        return empregado;
    }

    buscarPorId(id) {
        return this.empregados.find(e => e.id === id);
    }
}

module.exports = EmpregadoRepository;