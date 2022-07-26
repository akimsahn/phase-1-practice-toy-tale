let addToy = false;

// Start of initialiation
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");

  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(data => {
    data.forEach(toy => renderCard(toy));
  });

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  toyFormContainer.addEventListener('submit', (e) => {
    e.preventDefault()
    submitNewToy(e.target.name.value, e.target.image.value)
    e.target.reset()
  });

  function renderCard(input) {
    const div = document.createElement('div')
    const h2 = document.createElement('h2')
    const img = document.createElement('img')
    const p = document.createElement('p')
    const button = document.createElement('button')
  
    div.classList.add('card')
    img.classList.add('toy-avatar')
    button.classList.add('like-btn')
    button.id = input.id
    h2.textContent = input.name
    p.textContent = input.likes === 1 ? `${input.likes} Like` : `${input.likes} Likes`
    button.textContent = 'Like ❤️'
    img.src = input.image
  
    div.append(h2, img, p, button)
    toyCollection.append(div)

    button.addEventListener('click', () => {
      input.likes++
      fetch(`http://localhost:3000/toys/${input.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(input)
      })
      .then(resp => resp.json())
      .then(data => {
        p.textContent = data.likes === 1 ? `${data.likes} Like` : `${data.likes} Likes`
        console.log(data)
      });
    });
  };
  
  function submitNewToy(name, image) {
    const configureToy = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        image: image,
        likes: 0,
      }),
    };
  
    fetch("http://localhost:3000/toys", configureToy)
    .then(resp => resp.json())
    .then(data => renderCard(data))
    .catch(err => console.log(err))
  };

  // function updateLikes(likedToy) {
  //   fetch(`http://localhost:3000/toys/${likedToy.id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify(likedToy)
  //   })
  //   .then(resp => resp.json())
  //   .then(data =>
  // };
});