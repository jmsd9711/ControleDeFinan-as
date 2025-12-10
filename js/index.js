var salario = parseFloat(localStorage.getItem("salario")) || 0
var despesas = JSON.parse(localStorage.getItem("despesas")) || []

atualizarDespesasTabela()
atualizarResumo()

function registrarSalario() {
    var campo = document.getElementById("salarioInput")
    var valor = parseFloat(campo.value)

    if (!valor || valor <= 0) {
        alert("Digite um salário válido")
        return
    }

    salario = valor
    localStorage.setItem("salario", salario)

    campo.value = ""
    atualizarResumo()
}

function registrarDespesa() {
    var data = document.getElementById("despesaData").value
    var nome = document.getElementById("despesaNome").value
    var valor = parseFloat(document.getElementById("despesaValor").value)

    if (data === "" || nome === "" || !valor || valor <= 0) {
        alert("Preencha todos os campos corretamente.")
        return
    }

    var novaDespesa = { data: data, nome: nome, valor: valor }
    despesas.push(novaDespesa)

    localStorage.setItem("despesas", JSON.stringify(despesas))

    document.getElementById("despesaData").value = ""
    document.getElementById("despesaNome").value = ""
    document.getElementById("despesaValor").value = ""

    atualizarDespesasTabela()
    atualizarResumo()
}


function atualizarDespesasTabela() {
    var tabela = document.getElementById("despesasTabela")
    tabela.innerHTML = ""

    for (var i = 0; i < despesas.length; i++) {
        var d = despesas[i]
        
        var tr = document.createElement("tr")

        var tdData = document.createElement("td")
        tdData.innerText = d.data
        tr.appendChild(tdData)

        var tdNome = document.createElement("td")
        tdNome.innerText = d.nome
        tr.appendChild(tdNome)

        var tdValor = document.createElement("td")
        tdValor.innerText = d.valor.toFixed(2)
        tr.appendChild(tdValor)

        tabela.appendChild(tr)
    }
}


function apagarUltimaDespesa() {
    if (despesas.length === 0) {
        alert("Não há despesas para apagar.")
        return
    }
    
    despesas.pop()
    
    localStorage.setItem("despesas", JSON.stringify(despesas))
    
    atualizarDespesasTabela()
    atualizarResumo()
    
    alert("Última despesa apagada com sucesso!")
}

function apagarTodasDespesas() {
    if (despesas.length == 0) {
        alert("Não há despesas para apagar.")
        return
    }
    
    if (confirm("Tem certeza que deseja apagar TODAS as despesas?")) {
        despesas = []
        
        localStorage.setItem("despesas", JSON.stringify(despesas))
        
        atualizarDespesasTabela()
        atualizarResumo()
        
        alert("Todas as despesas foram apagadas com sucesso!")
    }
}


function atualizarResumo() {
    var tabelaD = document.getElementById("resumoTabela")
    tabelaD.innerHTML = ""

    var total = 0

    for (var i = 0; i < despesas.length; i++) {
        var d = despesas[i]
        total += d.valor

        var saldoAposDespesa = salario - total

        var tr = document.createElement("tr")

        var tdSalario = document.createElement("td")
        tdSalario.innerText = salario.toFixed(2)
        tr.appendChild(tdSalario)

        var tdValorDespesa = document.createElement("td")
        tdValorDespesa.innerText = d.valor.toFixed(2)
        tr.appendChild(tdValorDespesa)

        var tdSaldo = document.createElement("td")
        tdSaldo.innerText = saldoAposDespesa.toFixed(2)
        tr.appendChild(tdSaldo)

        tabelaD.appendChild(tr)
    }

    var saldoFinal = salario - total
    document.getElementById("salarioValor").textContent = salario.toFixed(2)
    document.getElementById("despesasTotal").textContent = total.toFixed(2)
    document.getElementById("saldoFinal").textContent = saldoFinal.toFixed(2)
}