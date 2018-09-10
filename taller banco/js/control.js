//Funcion que se ejecuta al cargar la pagina
$(document).ready(function(){
	let tabla = document.getElementById("tabla");
	//for que recorre todos los items almacenados en el localStorage segun la posicion de su KEY
	for (var i = 0; i < localStorage.length; i++) {
		loadLocalStorage(i+1,localStorage.getItem( localStorage.key( i )))	;
	}	
});
//Funcion para agregar los datos del formulario al grid de la tabla y a su vez almacenando sus datos en el localStorage
function addData(){

	let fecha = new Date(); 
	let strFecha = fecha.getFullYear() + "/" + (fecha.getMonth()+1) + "/" + fecha.getDate(); //Estructura de la fecha concatenando datos
	let nombre = document.getElementById("nombreM").value; //campo del nombre del movimiento
	let tipo = document.getElementById("tipoM").value; //campo del tipo de movimiento
	let valor = document.getElementById("valorM").value; //campo del valor de movimiento

	let tabla = document.getElementById("tabla"); //la tabla

	if(validations(nombre, tipo, valor)){ //validamos que todos los campos esten completos

	let fila = tabla.insertRow(tabla.rows.length); //insertamos un nuevo TR


	let columna1 = fila.insertCell(0); //insertamos columnas
	let columna2 = fila.insertCell(1); //insertamos columnas
	let columna3 = fila.insertCell(2); //insertamos columnas
	let columna4 = fila.insertCell(3); //insertamos columnas
	let columna5 = fila.insertCell(4); //insertamos columnas

	//definimos la estructura del boton, teniendo en cuenta un id "dinamico" segun el index de la fila, para asi saber que datos eliminar al
	//presionar el boton, enviando asi parametros a una funcion deleteData que es la encargada de gestionar su eliminacion
	let boton = '<input type="button" id="'+fila.rowIndex+'" class="btn btn-danger" onclick="deleteData(this,'+fila.rowIndex+')" value="Eliminar">'

	columna1.innerHTML = '<td>'+nombre+'</td>'; //enviamos los valores a las columnas de la tabla
	columna2.innerHTML = '<td>'+tipo+'</td>'; //enviamos los valores a las columnas de la tabla
	columna3.innerHTML = '<td>'+valor+'</td>'; //enviamos los valores a las columnas de la tabla
	columna4.innerHTML = '<td>'+strFecha+'</td>'; //enviamos los valores a las columnas de la tabla
	columna5.innerHTML = '<td>'+boton+'</td>'; //enviamos los valores a las columnas de la tabla

	savedLocalStorage(nombre, tipo, valor, strFecha, boton, fila.rowIndex); //almacenamos los datos en el localStorage

	cleanGrid(); //limpiamos los campos del formulario despues de su creación

	}else{
		//si hay campos vacios mostramos una alerta
		alert("Complete todos los campos para poder crear el Movimiento");
	}

}

//funcion encargada de eliminar los datos de la tabla y del localStorage
function deleteData(r,index){

	let row = r.parentNode.parentNode.rowIndex; //obtenemos el index de la fila a la cual vamos a eliminar
	let tabla = document.getElementById("tabla"); //definimos la tabla
	localStorage.removeItem("data"+index); //borramos el dato del localStorage
	tabla.deleteRow(row); //borramos el dato de la tabla

}

//funcion para limpiar los campos del formulario
function cleanGrid(){
	let nombre = document.getElementById("nombreM"); //campo de nombre
	let tipo = document.getElementById("tipoM"); // campo de tipo
	let valor = document.getElementById("valorM"); //campo de valor

	nombre.value = ""; //limpiamos 
	valor.value = ""; //limpiamos

}

//funcion que almacena los datos en el localStorage
function savedLocalStorage(nombre, tipo, valor, fecha, boton, index){

	//creamos el objeto con los datos a almacenar
	let data = {
		"nombre" : nombre,
		"tipo" : tipo,
		"valor" : valor,
		"fecha" : fecha,
		"btn" : boton
	}
	//enviamos los datos al localStorage haciendo uso de JSON para 
	//hacerle una conversion al objecto y poderla almacenar de forma correcta en el 
	//localStorage
	localStorage.setItem("data"+index, JSON.stringify(data));
}

//funcion para cargar los datos almacenados en el localStorage
function loadLocalStorage(index,data){

	//hacemos un parse a los datos almacenados en el localStorage y lo sacamos como un objeto
	let datos = JSON.parse(data);
	let tabla = document.getElementById("tabla"); //definicion de la talba
	let fila = tabla.insertRow(index); //insertamos la fila

	let columna1 = fila.insertCell(0); //insertamos una columna
	let columna2 = fila.insertCell(1); //insertamos una columna
	let columna3 = fila.insertCell(2); //insertamos una columna
	let columna4 = fila.insertCell(3); //insertamos una columna
	let columna5 = fila.insertCell(4); //insertamos una columna


	columna1.innerHTML = '<td>'+datos.nombre+'</td>'; //cargamos los datos a la columna
	columna2.innerHTML = '<td>'+datos.tipo+'</td>'; //cargamos los datos a la columna
	columna3.innerHTML = '<td>'+datos.valor+'</td>'; //cargamos los datos a la columna
	columna4.innerHTML = '<td>'+datos.fecha+'</td>'; //cargamos los datos a la columna
	columna5.innerHTML = '<td>'+datos.btn+'</td>'; //cargamos los datos a la columna
}

//funcion que valida que los datos del formulario esten completos
function validations(n,t,v){

	if(n == "" || t == "-Seleccione una opción-" || v == ""){
		return false;
	}else{
		return true;
	}

}



