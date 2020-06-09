
document.querySelector('#generar-nombre').addEventListener('submit', cargarNombres);

//Llamada a Ajax e imprimir resultados
function cargarNombres(e){
    e.preventDefault();

    // Create a new moment object
        var now = moment();

        console.log(now);


    //Leer las variables

    const origen = document.getElementById('origen');
    const origenSeleccionado = origen.options[origen.selectedIndex].value;

    /*const genero = document.getElementById('genero');
    const generoSeleccionado = genero.options[genero.selectedIndex].value;*/

    let url = '';
    url = 'https://rickandmortyapi.com/api/character/';
    // Si hay origen agregarlo a la URL
    
    if(origenSeleccionado !== '') {
        url += `?name=${origenSeleccionado}`;     
    }
    
/*
    // Si hay un genero agregarlo a la URL
    if(generoSeleccionado !== ''){
        url += `character/?gender=${generoSeleccionado}&`;
    }
    */

    /*
    // Si hay una cantidad agregarlo a la URL
    if(cantidad !== '') {
        url += `results=${cantidad}&`;
    }
    console.log(url);
    */
    //Conectar con Ajax
    //Iniciar XMLHTTPRequest
    const xhr = new XMLHttpRequest();
    //Abrimos la conexion
    xhr.open('GET', url, true);
    //Datos e impresion del Template
    xhr.onload = function(){
        if(this.status === 200) {
            const personajes = JSON.parse( this.responseText) ;


            
            //Generar el HTML
            let htmlNombres = '<h2 class="col-12">Personajes</h2>';

           // htmlNombres += '<ul class="lista">';

            console.log(personajes.results);
            //imprimir cada nombre
            //let pepe = nombres.results[0].name;

            //consaole.log(pepe);

            console.log(personajes);

            personajes.results.map((personaje) => {
                if(`${personaje.name}` == origenSeleccionado){
                    let fecha = personaje.created;
                    console.log(fecha);
                    let newfecha = moment("20111031", "YYYYMMDD").fromNow();
                    //let date = fecha.toDateString();
                    console.log(newfecha);
                    return htmlNombres += `<div class="col-md-4">
                    <div class="card card-contenedor" style="width: 18rem;">
                    <img src="${personaje.image}" class="card-img-top" alt="img">
                    <div class="card-body">
                      <h5 class="card-title titulo-card">${personaje.name}</h5>
                      <p class="card-text parrafo-card">Id: ${personaje.id} - created ${newfecha}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item lista">STATUS: ${personaje.status}</li>
                      <li class="list-group-item lista">SPECIES: ${personaje.species}</li>
                      <li class="list-group-item lista">GENDER: ${personaje.gender}</li>
                      <li class="list-group-item lista"><span class="s-origin">ORIGIN:</span><p class="p-origin">${personaje.origin.name}</p></li>
                      <li class="list-group-item lista"><span class="s-location">LAST LOCATION:</span><p class="p-location">${personaje.location.name}</p></li>
                    </ul>
                    <div class="card-body">
                    <p class="firma">@aldy</p>
                    </div>
                  </div> 
                  </div>
                  `
                }  
            });


           // htmlNombres += '</ul>';

            document.getElementById('resultado').innerHTML = htmlNombres;
        }
    }
    // Enviar el Request
    xhr.send();
    
}