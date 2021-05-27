const submitButton = document.getElementById('submit-quote');
const newQuoteContainer = document.getElementById('new-quote');

submitButton.addEventListener('click', async () => {
  const quote = document.getElementById('quote').value;
  const person = document.getElementById('person').value;
  const year = document.getElementById('year').value;

  const data = {
    quote,
    person: person || null,
    year: parseInt(year) || null
  };
  const response = await fetch(`/api/quotes/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const quotes = await response.json();
  console.log(response.status, response.statusText, quotes);

  await newQuoteResponse(quotes);
});

const newQuoteResponse = async (quote) => {

  const newQuote = document.createElement('div');
  newQuote.innerHTML = `
    <h3>Congrats, your quote was added!</h3>
    <div class="quote-text">${quote.quote}</div>
    <div class="attribution">- ${quote.person}</div>
    <div class="year">~${quote.year}</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `
  newQuoteContainer.appendChild(newQuote);
}
