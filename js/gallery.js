toTopButton = document.getElementById("toTopBtn");
scrolableDiv = document.getElementById("gallery-container");
imageButton = document.querySelector("img");
list = document.querySelector("#movies");
overlay = document.getElementById('overlay');
overlayContent = document.getElementById('text');
let movies = [];


movies = [
    {
        title: "Guardians of the galaxy",
        rating: 8.0,
        length: "2h 1m",
        category: "Movie",
        link:"https://www.imdb.com/title/tt2015381/",
        imageUrl: "../resources/movies/guardians.jpg"
    },
    {
        title: "Green book",
        rating: 8.2,
        length: "2h 10m",
        category: "Movie",
        link:"https://www.imdb.com/title/tt6966692/?ref_=fn_al_tt_1",
        imageUrl: "../resources/movies/green book.jpg"
    },
    {
        title: "Kedi",
        rating: 7.6,
        length: "1h 19m",
        category: "Movie",
        link:"https://www.imdb.com/title/tt4420704/?ref_=nv_sr_srsg_0_tt_7_nm_1_q_Kedi",
        imageUrl: "../resources/movies/kedi.jpg"
    },
    {
        title: "Little Women",
        rating: 7.8,
        length: "2h 15m",
        category: "Movie",
        link:"https://www.imdb.com/title/tt3281548/?ref_=nv_sr_srsg_0_tt_8_nm_0_q_little%2520wo",
        imageUrl: "../resources/movies/littlewoman.jpg"
    },
    {
        title: "Kill Bill: Vol. 1",
        rating: 8.2,
        length: "1h 51m",
        category: "Movie",
        link:"https://www.imdb.com/title/tt0266697/?ref_=nv_sr_srsg_0_tt_8_nm_0_q_killbill",
        imageUrl: "../resources/movies/killbill.jpg"
    },
    {
        title: "Spotlight",
        rating: 8.1,
        length: "2h 9m",
        category: "Movie",
        link:"https://www.imdb.com/title/tt1895587/?ref_=nv_sr_srsg_0_tt_8_nm_0_q_spotlight",
        imageUrl: "../resources/movies/spotlight.jpg"
    },
    {
        title: "Love, Death & Robots",
        rating: 8.4,
        length: "15m",
        category: "TV series",
        link:"https://www.imdb.com/title/tt9561862/?ref_=nv_sr_srsg_6_tt_8_nm_0_q_robots",
        imageUrl: "../resources/movies/robots.jpg"
    },
    {
        title: "The Batman",
        rating: 7.8,
        length: "2h 56m",
        category: "Movie",
        link:"https://www.imdb.com/title/tt1877830/?ref_=nv_sr_srsg_0_tt_8_nm_0_q_Batman",
        imageUrl: "../resources/movies/Batman.jpg"
    },
    {
        title: "The Fabelmans",
        rating: 7.6,
        length: "2h 31m",
        category: "Movie",
        link:"https://www.imdb.com/title/tt14208870/?ref_=fn_al_tt_1",
        imageUrl: "../resources/movies/fabelmans.jpg"
    },
    {
        title: "Black Mirror",
        rating: 8.8,
        length: "1h",
        category: "TV series",
        link:"https://www.imdb.com/title/tt2085059/?ref_=fn_al_tt_1",
        imageUrl: "../resources/movies/Black mirror.jpg"
    },
    {
        title: "A Beautiful Mind",
        rating: 8.2,
        length: "2h 15m",
        category: "Movie",
        link:"https://www.imdb.com/title/tt0268978/?ref_=nv_sr_srsg_0_tt_8_nm_0_q_beautiful_mind",
        imageUrl: "../resources/movies/beautiful_mind.jpg"
    },
    {
        title: "Mavka: The Forest Song",
        rating: 7.9,
        length: "1h 30m",
        category: "Animation",
        link:"https://www.imdb.com/title/tt6685538/?ref_=nv_sr_srsg_0_tt_5_nm_3_q_mavka",
        imageUrl: "../resources/movies/mavka.jpg"
    },
        {
        title: "John Wick: Chapter 4",
        rating: 8.1,
        length: "2h 49m",
        category: "Movie",
        link:"https://www.imdb.com/title/tt10366206/?ref_=nv_sr_srsg_0_tt_7_nm_1_q_wick",
        imageUrl: "../resources/movies/wick.jpg"
    },
    {
        title: "Seven Short Films About (Our) Marriage",
        rating: 7.7,
        length: "1h 40m",
        category: "Movie",
        link:"https://www.imdb.com/title/tt8119078/?ref_=nv_sr_srsg_3_tt_8_nm_0_q_seven_merriage",
        imageUrl: "../resources/movies/seven_merriage.jpg"
    },
    {
        title: "The Godfather",
        rating: 9.2,
        length: "2h 55m",
        category: "Movie",
        link:"https://www.imdb.com/title/tt0068646/?ref_=nv_sr_srsg_0_tt_8_nm_0_q_godfather",
        imageUrl: "../resources/movies/godfather.jpg"
    },
    {
        title: "45 Years",
        rating: 7.1,
        length: "1h 35m",
        category: "Movie",
        link:"https://www.imdb.com/title/tt3544082/?ref_=nv_sr_srsg_0_tt_8_nm_0_q_45years",
        imageUrl: "../resources/movies/45years.jpg"
    }
];

generateContent();


async function generateContent() {
    let moviesList = await addMovie();
    createMovieElements(moviesList);
    addOverlayListeners();
};

async function addMovie() {
    try {
        await axios
            .get("https://imdb-api.com/en/API/Title/k_f3k6y4d2/tt15239678")
            .then((response) => {
                const newMovie = {
                    title: response.data.title,
                    rating: response.data.imDbRating,
                    length: response.data.runtimeStr,
                    category: response.data.type,
                    link: "https://www.imdb.com/title/tt15239678/",
                    imageUrl: response.data.image
                }
                movies.push(newMovie);
            });
        return movies;

    } catch (error) {
        console.error(error);
    }
};


//Render movies images with overlays
function createMovieElements(movies) {
   movies.forEach((movie) => {
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
    })
};

function getMovieByTitle(title) {
    return movies.find((movie) => movie.title === title);
}

//Overlay logic
function addOverlayListeners() {
    const images = document.querySelectorAll('.thumbnail');
    images.forEach((image) => {
        image.addEventListener('click', () => {
            overlay.style.display = 'block';

            let title = image.firstChild.alt;
            let movie = getMovieByTitle(title);
            
            if (movie) {
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







