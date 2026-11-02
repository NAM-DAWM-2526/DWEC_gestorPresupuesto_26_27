function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento)
    elemento.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto){
    let divGasto = document.createElement("div")
    divGasto.className = "gasto"


    let divDescripcion = document.createElement("div")
    divDescripcion.className = "gasto-descripcion"
    divDescripcion.textContent = gasto.descripcion

    let divFecha = document.createElement("div")
    divFecha.className = "gasto-fecha"
    divFecha.textContent = gasto.fecha

    let divValor = document.createElement("div")
    divValor.className = "gasto-valor"
    divValor.textContent = gasto.valor

    let divEtiqueta = document.createElement("div")
    divEtiqueta.className = "gasto-etiqueta"

    for(etiqueta of gasto.etiquetas){
        let spanEtiqueta = document.createElement("span")
        spanEtiqueta.textContent = etiqueta
        divEtiqueta.append(spanEtiqueta)
    }

    divGasto.append(divDescripcion)
    divGasto.append(divFecha)
    divGasto.append(divValor)
    divGasto.append(divEtiqueta)
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let divAgrupacion = document.createElement("div")
    divAgrupacion.className = "agrupacion"
    
    let h1 = document.createElement("h1")
    h1.textContent = `Gastos agrupados por ${periodo}`
    
    for(1 of 1){
        let divAgruDato = document.createElement("div")
        divAgrupacion.className = "agrupacion-dato"

        let spanClave = document.createElement("span")
        divAgrupacion.className = "agrupacion-dato-clave"
        spanClave.textContent = ""

        let spanValor = document.createElement("span")
        divAgrupacion.className = "agrupacion-dato-valor"
        spanValor.textContent = ""
    }
    
    /*switch(periodo){
        case "dia":
            break;
        case "mes":
            break;
        case "anyo":
            break;
    }*/
}
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}