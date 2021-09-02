function login() {
  username = document.querySelector('#username').value
  password = document.querySelector('#password').value
  console.log(username);
  console.log(password);
    fetch("https://shrouded-temple-45259.herokuapp.com/auth", {
        method: "POST",
        body: JSON.stringify({
          username: `${username}`,
          password: `${password}`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
      if (data["access_token"]) {
        fetch("https://shrouded-temple-45259.herokuapp.com/login/", {
          method: "POST",
          body: JSON.stringify({
            username: `${username}`,
            password: `${password}`,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
        console.log(data);
        storage = window.localStorage;
        storage.setItem("jwt-token", data["access_token"]);
        storage.setItem("username", username);
        storage.setItem("password", password);
        window.location.href = "/index.html";
      }
    });
}

document.querySelector('.login').addEventListener('submit', (e) => {
  e.preventDefault()
  login()
})

function subscribe() {
  let name = document.querySelector('.name').value
  let surname = document.querySelector('.surname').value
  let email = document.querySelector('.email').value
  let username = document.querySelector('.username').value
  let password = document.querySelector('.password').value
  fetch("https://shrouded-temple-45259.herokuapp.com/registration/", {
    method: "POST",
    body: JSON.stringify({
      name: `${name}`,
      surname: `${surname}`,
      email: `${email}`,
      username: `${username}`,
      password: `${password}`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    let user = {name: name, surname: surname, email: email, username: username, password: password}
    console.log(user)
    storage = window.localStorage;
    storage.setItem("user", JSON.stringify(user))
    window.alert("Congratulations! You have successfully created an account.");
  });
}

document.querySelector('.subscribe').addEventListener('submit', (e) => {
  e.preventDefault()
  subscribe()
})