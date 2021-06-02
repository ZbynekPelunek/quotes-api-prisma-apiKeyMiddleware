const generateButton = document.getElementById('generate-button');
const generateContainer = document.getElementById('generate-response');

generateButton.addEventListener('click', async () => {

    const response = await fetch(`/api/key/generate`)
    const genRes = await response.json();
    console.log(response.status, response.statusText, genRes);
  
    await generateResponse(genRes);
  });

  const generateResponse = async (genRes) => {

    generateContainer.innerHTML = `
    <h3>Here is your API KEY</h3>
    <div class="api-key">${genRes.apikey}</div>
    <div class="max-limit">Max calls per day: ${genRes.max_limit}</div>
    `
  }