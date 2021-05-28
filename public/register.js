const registerButton = document.getElementById('register-button');
const responseContainer = document.getElementById('register-response');

registerButton.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
  
    const data = {
      email,
      password,
      firstName,
      lastName
    };
    const response = await fetch(`/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const regRes = await response.json();
    console.log(response.status, response.statusText, regRes);
  
    await registerResponse(regRes);
  });

  const registerResponse = async (regRes) => {

    responseContainer.innerHTML = JSON.stringify(regRes);
  }