import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
}

function repintar(){
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());

    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());

    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";

    let gastos = gestionPresupuesto.listarGastos();
    for (let gasto of gastos) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb(){
    let presupuesto = prompt("Introduce el nuevo presupuesto: ");
    
    presupuesto = parseFloat(presupuesto);

    gestionPresupuesto.actualizarPresupuesto(presupuesto);

    repintar();
}

let botonActualizar = document.getElementById("actualizarpresupuesto");
botonActualizar.addEventListener("click", actualizarPresupuestoWeb);



function nuevoGastoWeb(){
    let descripcion = prompt("Introduce la descripcion: ");
    let valor = prompt("Introduce el valor: ");
    let fecha = prompt("Introduce la fecha: ");
    let etiquetasPrompt = prompt("Introduce las etiquetas: ");

    valor = parseFloat(valor);

    let etiquetas = etiquetasPrompt.split(',');

    let gasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    
    gestionPresupuesto.anyadirGasto(gasto);

    
    repintar();
}   

let botonAnyadir = document.getElementById("anyadirgasto");
botonAnyadir.addEventListener("click", nuevoGastoWeb);

function EditarHandle() {
    this.handleEvent = function () {
        let descripcion = prompt("Introduce la nueva descripcion: ", this.gasto.descripcion);
        let valor = prompt("Introduce el nuevo valor: ", this.gasto.valor);
        let fecha = prompt("Introduce la nueva fecha: ", new Date(this.gasto.fecha).toISOString().slice(0, 10));
        let etiquetasPrompt = prompt("Introduce las etiquetas: ", this.gasto.etiquetas.join(","));

        valor = parseFloat(valor);

        let etiquetas = etiquetasPrompt.split(',');

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas);

        repintar();
    }
}

function BorrarHandle() {
    this.handleEvent = function () {
        gestionPresupuesto.borrarGasto(this.gasto.id);

        repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function () {
        this.gasto.borrarEtiquetas(this.etiqueta);

        repintar();
    };
}

function mostrarGastoWeb(idElemento, gasto){
    let divGasto = document.createElement("div")
    divGasto.className = "gasto"


    let divDescripcion = document.createElement("div")
    divDescripcion.className = "gasto-descripcion"
    divDescripcion.textContent = gasto.descripcion

    let divFecha = document.createElement("div")
    divFecha.className = "gasto-fecha"
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();

    let divValor = document.createElement("div")
    divValor.className = "gasto-valor"
    divValor.textContent = gasto.valor

    let divEtiqueta = document.createElement("div")
    divEtiqueta.className = "gasto-etiquetas"

    for(let etiqueta of gasto.etiquetas){
        let spanEtiqueta = document.createElement("span")
        spanEtiqueta.className = "gasto-etiquetas-etiqueta"
        spanEtiqueta.textContent = etiqueta

        let borrarEtiqueta = new BorrarEtiquetasHandle();
        borrarEtiqueta.gasto = gasto;
        borrarEtiqueta.etiqueta = etiqueta;
        spanEtiqueta.addEventListener("click", borrarEtiqueta);

        divEtiqueta.append(spanEtiqueta)
    }

    divGasto.append(divDescripcion)
    divGasto.append(divFecha)
    divGasto.append(divValor)
    divGasto.append(divEtiqueta)

    let botonEditar = document.createElement("button");
    botonEditar.type = "button";
    botonEditar.className = "gasto-editar";
    botonEditar.textContent = "Editar";

    let editar = new EditarHandle();
    editar.gasto = gasto;
    botonEditar.addEventListener("click", editar);
    divGasto.append(botonEditar);

    
    let botonBorrar = document.createElement("button");
    botonBorrar.type = "button";
    botonBorrar.className = "gasto-borrar";
    botonBorrar.textContent = "Borrar";

    let borrar = new BorrarHandle();
    borrar.gasto = gasto;
    botonBorrar.addEventListener("click", borrar);
    divGasto.append(botonBorrar);

    let elemento = document.getElementById(idElemento)
    elemento.append(divGasto)
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let divAgrupacion = document.createElement("div")
    divAgrupacion.className = "agrupacion"
    
    let h1 = document.createElement("h1")
    h1.textContent = `Gastos agrupados por ${periodo}`
    divAgrupacion.append(h1)
    
    for(let [clave,valor] of Object.entries(agrup)){
        let divAgruDato = document.createElement("div")
        divAgruDato.className = "agrupacion-dato"

        let spanClave = document.createElement("span")
        spanClave.className = "agrupacion-dato-clave"
        spanClave.textContent = clave

        let spanValor = document.createElement("span")
        spanValor.className = "agrupacion-dato-valor"
        spanValor.textContent = valor

        divAgruDato.append(spanClave)
        divAgruDato.append(spanValor)
        divAgrupacion.append(divAgruDato)
    }
    let elemento = document.getElementById(idElemento)
    elemento.append(divAgrupacion)
}
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}