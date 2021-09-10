document.querySelector('.profile-container').addEventListener('click', () => {
  document.querySelector('.profile-menu').classList.toggle('hideMenu')
})

function viewProfile() {
  if (window.localStorage["jwt-token"]) {
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
      window.localStorage['user-id'] = data.data[0];
      console.log(window.localStorage['user-id']);
      user = data.data;
      console.log(user);
      document.querySelector(
          ".profileContainer"
      ).innerHTML += `<div class="profile">
                          <div class="pictureContainer">
                              <img class="profilePicture" src="${user[1]}" alt="${user[2]}'s profile picture">
                              <div class="editPicture" onclick="togglePicture()">Edit Profile Picture</div>
                          </div>
                          <div class="right">
                            <div class="nameContainer">
                              <p class="fistName">Name: ${user[2]}</p>
                              <i class="fas fa-edit" onclick="toggleName()"></i>
                            </div>
                            <div class="surnameContainer">
                              <p class="lastName">Surname: ${user[3]}</p>
                              <i class="fas fa-edit" onclick="toggleSurname()"></i>
                            </div>
                            <div class="emailContainer">
                              <p class="user-email">Email:<br> ${user[4]}</p>
                              <i class="fas fa-edit" onclick="toggleEmail()"></i>
                            </div>
                            <div class="idContainer">
                              <p class="user-id">User ID: ${user[0]}</p>
                              <i class="fas fa-edit" onclick="toggleId()"></i>
                            </div>
                            <div class="usernameContainer">
                              <p class="profile-username">Username: ${user[5]}</p>
                              <i class="fas fa-edit"></i>
                            </div>
                            <div class="passwordContainer">
                              <p class="profile-password">Password: ${user[6]}</p>
                              <i class="fas fa-edit" onclick="togglePassword()"></i>
                            </div>
                            <div class="profile-buttons">
                                <button class="delete">Delete Profile</button>
                            </div>
                          </div>
                      </div>`;
                      document.querySelector('.delete').addEventListener('click', () => {
                          deleteProfile()})
  })
  } else {
    document.querySelector(
      '.profileContainer'
      ).innerHTML += `<div class="login">
                        <h3>You need to be logged in to view your profile. <br> Login or register <a href="login.html">here</a></h3>
                      </div>`
  }
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

function editPicture() {
  console.log(document.querySelector('.newProfilePicture').src);
  fetch(`https://shrouded-temple-45259.herokuapp.com/edit-profile/${window.localStorage["username"]}/`, {
    method: "PUT",
    body: JSON.stringify ({
      user_image: document.querySelector('.newProfilePicture').src,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
    },
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    window.alert("You have successfully updated your profile picture.");
    window.location.href = "/profile.html";
  });
}

function togglePicture () {
  let container = document.querySelector('.editPictureContainer')
  container.classList.toggle("hidePicture");
}

document.querySelector('.closePicture').addEventListener('click', () => {
  let edit = document.querySelector('.editPictureContainer')
  edit.classList.toggle('hidePicture');
})


function editName() {
  fetch(`https://shrouded-temple-45259.herokuapp.com/edit-profile/${window.localStorage["username"]}/`, {
    method: "PUT",
    body: JSON.stringify ({
      name: document.querySelector('.profileName').value,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
    },
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    window.alert("You have successfully updated your name.");
    window.location.href = "/profile.html";
  });
}

function toggleName() {
  let container = document.querySelector('.editNameContainer')
  container.classList.toggle("hideName");
}

document.querySelector('.closeName').addEventListener('click', () => {
  let edit = document.querySelector('.editNameContainer')
  edit.classList.toggle('hideName');
})


function editSurname() {
  fetch(`https://shrouded-temple-45259.herokuapp.com/edit-profile/${window.localStorage["username"]}/`, {
    method: "PUT",
    body: JSON.stringify ({
      surname: document.querySelector('.profileSurname').value,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
    },
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    window.alert("You have successfully updated your surname.");
    window.location.href = "/profile.html";
  });
}

function toggleSurname() {
  let container = document.querySelector('.editSurnameContainer')
  container.classList.toggle("hideSurname");
}

document.querySelector('.closeSurname').addEventListener('click', () => {
  let edit = document.querySelector('.editSurnameContainer')
  edit.classList.toggle('hideSurname');
})


function editEmail() {
  fetch(`https://shrouded-temple-45259.herokuapp.com/edit-profile/${window.localStorage["username"]}/`, {
    method: "PUT",
    body: JSON.stringify ({
      email: document.querySelector('.profileEmail').value,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
    },
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    window.alert("You have successfully updated your email address.");
    window.location.href = "/profile.html";
  });
}

function toggleEmail() {
  let container = document.querySelector('.editEmailContainer')
  container.classList.toggle("hideEmail");
}

document.querySelector('.closeEmail').addEventListener('click', () => {
  let edit = document.querySelector('.editEmailContainer')
  edit.classList.toggle('hideEmail');
})

function toggleId() {
  let container = document.querySelector('.editIdContainer')
  container.classList.toggle('hideId')
}

document.querySelector('.closeId').addEventListener('click', () => {
  let edit = document.querySelector('.editIdContainer')
  edit.classList.toggle('hideId');
})

function editPassword() {
  fetch(`https://shrouded-temple-45259.herokuapp.com/edit-profile/${window.localStorage["username"]}/`, {
    method: "PUT",
    body: JSON.stringify ({
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
    window.alert("You have successfully updated your password.");
    window.location.href = "/profile.html";
  });
}

function togglePassword() {
  let container = document.querySelector('.editPasswordContainer')
  container.classList.toggle("hidePassword");
}

document.querySelector('.closePassword').addEventListener('click', () => {
  let edit = document.querySelector('.editPasswordContainer')
  edit.classList.toggle('hidePassword');
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

  function signOut() {
    window.localStorage.removeItem("jwt-token");
    window.location.href = "/login.html";
    document.getElementsByClassName('signOutContainer').classList.add('hide');
  }

  function viewFile() {
    const preview = document.querySelector('.newProfilePicture');
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