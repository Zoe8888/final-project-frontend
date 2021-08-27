function viewProfile() {
    fetch(`https://shrouded-temple-45259.herokuapp.com/view-profile/${window.localStorage["username"]}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `jwt ${window.localStorage["jwt-token"]}`,
          },
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        window.localStorage.setItem['user-id'] = data.data[0];
        console.log(window.localStorage['user-id']);
        user = data.data;
        console.log(user);
        document.querySelector(
            ".profile-container"
        ).innerHTML += `<div class="profile">
                            <div>
                                <img src="${user[1]}" alt="${user[2]}'s profile picture">
                            </div>
                            <p class="fistName">Name: ${user[2]}</p>
                            <p class="lastName">Surname: ${user[3]}</p>
                            <p class="user-email">Email: ${user[4]}</p>
                            <p class="user-id">User ID: ${user[0]}</p>
                            <p class="profile-username">Username: ${user[5]}</p>
                            <p class="profile-password">Password: ${user[6]}</p>
                            <div class="profile-buttons">
                                <button class="edit" onclick="editContainer()">Edit Profile</button>
                                <button class="delete">Delete Profile</button>
                            </div>
                        </div>`;
                        document.querySelector('.delete').addEventListener('click', () => {
                            deleteProfile()})
    })
}

viewProfile();

function userID() {
  fetch(`https://shrouded-temple-45259.herokuapp.com/view-profile/${window.localStorage["username"]}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
    },
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    window.localStorage.setItem['user-id'] = data.data[0];
    console.log(window.localStorage['user-id']);
  })
}

function editProfile() {
  console.log(document.querySelector('.profilePicture').src, document.querySelector('.profileName').value, document.querySelector('.profileSurname').value, document.querySelector('.profileEmail').value, document.querySelector('.profilePassword').value)
  fetch(`https://shrouded-temple-45259.herokuapp.com/edit-profile/${window.localStorage["username"]}/`, {
    method: "PUT",
    body: JSON.stringify ({
      user_image: document.querySelector('.profilePicture').src,
      name: document.querySelector('.profileName').value,
      surname: document.querySelector('.profileSurname').value,
      email: document.querySelector('.profileEmail').value,
      password: document.querySelector('.profilePassword').value,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
    },
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    window.alert("You have successfully updated your profile.");
    window.location.href = "/profile.html";
  });
}

function editContainer () {
  let container = document.querySelector('.editProfile')
  container.classList.toggle("hide");
}

document.querySelector('.close').addEventListener('click', () => {
  let edit = document.querySelector('.editProfile')
  edit.classList.toggle('hide');
  edit.classList.toggle('close');
})

function deleteProfile() {
    fetch(
      `https://shrouded-temple-45259.herokuapp.com/delete-profile/${window.localStorage["username"]}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `jwt ${window.localStorage["jwt-token"]}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.href = "/index.html";
        window.alert("Your profile has been deleted successfully.");
      });
  }

  function viewFile() {
    const preview = document.querySelector('.profilePicture');
    const file = document.querySelector('.profilePictureInput').files[0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      function() {
        preview.src = reader.result;
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  }