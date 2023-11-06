const toTopButton = document.getElementById("toTopBtn");
const scrolableDiv = document.getElementById("gallery-container");
const imageButton = document.querySelector("img");
const list = document.querySelector("#movies");
const overlay = document.getElementById('overlay');
const overlayContent = document.getElementById('text');
let topMovies = [];


generateContent();

async function generateContent() {
    let topMoviesList = await getTopMovies();
    createMovieElements(topMoviesList);
    addOverlayListeners();
};

async function getTopMovies() {
    try {
        const response = await axios
            .get("https://imdb-api.com/en/API/Top250Movies/k_f3k6y4d2")
            .then((response) => {
                response.data.items.forEach((item) => {
                    const movie = {
                        title: item.title,
                        rating: item.imDbRating,
                        imageUrl: item.image
                    };
                    topMovies.push(movie);
                });
            });
        return topMovies;
        
    } catch (error) {
        console.log(error);
    }
}


function createMovieElements(topMovies) {
topMovies.forEach((movie) => {
    // Create the outer div element with classes
    const outerDiv = document.createElement('div');
    outerDiv.className = 'col-sm-6 col-md-4 col-lg-2';

    // Create the inner div element with class 'thumbnail'
    const innerDiv = document.createElement('div');
    innerDiv.className = 'thumbnail';

    // Create the image element with attributes
    const image = document.createElement('img');
    image.src = movie.imageUrl;
    image.className = 'img-fluid mb-4 image-img';
    image.alt = movie.title;

    // Create the overlay element with text attribute
    const overlay = document.createElement('div');
    overlay.className = "image-overlay";

    const overlayText = document.createElement('div');
    overlayText.className = "image-title";
    overlayText.textContent = movie.title;

    // Append elements to divs
    overlay.appendChild(overlayText);
    
    innerDiv.appendChild(image);
    innerDiv.appendChild(overlay);

    outerDiv.appendChild(innerDiv);

    list.appendChild(outerDiv);
})};


function getMovieByTitle(title) {
    return movies.find((movie) => movie.title === title);
}

//Overlay logic
function addOverlayListeners() {
    const images = document.querySelectorAll('.thumbnail');
    images.forEach(image => {
        image.addEventListener('click', () => {
            overlay.style.display = 'block';

            let title = image.firstChild.alt;
            let movie = getMovieByTitle(title);

            if(movie) {
               overlayContent.innerHTML =
                `<img src="${movie.imageUrl}" height="200">
                <br>Title: ${movie.title}
                <br>Rating: ${movie.rating}
                <br>Length: ${movie.length}
                <br>Category: ${movie.category}`;
                
            } else {
                console.log("Movie not found");
            }
        });
    })
};

overlay.addEventListener('click', () => {
  overlay.style.display = 'none';
});


//Back-to-top button
toTopButton.addEventListener("click", () => {
    scrolableDiv.scrollTop = 0;
});

toTopButton.addEventListener("mouseenter", (event) => {
    event.target.style.backgroundColor = "#555";
}, false);

toTopButton.addEventListener("mouseleave", (event) => {
    event.target.style.backgroundColor = "#40495f";
}, false);

scrolableDiv.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (scrolableDiv.scrollTop > 100) {
    toTopButton.style.display = "block";
  } else {
    toTopButton.style.display = "none";
  }
};






