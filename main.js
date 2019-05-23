// Renders an error message
function showError(msg) {
  const html = `<li><p class="error">${msg}</p></li>`;
  document.querySelector('#results').innerHTML = html;
}

// Searches for books and returns a promise that resolves a JSON list
function searchForBooks(term) {
  let searchResults;
  let searchBox = document.getElementById('search-bar');
  // TODO fetch data
  fetch(`https://www.googleapis.com/books/v1/volumes?q={${searchBox.value}}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      searchResults = myJson;
      render(searchResults);
    });
}

// Generate HTML and sets #results's contents to it
function render(searchResults) {
  let resultsItem;
  // TODO display results
  // console.log(searchResults.items);

  let resultsList = document.getElementById('results');

  for (let i = 0; i < searchResults.items.length; i++) {
    console.log(searchResults.items[i]);
    console.log(searchResults.items[1].id);
    
    if (document.getElementById(searchResults.items[i].id)) {
    } else {
      resultsItem = document.createElement('li');
      resultsCard = document.createElement('section');
      resultsCard.classList.add('book');
      resultsCard.id = searchResults.items[i].id;
      cardInfo = document.createElement('div');
      cardInfo.classList.add('info');
      resultsCard.appendChild(cardInfo);

      //// Create all sub elements for card
      cardImage = document.createElement('img');
      if (searchResults.items[i].volumeInfo.imageLinks) {
        cardImage.src = searchResults.items[i].volumeInfo.imageLinks.thumbnail;
        cardImage.style.height = cardImage.height;
        resultsCard.style.height = searchResults.items[i].volumeInfo.imageLinks.thumbnail.height;
      } else {
        cardImage.classList.add('blank');
      }
      cardTitle = document.createElement('h2');
      cardTitle.innerText = searchResults.items[i].volumeInfo.title.toUpperCase();
      cardTitle1 = document.createElement('h2');
      cardTitle1.innerText = searchResults.items[i].volumeInfo.title.toUpperCase();

      cardSubtitle = document.createElement('h3');
      if (searchResults.items[i].volumeInfo.subtitle === undefined) {
        cardSubtitle.innerText = "";
      } else {
        cardSubtitle.innerText = searchResults.items[i].volumeInfo.subtitle;
      }
      cardAuthors = document.createElement('p');
      if (searchResults.items[i].volumeInfo.authors === undefined) {
        cardAuthors.innerText = "Author: N/A";
      } else {
        cardAuthors.innerText = searchResults.items[i].volumeInfo.authors;
      }
      cardLink = document.createElement('a');
      cardLink.href = searchResults.items[i].volumeInfo.infoLink;

      //// Add all sub elements to card
      cardLink.appendChild(resultsCard);
      resultsCard.appendChild(cardTitle1);
      cardInfo.appendChild(cardTitle);
      resultsCard.appendChild(cardImage);
      cardInfo.appendChild(cardSubtitle);
      cardInfo.appendChild(cardAuthors);
      resultsItem.appendChild(cardLink);
      resultsList.prepend(resultsItem);
    }
  }

}

function focusEffect() {
  let searchBar = document.getElementById('search-bar');
  searchBar.placeholder = "";
}

function blurEffect() {
  let searchBar = document.getElementById('search-bar');
  searchBar.placeholder = "Input search term here";
}

searchForBooks();