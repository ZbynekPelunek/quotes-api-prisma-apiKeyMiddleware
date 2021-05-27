const fetchAllButton = document.getElementById("fetch-quotes");
const fetchRandomButton = document.getElementById("fetch-random");
const fetchByAuthorButton = document.getElementById("fetch-by-author");

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.querySelector(".quote");
const attributionText = document.querySelector(".attribution");

const resetQuotes = () => {
	quoteContainer.innerHTML = "";
};

const renderError = async (response) => {
	quoteContainer.innerHTML = `<p>Your request returned an error from the server: </p>
<p>Code: ${response.status}</p>
<p>${response.statusText}</p>`;
};

const renderQuotes = async (quotes = []) => {
	resetQuotes();
	if (quotes.length > 0) {
		quotes.forEach((quote) => {
			const newQuote = document.createElement("div");
			newQuote.className = "single-quote";
			newQuote.innerHTML = `<div class="quote-text">${quote.quote}</div>
      <div class="attribution">- ${quote.person}</div>
      <div class="year">~${quote.year}</div>`;
			quoteContainer.appendChild(newQuote);
		});
	} else {
		quoteContainer.innerHTML = "<p>Your request returned no quotes.</p>";
	}
};

fetchAllButton.addEventListener("click", async () => {
	const response = await fetch("/api/quotes/all");
  
  if (response.ok) {
		const quotes = await response.json();
    console.log(response.status, response.statusText, quotes);
    await renderQuotes(quotes);
	} else {
		await renderError(response);
	}
	
});

fetchRandomButton.addEventListener("click", async () => {
	const response = await fetch("/api/quotes/random");

  if (response.ok) {
		const quote = await response.json();
    console.log(response.status, response.statusText, quote);
    await renderQuotes(quote);
	} else {
		await renderError(response);
	}

});

fetchByAuthorButton.addEventListener("click", async () => {
	const author = document.getElementById("author").value;
	const response = await fetch(`/api/quotes?person=${author}`)

  if (response.ok) {
		const quotes = await response.json();
    console.log(response.status, response.statusText, quotes);
    await renderQuotes(quotes);
	} else {
		await renderError(response);
	}
});
