class EmpregadoServiceDecorator {
    constructor(service, logger) {
        this.service = service;
        this.logger = logger;
    }

    criarEmpregado(dados) {
        this.logger.log(`[LOG] Criando empregado: ${dados.nome}`);
        return this.service.criarEmpregado(dados);
    }
}

module.exports = EmpregadoServiceDecorator;