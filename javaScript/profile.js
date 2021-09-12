// Creates a drop down menu when the user clicks on the account option in the navbar
document.querySelector('.profile-container').addEventListener('click', () => {
  document.querySelector('.profile-menu').classList.toggle('hideMenu')
})

// Displays the users profile details if they are logged in. If not then they have the option to either log in or create an account
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
                              <i class="fas fa-edit" onclick="toggleUsername()"></i>
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

// This saves the user ID to the local storage
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

// This allows the user to edit their profile picture
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

// Toggle to diplay the edit picture container
function togglePicture () {
  let container = document.querySelector('.editPictureContainer')
  container.classList.toggle("hidePicture");
}

// Toggle to close the edit picture container
document.querySelector('.closePicture').addEventListener('click', () => {
  let edit = document.querySelector('.editPictureContainer')
  edit.classList.toggle('hidePicture');
})


// This allows the user to edit their first name
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

// Toggle to diplay the edit name container
function toggleName() {
  let container = document.querySelector('.editNameContainer')
  container.classList.toggle("hideName");
}

// Toggle to close the edit name container
document.querySelector('.closeName').addEventListener('click', () => {
  let edit = document.querySelector('.editNameContainer')
  edit.classList.toggle('hideName');
})

// This allows the user to edit their second name
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

// Toggle to diplay the edit surname container
function toggleSurname() {
  let container = document.querySelector('.editSurnameContainer')
  container.classList.toggle("hideSurname");
}

// Toggle to close the edit surname container
document.querySelector('.closeSurname').addEventListener('click', () => {
  let edit = document.querySelector('.editSurnameContainer')
  edit.classList.toggle('hideSurname');
})

// This allows the user to edit their email address
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

// Toggle to diplay the edit email container
function toggleEmail() {
  let container = document.querySelector('.editEmailContainer')
  container.classList.toggle("hideEmail");
}

// Toggle to close the edit email container
document.querySelector('.closeEmail').addEventListener('click', () => {
  let edit = document.querySelector('.editEmailContainer')
  edit.classList.toggle('hideEmail');
})

// Toggle to diplay the edit user id container
function toggleId() {
  let container = document.querySelector('.editIdContainer')
  container.classList.toggle('hideId')
}

// Toggle to close the edit user id container
document.querySelector('.closeId').addEventListener('click', () => {
  let edit = document.querySelector('.editIdContainer')
  edit.classList.toggle('hideId');
})

// Toggle to diplay the edit username container
function toggleUsername() {
  let container = document.querySelector('.editUsernameContainer')
  container.classList.toggle('hideUsername')
}

// Toggle to close the edit username container
document.querySelector('.closeUsername').addEventListener('click', () => {
  let edit = document.querySelector('.editUsernameContainer')
  edit.classList.toggle('hideUsername');
})

// This allows the user to edit their password
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

// Toggle to diplay the edit password container
function togglePassword() {
  let container = document.querySelector('.editPasswordContainer')
  container.classList.toggle("hidePassword");
}

// Toggle to close the edit password container
document.querySelector('.closePassword').addEventListener('click', () => {
  let edit = document.querySelector('.editPasswordContainer')
  edit.classList.toggle('hidePassword');
})

// Allows the user to delete their profile and redirects them to the home page of the site
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

// Signs the user out and redirects them to the login page
function signOut() {
  window.localStorage.removeItem("jwt-token");
  window.location.href = "/login.html";
  document.getElementsByClassName('signOutContainer').classList.add('hide');
}

// Allows files that are uploaded to be displayed and saved
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