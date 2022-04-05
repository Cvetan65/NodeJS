const formValues = () => {
  return {
    imgSrc: document.getElementById('image').value,
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    description: document.getElementById('description').value
  };
};


document.getElementById('submit').addEventListener('click', () => {
  const mufiusu = formValues();

  fetch('http://localhost:3300/mufiusi', {
    method:'POST',
    body: JSON.stringify(mufiusu),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json())
    .then((message) => {
      console.log(message);
      window.location.href = '../addMemb/add.html';
    });
});

