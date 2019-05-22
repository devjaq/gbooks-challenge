// Renders an error message
function showError(msg) {
  const html = `<li><p class="error">${msg}</p></li>`;
  document.querySelector('#results').innerHTML = html;
}

// Searches for books and returns a promise that resolves a JSON list
function searchForBooks(term) {
  let results;
  // TODO fetch api data
  fetch('https://www.googleapis.com/books/v1/volumes?q={term}')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
    results = JSON.stringify(myJson);
    render(results);
  });
}

// Generate HTML and sets #results's contents to it
function render(searchResults) {
  // TODO display something in results box
  let resultsList = document.getElementById('results');
  let resultsItem = document.createElement('li');
    resultsItem.innerText = searchResults;
    resultsList.appendChild(resultsItem);
}

searchForBooks();