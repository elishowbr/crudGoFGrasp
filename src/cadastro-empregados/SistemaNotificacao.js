class SistemaNotificacao {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notificar(evento, dados) {
        this.observers.forEach(obs => obs.update(evento, dados));
    }
}

module.exports = SistemaNotificacao;