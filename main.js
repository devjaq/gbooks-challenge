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
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    // console.log(JSON.stringify(myJson));
    // searchResults = JSON.stringify(myJson);
    searchResults = myJson;
    render(searchResults);
  });
}

// Generate HTML and sets #results's contents to it
function render(searchResults) {
  let resultsItem;
  // TODO display results
  console.log(searchResults.items);
  
  let resultsList = document.getElementById('results');

  for (let i = 0; i < searchResults.items.length; i++) {
    console.log(searchResults.items[i].volumeInfo.title);
    resultsItem = document.createElement('li');
    resultsItem.innerText = searchResults.items[i].volumeInfo.title;
    resultsList.prepend(resultsItem);
  }

}

searchForBooks();