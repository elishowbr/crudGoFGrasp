const EmpregadoRepository = require("./EmpregadoRepository");
const SistemaNotificacao = require("./SistemaNotificacao");

class EmpregadoController {
    constructor(notificacao) {
        this.repository = new EmpregadoRepository();
        this.notificacao = notificacao;
    }

    create(dados) {
        const empregado = this.repository.criarEmpregado(dados);
        this.notificacao.notificar("EMPREGADO_CRIADO", empregado);
        return empregado;
    }
}

module.exports = EmpregadoController;