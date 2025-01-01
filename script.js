let api = "https://www.omdbapi.com/?i=tt3896198&apikey=47f2b163&t="

let title = document.getElementById('title');
let director = document.getElementById('director');
let actors = document.getElementById('actors');
let date = document.getElementById('date');
let ratings = document.getElementById('ratings');
let language = document.getElementById('language');
let country = document.getElementById('country');
let awards = document.getElementById('awards');
let writer = document.getElementById('writer');
let genre = document.getElementById('genre');
let collection = document.getElementById('collection');
let desc = document.getElementById('desc');
let poster = document.getElementById('Poster');
let container = document.querySelector('.container');

// Hide the container initially
document.addEventListener("DOMContentLoaded", () => {
    container.style.display = "none";
});

function searchMovie() {
    let movieName = document.getElementById('movieName').value.trim();

    if (movieName === "") {
        alert("Please enter a movie name");
        return;
    }

    let query = api + encodeURIComponent(movieName); // Properly encode the movie name for the query

    fetch(query)
        .then((response) => {
            if (!response.ok) {
                console.error('Failed to fetch data:', response.statusText);
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log('Received data:', data); // Log the data for debugging
            if (data.Response === "False") {
                alert("Movie not found! Please try another name.");
                container.style.display = "none"; // Hide the container if the movie is not found
                return;
            }

            // Populate the content with movie details
            title.innerText = data.Title || "N/A";
            director.innerText = data.Director || "N/A";
            actors.innerText = data.Actors || "N/A";
            date.innerText = data.Released || "N/A";
            ratings.innerText = data.imdbRating || "N/A";
            language.innerText = data.Language || "N/A";
            country.innerText = data.Country || "N/A";
            awards.innerText = data.Awards || "N/A";
            writer.innerText = data.Writer || "N/A";
            genre.innerText = data.Genre || "N/A";
            collection.innerText = data.BoxOffice || "N/A";
            desc.innerText = data.Plot || "N/A";
            poster.src = data.Poster || "https://via.placeholder.com/300x430?text=No+Image";

            // Show the container
            container.style.display = "flex";
        })
        .catch((error) => {
            console.error("Error fetching movie data:", error);
            alert("Something went wrong. Please try again later.");
        });
}
