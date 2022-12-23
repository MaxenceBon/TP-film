const button = document.querySelector("button")
const input = document.querySelector("input")


//Test avec touche Enter//
$("input").keyup(function (e) { 
//input.addEventListener('keyup', (e) => {   
 if (event.keyCode === 13){ 
  const title = input.value

  fetch(`http://www.omdbapi.com/?s=${title}&apikey=f6e256e1`)
    .then(response => response.json())
    .then(movies => {
      console.log(movies)
      displayMovies(movies)
    })
}
})

$("button").click(function (e) { 
//button.addEventListener('click', (e) => {
  const title = input.value

  fetch(`http://www.omdbapi.com/?s=${title}&apikey=f6e256e1`)
    .then(response => response.json())
    .then(movies => {
      console.log(movies)
      displayMovies(movies)
    })
})

function displayMovies(movies) {
  const div = document.querySelector("#movies")

  let html = `<table class="table table-striped table-bordered table-responsive text-center align-middle">
                  <thead>
                    <tr>`
  html += displayHeaders(movies.Search[0])
  html += `
                      </tr>
                  </thead>`


  movies.Search.forEach(movie => {
    html += displayMovie(movie)
  })

  html += `</table>`

  div.innerHTML = html

}

//Lien vers la page imdb du film à partir de l'imbdID, plutot que de créer une page -> Exercice non complet//
//Lien à partir du titre du film ou de l'image//
function displayMovie(movie) {
  let html = '<tr>'

  for (const prop in movie) {
    if (prop == "Poster"){
      html += `<td style="width:25%"><a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank"><img src="${movie[prop]}" alt="${movie.Title}" style="width:50%;height:50%;"></td>`
    } 
    else if (prop == "Title"){
      html += `<td style="width:15%"><a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">${movie[prop]}</td>`
    } else {
      html += `<td style="width:15%">${movie[prop]}</td>`
    }

  }

  html += "</tr>"

  return html

}

function displayHeaders(movie) {
  let html = ''
  for (const prop in movie) {
    html += `<th>${prop}</th>`
  }
  return html
}
