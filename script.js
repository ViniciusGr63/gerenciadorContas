class ContaBancaria {
    constructor(agencia, numero, tipo, saldo) {
        this.agencia = agencia;
        this.numero = numero;
        this.tipo = tipo;
        this.saldo = saldo;
    }

    extrato() {
        console.log(`Extrato da conta: Agência ${this.agencia}, Número ${this.numero}, Tipo ${this.tipo}, Saldo R$${this.saldo.toFixed(2)}`);
    }

    sacar(valor) {
        if (valor > 0 && valor <= this.saldo) {
            this.saldo -= valor;
            console.log(`Saque de R$${valor.toFixed(2)} realizado com sucesso.`);
        } else {
            console.log("Saldo insuficiente ou valor inválido para saque.");
        }
    }

    depositar(valor) {
        if (valor > 0) {
            this.saldo += valor;
            console.log(`Depósito de R$${valor.toFixed(2)} realizado com sucesso.`);
        } else {
            console.log("Valor inválido para depósito.");
        }
    }
}

class ContaCorrente extends ContaBancaria {
    constructor(agencia, numero, saldo, cartaoCredito) {
        super(agencia, numero, "Conta Corrente", saldo);
        this.cartaoCredito = cartaoCredito;
    }
}

class ContaPoupanca extends ContaBancaria {
    constructor(agencia, numero, saldo) {
        super(agencia, numero, "Conta Poupança", saldo);
    }
}

class ContaUniversitaria extends ContaBancaria {
    constructor(agencia, numero, saldo) {
        super(agencia, numero, "Conta Universitária", saldo);
    }

    sacar(valor) {
        if (valor > 0 && valor <= 500 && valor <= this.saldo) {
            this.saldo -= valor;
            console.log(`Saque de R$${valor.toFixed(2)} realizado com sucesso.`);
        } else {
            console.log("Saldo insuficiente ou valor inválido para saque.");
        }
    }
}

const contasObj = {};

function inserirConta() {
    const agencia = document.getElementById("agencia").value;
    const numero = document.getElementById("numero").value;
    const tipoConta = document.getElementById("tipoConta").value;
    const saldo = parseFloat(document.getElementById("saldo").value);

    let conta;
    if (tipoConta === "ContaCorrente") {
        const cartaoCredito = parseFloat(document.getElementById("cartaoCredito").value);
        conta = new ContaCorrente(agencia, numero, saldo, cartaoCredito);
    } else if (tipoConta === "ContaPoupanca") {
        conta = new ContaPoupanca(agencia, numero, saldo);
    } else if (tipoConta === "ContaUniversitaria") {
        conta = new ContaUniversitaria(agencia, numero, saldo);
    }

    contasObj[numero] = conta;
    console.log("Conta inserida com sucesso.");
}

function visualizarContas() {
    const listaContas = document.getElementById("listaContas");
    listaContas.innerHTML = "<h2>Contas Bancárias:</h2>";

    for (const numeroConta in contasObj) {
        const conta = contasObj[numeroConta];
        listaContas.innerHTML += `<p>Número: ${numeroConta}, Agência: ${conta.agencia}, Tipo: ${conta.tipo}, Saldo: R$${conta.saldo.toFixed(2)}</p>`;
    }
}

function sacarDepositarExtrato() {
    const numeroConta = document.getElementById("numeroConta").value;
    const operacao = document.getElementById("operacao").value;
    const valor = parseFloat(document.getElementById("valor").value);

    const conta = contasObj[numeroConta];

    if (conta) {
        switch (operacao) {
            case 'sacar':
                conta.sacar(valor);
                break;
            case 'depositar':
                conta.depositar(valor);
                break;
            case 'extrato':
                conta.extrato();
                break;
            default:
                console.log("Operação inválida.");
        }
    } else {
        console.log("Conta não encontrada.");
    }
}



function limparContas() {
    const listaContas = document.getElementById("listaContas");
    const saldoConta = document.getElementById("saldoConta");

    listaContas.innerHTML = "";
    saldoConta.innerHTML = "";
}

