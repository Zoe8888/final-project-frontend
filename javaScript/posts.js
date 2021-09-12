// Creates a drop down menu when the user clicks on the account option in the navbar
document.querySelector('.profile-container').addEventListener('click', () => {
  document.querySelector('.profile-menu').classList.toggle('hideMenu')
})

// Displays all the posts created by the user logged in at the time. If the user is not logged in or registered they will have the option to be redirected to the login page
function viewUserPosts() {
  if (window.localStorage["jwt-token"]) {
    fetch(`https://shrouded-temple-45259.herokuapp.com/view-users-posts/${window.localStorage["user-id"]}/`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          Authorization: `jwt ${window.localStorage["jwt-token"]}`,
      },
  })
  .then((res) => res.json())
  .then((data) => {
      console.log(data);
      posts = data.data;
      console.log(posts);
      posts.forEach((post) => {
        let postID = post[0]
        console.log(postID)
        window.localStorage.setItem("postID", postID);
      })
      posts.forEach((post) => {
          console.log(post);
          document.querySelector(
              ".postContainer"
          ).innerHTML += `<div class="post" id="${post[0]}">
                              <div class="imageContainer">
                                <div class="postImage">
                                  <img src="${post[1]}" alt="${post[2]}" />
                                  <div class="overlay" onclick="toggleImage(this)">Edit Post Image</div>
                                </div>
                              </div>
                              <div class="titleContainer">
                                <h3 class="title">${post[2]}</h3>
                                <i class="fas fa-edit" onclick="toggleTitle(this)"></i>
                              </div>
                              <div class="content">
                                <div class="introContainer">
                                  <p class="intro">${post[3]}</p>
                                  <i class="fas fa-edit" onclick="toggleIntro(this)"></i>
                                </div>
                                <div class="bodyContainer">
                                  <p class="body">${post[4]}</p>
                                  <i class="fas fa-edit" onclick="toggleBody(this)"></i>
                                </div>
                                <div class="conclusionContainer">
                                  <p class="conclusion">${post[5]}</p>
                                  <i class="fas fa-edit" onclick="toggleConclusion(this)"></i>
                                </div>
                              </div>
                              <div class="dateContainer">
                                <p class="dateCreated">${post[7]}</p>
                                <i class="fas fa-edit" onclick="toggleDate(this)"></i>
                              </div>
                              <div class="authorContainer">
                                <p class="author">${post[6]}</p>
                                <i class="fas fa-edit" onclick="toggleAuthor(this)"></i>
                              </div>
                              <div class="postButtons">
                                  <button class="deletePost" onclick="deletePost()">Delete Post</button>
                              </div>
                          </div>`
                          document.querySelectorAll('.deletePost').forEach(button => {
                            button.addEventListener('click', (e) => {
                                console.log(e)
                                deletePost(e.currentTarget.parentElement.parentElement.id)
                            });
                        })        
      });
  })
  } else {
    document.querySelector(
      '.postContainer'
      ).innerHTML +=  `<div class="login">
                        <h3>You need to be logged in to view your posts. <br> Login or register <a href="login.html">here</a></h3>
                      </div>`
  }
}

viewUserPosts();

// Exits out the login message
function exit() {
  document.querySelector('.login').remove()
}

// Deletes a specific post using the post id
function deletePost(post_id) {
  fetch(`https://shrouded-temple-45259.herokuapp.com/delete-post/${post_id}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
    },
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    window.alert("Your post have successfully been deleted");
    window.location.href = "/posts.html";
  })
}

// Edits the post image
function editImage(post_id) {
    fetch(`https://shrouded-temple-45259.herokuapp.com/edit-post/${post_id}/`, {
        method: "PUT", 
        body: JSON.stringify ({
          post_image: document.querySelector('.editPostImage').src,
        }),
        headers: {
            "Content-Type": "application/json",
            Authorization: `jwt ${window.localStorage["jwt-token"]}`,
          },
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.alert("The post image has been edited successfully.");
      window.location.href = "/posts.html";
      viewUserPosts();
    });
}

// Toggle to open or hide the edit image container
function toggleImage (e) {
    let editImage = document.querySelector('.editImageContainer')
    editImage.classList.toggle('hideImage');
    editImage.id = e.parentElement.parentElement.parentElement.id
}

// Toggle to close the edit image container
document.querySelector('.closeImage').addEventListener('click', () => {
    let editImage = document.querySelector('.editImageContainer')
    editImage.classList.toggle('hideImage');
})

// Edits the title of the post
function editTitle(post_id) {
  console.log(post_id);
  fetch(`https://shrouded-temple-45259.herokuapp.com/edit-post/${post_id}/`, {
    method: "PUT",
    body: JSON.stringify ({
      title: document.querySelector('.editTitle').value,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
    }
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    window.alert("The title of your post was edited successfully.")
    window.location.href = "/posts.html";
    viewUserPosts();
  })
}

// Toggle to open or hide the edit title container
function toggleTitle (e) {
  let editTitle = document.querySelector('.editTitleContainer')
  editTitle.classList.toggle('hideTitle');
  editTitle.id = e.parentElement.parentElement.id
}

// Toggle to close the edit title container
document.querySelector('.closeTitle').addEventListener('click', () => {
    let editTitle = document.querySelector('.editTitleContainer')
    editTitle.classList.toggle('hideTitle');
})
 // Edits the intro of the post
function editIntro(post_id) {
  console.log(post_id);
  fetch(`https://shrouded-temple-45259.herokuapp.com/edit-post/${post_id}/`, {
    method: "PUT",
    body: JSON.stringify ({
      intro: document.querySelector('.editIntro').value,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
    }
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    window.alert("The introduction of your post was edited successfully.")
    window.location.href = "/posts.html";
    viewUserPosts();
  })
}

// Toggle to open or hide the edit intro container
function toggleIntro (e) {
  let editIntro = document.querySelector('.editIntroContainer')
  editIntro.classList.toggle('hideIntro');
  editIntro.id = e.parentElement.parentElement.parentElement.id
}

// Toggle to close the edit intro container
document.querySelector('.closeIntro').addEventListener('click', () => {
  let editIntro = document.querySelector('.editIntroContainer')
  editIntro.classList.toggle('hideIntro');
})

// Edits the body of the post
function editBody(post_id) {
  console.log(post_id);
  fetch(`https://shrouded-temple-45259.herokuapp.com/edit-post/${post_id}/`, {
    method: "PUT",
    body: JSON.stringify ({
      body: document.querySelector('.editBody').value,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
    }
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    window.alert("The body of your post was edited successfully.")
    window.location.href = "/posts.html";
    viewUserPosts();
  })
}

// Toggle to open or hide the edit body container
function toggleBody (e) {
  let editBody = document.querySelector('.editBodyContainer')
  editBody.classList.toggle('hideBody');
  editBody.id = e.parentElement.parentElement.parentElement.id
}

// Toggle to close the edit body container
document.querySelector('.closeBody').addEventListener('click', () => {
  let editBody = document.querySelector('.editBodyContainer')
  editBody.classList.toggle('hideBody');
})

// Edits the conclusion of the post
function editConclusion(post_id) {
  fetch(`https://shrouded-temple-45259.herokuapp.com/edit-post/${post_id}/`, {
    method: "PUT",
    body: JSON.stringify ({
      conclusion: document.querySelector('.editConclusion').value,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
    }
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    window.alert("The conclusion of your post was edited successfully.")
    window.location.href = "/posts.html";
    viewUserPosts();
  })
}

// Toggle to open or hide the edit conclusion container
function toggleConclusion (e) {
  let editConclusion = document.querySelector('.editConclusionContainer')
  editConclusion.classList.toggle('hideConclusion');
  editConclusion.id = e.parentElement.parentElement.parentElement.id
}

// Toggle to close the edit conclusion container
document.querySelector('.closeConclusion').addEventListener('click', () => {
  let editConclusion = document.querySelector('.editConclusionContainer')
  editConclusion.classList.toggle('hideConclusion');
})

// Edits the date the post was created
function editDate(post_id) {
  fetch(`https://shrouded-temple-45259.herokuapp.com/edit-post/${post_id}/`, {
    method: "PUT",
    body: JSON.stringify ({
      date_created: document.querySelector('.editDateCreated').value,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
    }
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    window.alert("The post creation date was edited successfully.")
    window.location.href = "/posts.html";
    viewUserPosts();
  })
}

// Toggle to open or hide the edit date container
function toggleDate (e) {
  let editDate = document.querySelector('.editDateContainer')
  editDate.classList.toggle('hideDate');
  editDate.id = e.parentElement.parentElement.id
}

// Toggle to close the edit date container
document.querySelector('.closeDate').addEventListener('click', () => {
  let editDate = document.querySelector('.editDateContainer')
  editDate.classList.toggle('hideDate');
})

// Edits the author of the post
function editAuthor(post_id) {
  fetch(`https://shrouded-temple-45259.herokuapp.com/edit-post/${post_id}/`, {
    method: "PUT",
    body: JSON.stringify ({
      author: document.querySelector('.editAuthor').value,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
    }
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    window.alert("The author of your post was edited successfully.")
    window.location.href = "/posts.html";
    viewUserPosts();
  })
}

// Toggle to open or hide the edit author container
function toggleAuthor (e) {
  let editAuthor = document.querySelector('.editAuthorContainer')
  editAuthor.classList.toggle('hideAuthor');
  editAuthor.id = e.parentElement.parentElement.id
}

// Toggle to close the edit auhtor container
document.querySelector('.closeAuthor').addEventListener('click', () => {
  let editAuthor = document.querySelector('.editAuthorContainer')
  editAuthor.classList.toggle('hideAuthor');
})

// Toggle to hide or open the create new post container
function addPost() {
  let add = document.querySelector('.createPostContainer')
  add.classList.toggle('hideCreate')
}

// Function to create a new  blog post if the user is logged in
function createPost() {
  console.log(document.querySelector('.addPostImage').src, document.querySelector('.addTitle').value, document.querySelector('.addIntro').value, document.querySelector('.addBody').value, document.querySelector('.addConclusion').value, document.querySelector('.addAuthor').value, document.querySelector('.addId').value);
  if (window.localStorage["jwt-token"]) {
    fetch(`https://shrouded-temple-45259.herokuapp.com/create-post/`, {
      method: "POST",
      body: JSON.stringify({
        post_image: document.querySelector('.addPostImage').src,
        title: document.querySelector('.addTitle').value,
        intro: document.querySelector('.addIntro').value,
        body: document.querySelector('.addBody').value,
        conclusion: document.querySelector('.addConclusion').value,
        author: document.querySelector('.addAuthor').value,
        id: document.querySelector('.addId').value,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `jwt ${window.localStorage["jwt-token"]}`,
      }
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.alert("You have successfully created a new blog post.");
      window.location.href = "/posts.html";
    })
  } else {
    document.querySelector(
      '.postContainer'
      ).innerHTML +=  `<div class="login">
                        <h3>You need to be logged in to create a post. <br> Login or register <a href="login.html">here</a></h3>
                      </div>`
  }
}

// Allows a file to be displayed and saved proprely for the edit post image function
function viewFile() {
    const preview = document.querySelector('.editPostImage');
    const file = document.querySelector('.editPostImageInput').files[0];
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

// Allows a file to be displayed and saved proprely when the user is creating a new post
function viewImage() {
    const preview = document.querySelector('.addPostImage');
    const file = document.querySelector('.postImageInput').files[0];
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
}}
