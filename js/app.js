const ingresos = [
  new Ingreso("Salario", 2100),
  new Ingreso("Venta auto", 1500),
];

const egresos = [
  new Egreso("Pago de Alquiler", 1500),
  new Egreso("compra ropa", 1000)
];

let cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
};

let totalIngresos = () => {
  let totalIngreso = 0;
  for (let ingreso of ingresos) {
    totalIngreso += ingreso.valor;
  }
  return totalIngreso;
};

let totalEgresos = () => {
  let totalEgreso = 0;
  for (let egreso of egresos) {
    totalEgreso += egreso.valor;
  }
  return totalEgreso;
};
let cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgresos();
  let porcentajeEgreso = totalEgresos() / totalIngresos();
  document.getElementById("presupuestos").innerHTML = formatoMoneda(
    presupuesto
  );
  document.getElementById("porcentaje").innerHTML = formatoPorcentaje(
    porcentajeEgreso
  );
  document.getElementById("ingresos").innerHTML = formatoMoneda(
    totalIngresos()
  );
  document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
};

const formatoMoneda = (valor) => {
  return valor.toLocaleString("es-BOB", {
    style: "currency",
    currency: "BOB",
    minimumFractionDigits: 2,
  });
};

const formatoPorcentaje = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  });
};

const cargarIngresos = () => {
  let ingresosHTML = "";
  for (let ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(ingreso);
  }
  document.getElementById("lista_ingresos").innerHTML = ingresosHTML;
};

const crearIngresoHTML = (ingreso) => {
  let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline" onclick='borrarIngreso(${ingreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
  return ingresoHTML;
};

//eliminar ingresos 

const borrarIngreso =(id)=>{
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();   
}
const cargarEgresos = () => {
  let egresosHTML = "";
  for (let egreso of egresos) {
    egresosHTML += crearEgresoHTML(egreso);
  }
  document.getElementById("lista-egresos").innerHTML = egresosHTML;
};

const crearEgresoHTML = (egreso) => {
  let egresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
         <div class="derecha limpiarEstilos">
        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
        <button class="elemento_eliminar--btn">
            <ion-icon name="close-circle-outline" onclick='borrarEgreso(${egreso.id})'></ion-icon>
        </button>
        </div>
    </div>
    `;
  return egresoHTML;
};

// eliminar egresos
const borrarEgreso =(id)=>{
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();   
}
//formulario


let agregarDato = ()=>{
    let forma = document.getElementById('forma').innerHTML;
    let tipo = document.getElementById('tipo');
    let descripcion = document.getElementById('descripcion');
    let valor = document.getElementById('valor');
     if (descripcion.value !=='' && valor.value !=='') {
         if (tipo.value === 'ingreso') {
             ingresos.push(new Ingreso(descripcion.value, Number(valor.value)));
             cargarCabecero();
             cargarIngresos();
         }
         else if (tipo.value === 'egreso') {
             egresos.push(new Egreso(descripcion.value, Number(valor.value)));
             cargarCabecero();
             cargarEgresos();
         }
     }else{
         document.getElementById('mensaje').innerHTML = "No se puede agregar datos vacios!!!";
     }
}



