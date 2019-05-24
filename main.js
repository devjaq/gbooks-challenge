// Renders an error message
function showError(msg) {
  const html = `<li><p class="error">${msg}</p></li>`;
  document.querySelector('#results').innerHTML = html;
}

// Searches for books and returns a promise that resolves a JSON list
function searchForBooks(term) {
  resultsArea = document.getElementById('results-area');

  if (document.getElementById('top-results')) {

  } else {
    // topResults = document.createElement('p');
    // topResults.id = 'top-results';
  }

  // resultsArea.prepend(topResults);

  let searchBox = document.getElementById('search-bar');
  if (searchBox.value === "" || searchBox.value === undefined) {
    if (term === undefined) {
      term = randomFirstTopic();
    }
  } else {
  }

  // TODO fetch data
  if (searchBox.value == "" || searchBox.value == undefined) {
    // topResults.innerText = `Top results for "${term}".`;
    // topResults.id = `top-results-${term}`;

    fetch(`https://www.googleapis.com/books/v1/volumes?q={${term}}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        searchResults = myJson;
        render(searchResults, term);
        topResults.innerText = `Top ${searchResults.items.length} results for "${term}".`;
      });
  } else {
    // topResults.id = `top-results-${searchBox.value}`;

    fetch(`https://www.googleapis.com/books/v1/volumes?q={${searchBox.value}}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        searchResults = myJson;
        render(searchResults, searchBox.value);
        topResults.innerText = `Top ${searchResults.items.length} results for "${searchBox.value}".`;
      });
  }
  // fetch(`https://www.googleapis.com/books/v1/volumes?q={${searchBox.value}}`)
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (myJson) {
  //     searchResults = myJson;
  //     render(searchResults);
  //   });
}

const keypress = (event) => {
  if (event.key === "Enter") {
    searchForBooks();
  }
}

// Generate HTML and sets #results's contents to it
function render(searchResults, searchTerm) {
  let resultsItem;
  let bookData = searchResults.items;

  // TODO display results
  let resultsList = document.getElementById('results');

  ///// Turn the book data into cards
  for (let i = 0; i < bookData.length; i++) {
    if (document.getElementById(bookData[i].id)) {
      document.getElementById(bookData[i].id).outerHTML = "";
    } 

    
      ////// Create a new card and info overlay
      resultsItem = document.createElement('li');
      resultsCard = document.createElement('section');
      resultsCard.classList.add('book');
      resultsCard.id = bookData[i].id;
      cardInfo = document.createElement('div');
      cardInfo.classList.add('info');
      resultsCard.appendChild(cardInfo);
      
      //// Create all sub elements for card
      cardImage = document.createElement('img');
      if (bookData[i].volumeInfo.imageLinks) {
        cardImage.src = bookData[i].volumeInfo.imageLinks.thumbnail;
        cardImage.style.backgroundImage = `url(${bookData[i].volumeInfo.imageLinks.thumbnail})`;
        resultsCard.style.height = bookData[i].volumeInfo.imageLinks.thumbnail.height;
      } else {
        cardImage = document.createElement('div');
        cardImage.classList.add('blank');
      }
      cardInfoTitle = document.createElement('h2');
      cardInfoTitle.innerText = bookData[i].volumeInfo.title;

      cardTitle = document.createElement('h2');
      cardTitle.innerText = bookData[i].volumeInfo.title.toUpperCase();

      cardInfoSubtitle = document.createElement('h3');
      if (bookData[i].volumeInfo.subtitle === undefined) {
        cardInfoSubtitle.innerText = "";
      } else {
        cardInfoSubtitle.innerText = bookData[i].volumeInfo.subtitle;
      }
      cardInfoAuthors = document.createElement('p');
      if (bookData[i].volumeInfo.authors === undefined) {
        cardInfoAuthors.innerText = "Author information not available";
      } else {
        cardInfoAuthors.innerText = bookData[i].volumeInfo.authors;
      }
      cardLink = document.createElement('a');
      cardLink.href = bookData[i].volumeInfo.infoLink;

      //// Add all sub elements to card
      cardLink.appendChild(resultsCard);
      resultsCard.appendChild(cardTitle);
      resultsCard.appendChild(cardImage);
      cardInfo.appendChild(cardInfoTitle);
      cardInfo.appendChild(cardInfoSubtitle);
      cardInfo.appendChild(cardInfoAuthors);
      resultsItem.appendChild(cardLink);
      resultsList.prepend(resultsItem);
  }
  if (document.getElementById(`top-results-${searchTerm}`)) {
    document.getElementById(`top-results-${searchTerm}`).outerHTML = "";
  } 
  topResults = document.createElement('p');
  topResults.id = `top-results-${searchTerm}`;
  topResults.classList.add('top-results');
  resultsList.prepend(topResults);
}

function focusEffect() {
  let searchBar = document.getElementById('search-bar');
  searchBar.placeholder = "";
}

function blurEffect() {
  let searchBar = document.getElementById('search-bar');
  searchBar.placeholder = "Input search term here";
}

const randomFirstTopic = () => {
  let topics = [
    "doctor", "network", "health", "record", "school", "child care", "camp"
  ]
  return topics[Math.floor(Math.random() * topics.length)];
}

searchForBooks(randomFirstTopic());