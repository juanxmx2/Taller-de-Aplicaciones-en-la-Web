/*
 * Ejercicio 3: Duplicar el contenido de los valores del arreglo
 *
 * e.g. [2, 3, 4] -> [4, 6, 8]
 *
 * Autor:
 * Fecha: 
 *
 */


 var arrayDoble = function(array, callback) {

   		for (var i = array.length - 1; i >= 0; i--) {
   			array[i] = callback(array[i]);
   		}
 };

 var array = [2, 3, 4];

 arrayDoble(array, function(value) {
  	return value * 2;
 });

// Prueba (No modificar!)
if (array.length === 3 &&
    array[0] === 4 &&
    array[1] === 6 &&
    array[2] === 8) {
  console.log('Ejercicio 3 paso el test!');
} else {
  console.log('Ejercicio 3 no paso el test!');
}
