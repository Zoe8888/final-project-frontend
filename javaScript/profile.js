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
                          <div class="left">
                              <img class="profilePicture" src="${user[1]}" alt="${user[2]}'s profile picture">
                              <p class="editPicture" onclick="togglePicture()">Edit Profile Picture</p>
                          </div>
                          <div class="right">
                            <div class="nameContainer">
                              <p class="fistName">Name: ${user[2]}</p>
                              <i class="fas fa-edit" onclick="toggleName()"></i>
                            </div>
                            <div class="surnameContainer">
                              <p class="lastName">Surname: ${user[3]}</p>
                              <button><i class="fas fa-edit" onclick="toggleSurname()"></i></button>
                            </div>
                            <div class="emailContainer">
                              <p class="user-email">Email: ${user[4]}</p>
                              <button onclick="toggleEmail()"><i class="fas fa-edit"></i></button>
                            </div>
                            <div class="idContainer">
                              <p class="user-id">User ID: ${user[0]}</p>
                              <button onclick=""><i class="fas fa-edit"></i></button>
                            </div>
                            <div class="usernameContainer">
                              <p class="profile-username">Username: ${user[5]}</p>
                              <button><i class="fas fa-edit"></i></button>
                            </div>
                            <div class="passwordContainer">
                              <p class="profile-password">Password: ${user[6]}</p>
                              <button onclick="togglePassword()"><i class="fas fa-edit"></i></button>
                            </div>
                            <div class="profile-buttons">
                                <button class="signOut" onclick="signOut()">Sign Out</button>
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
  fetch(`https://shrouded-temple-45259.herokuapp.com/edit-profile/${window.localStorage["username"]}/`, {
    method: "PUT",
    body: JSON.stringify ({
      user_image: document.querySelector('.profilePicture').src,
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
  edit.classList.toggle('closePicture');
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
  edit.classList.toggle('closeName');
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
  edit.classList.toggle('closeSurname');
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
  edit.classList.toggle('closeEmail');
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
  edit.classList.toggle('closePassword');
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