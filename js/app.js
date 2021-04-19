// Variables
 const carrito = document.querySelector('#carrito');
 const contenedorCarrito = document.querySelector('#lista-carrito tbody');
 const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
 const listarCursos = document.querySelector('#lista-cursos');
 let articulosCarrito = [];

 cargarEventListeners();
 function cargarEventListeners() {
     // Cuando agregas un curso presionando "Agregar al Carrito"
    listarCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar carrito del curso
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // Reseteamos el arreglo

        limpiarHTML(); // Eliminamos todo el HTML
    })
 }

 // Funciones 
 function agregarCurso(e) {
     e.preventDefault();

     if ( e.target.classList.contains('agregar-carrito') ) {
     const cursoSeleccionado = e.target.parentElement.parentElement; 
     leerDatosCurso(cursoSeleccionado);
     }
 }

 function eliminarCurso(e) {
     if ( e.target.classList.contains('borrar-curso') ) {
         const cursoId = e.target.getAttribute('data-id');

         // Elimina el arreglo de carritos por el Data ID
         articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
         console.log(articulosCarrito);
         
         carritoHTML(); // Iterar sobre el carrito y mostrar su html
     }
 }

 // Lee el contenido del HTML donde damos clicks y extrae info del curso
 function leerDatosCurso(curso) {
    //console.log(curso);

    // Crear objeto con contenido de curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if (existe) {
        // Agregamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if ( curso.id === infoCurso.id  ) {
                curso.cantidad++;
                return curso;  // Retorna el objeto actualizado
            } else {
                return curso; // Retorna los obj que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {               
        // Agrega elementos al arreglo de Carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    

    carritoHTML();
 }

 // Muestra el carrito de compras en el HTML
 function carritoHTML() {

    // Limpiar HTML
    limpiarHTML();

    //Recorre carrito y genera HTML
     articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td> <a href="#" class="borrar-curso" data-id="${id}" > X </td>
        `;
        // Agrega HTML del carrito en el Ttbody
        contenedorCarrito.appendChild(row)
     })

    }
    
    // Elimina los cursos del tbody
function limpiarHTML() {

    // Forma lenta
    //contenedorCarrito.innerHTML = '';

    // forma rapida
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);

    }
 }