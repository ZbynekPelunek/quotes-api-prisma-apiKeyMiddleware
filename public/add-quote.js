const submitButton = document.getElementById('submit-quote');
const newQuoteContainer = document.getElementById('new-quote');

submitButton.addEventListener('click', async () => {
  const apiKey = document.getElementById('api-key').value;

  const quote = document.getElementById('quote').value;
  const person = document.getElementById('person').value;
  const year = document.getElementById('year').value;

  //console.log(`API KEY inside add new quote: ${apiKey}`);

  const data = {
    quote,
    person: person || 'Anonymous',
    year: parseInt(year) || null
  };
  const response = await fetch(`/api/quotes/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey
    },
    body: JSON.stringify(data)
  });

  let responseText = await response.json();

  if (response.ok) {
    await newQuoteResponse(responseText);
	} else {
		await renderError(response, responseText);
	}
  console.log(response.status, response.statusText, responseText);
});

const newQuoteResponse = async (quote) => {
  newQuoteContainer.innerHTML = '';

  const newQuote = document.createElement('div');
  newQuote.innerHTML = `
    <h3>Congrats, your quote was added!</h3>
    <div class="quote-text">${quote.quote}</div>
    <div class="attribution">- ${quote.person}</div>
    <div class="year">~${quote.year}</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `
  newQuoteContainer.appendChild(newQuote);
};

const renderError = async (response, responseText) => {
	newQuoteContainer.innerHTML = `<p>Your request returned an error from the server: </p>
<p>Code: ${response.status} ${response.statusText}</p>
<p>${responseText.error}</p>`;
};