const membersContainer = document.getElementById('members');

const mafiusuCartolina = (imgSrc, firstName, lastName, description) => {
return `
  <div class="col">
    <div class="card">
      <img src="${imgSrc}" class="card-img-top" alt="${firstName} ${lastName}">
      <div class="card-body">
        <h5 class="card-title">${firstName} ${lastName}</h5>
        <p class="card-text">${description}</p>
      </div>
    </div>
`
};

fetch('http://localhost:3300')
  .then((res) => res.json())
  .then((mufiusi) => {
    console.log(mufiusi);
    membersContainer.innerHTML = '';
    mufiusi.forEach((mufiusu, index) => {
      const { imgSrc, firstName, lastName, description } = mufiusu;
      membersContainer.innerHTML += mafiusuCartolina(
        imgSrc,
        firstName,
        lastName,
        description
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
