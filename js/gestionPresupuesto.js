// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(intro) {
    if(typeof intro === "number" && intro >= 0)
    {
        presupuesto = intro;
        return intro
    }
    else
    {
        console.log(`Error, el valor introducido es negativo o no es un numero`)
        return -1
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`
}
function CrearGasto(descripcion, valor, fecha, ... etiquetas){

    this.descripcion = String(descripcion);

    if (typeof valor === "number" && valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    if (fecha !== undefined && !isNaN(Date.parse(fecha))) {
        this.fecha = Date.parse(fecha);
    } else {
        this.fecha = Date.now();
    }
    
    this.etiquetas = [];

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = String(nuevaDescripcion);
    };

    this.actualizarValor = function(nuevoValor) {
        if (typeof nuevoValor === "number" && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    };

    this.mostrarGastoCompleto = function(){
        let texto =`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n
                    Fecha: ${toLocaleString(this.fecha)}\n
                    Etiquetas:\n`;
        for(let etiqueta of this.etiquetas){
            texto += `- ${etiqueta} \n`;
        }
    }

    this.actualizarFecha = function (nuevaFecha) {

    let fechaNueva = Date.parse(nuevaFecha);

    if (!isNaN(fechaNueva)) {
        this.fecha = fechaNueva;
    }
};

    this.anyadirEtiquetas = function(...nuevasEtiquetas){
        for(let etiqueta of nuevasEtiquetas){
            if(!this.etiquetas.includes){
                this.etiquetas.push(etiqueta);
            }
        }
    }

    this.borrarEtiquetas = function(...etiquetasABorrar){

    }
    this.anyadirEtiquetas(...etiquetas);
}

function listarGastos (){
    return gastos;
}

function anyadirGasto (gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto (id){
    gastos = gastos.filter(gasto => gasto.id !== id);
}

function calcularTotalGastos (){
    let total = 0;
    for (let gasto of gastos) {
        total += gasto.valor;
    }
    return total;
}

function calcularBalance (){
    return presupuesto - calcularTotalGastos();
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
