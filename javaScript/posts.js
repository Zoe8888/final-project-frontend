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
                              <div class="postImage"><img src="${post[1]}" alt="${post[2]}" /></div>
                              <div class="titleContainer">
                                <h3 class="title">${post[2]}</h3>
                                <i class="fas fa-edit" onclick="toggleTitle(this)"></i>
                              </div>
                              <div class="content">
                                <div class="introContainer">
                                  <p class="intro">${post[3]}</p>
                                  <i class="fas fa-edit" onclick="toggleIntro()"></i>
                                </div>
                                <div class="bodyContainer">
                                  <p class="body">${post[4]}</p>
                                  <i class="fas fa-edit" onclick="toggleBody()"></i>
                                </div>
                                <div class="conclusionContainer">
                                  <p class="conclusion">${post[5]}</p>
                                  <i class="fas fa-edit" onclick="toggleConclusion()"></i>
                                </div>
                              </div>
                              <div class="dateContainer">
                                <p class="dateCreated">${post[7]}</p>
                                <i class="fas fa-edit" onclick="toggleDate()"></i>
                              </div>
                              <div class="authorContainer">
                                <p class="author">${post[6]}</p>
                                <i class="fas fa-edit" onclick="toggleAuthor()"></i>
                              </div>
                              <div class="postButtons">
                                  <button class="deletePost">Delete Post</button>
                              </div>
                          </div>`
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

function exit() {
  document.querySelector('.login').remove()
}

function editImage() {
    fetch(`https://shrouded-temple-45259.herokuapp.com/edit-post/${window.localStorage["postID"]}/`, {
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

function toggleImage (e) {
    let editImage = document.querySelector('.editImageContainer')
    editImage.classList.toggle('hide');
    editImage.id = e.parentElement.parentElement.id
}

document.querySelector('.closeImage').addEventListener('click', () => {
    let editImage = document.querySelector('.editImageContainer')
    editImage.classList.toggle('hideImage');
})

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

function toggleTitle (e) {
  let editTitle = document.querySelector('.editTitleContainer')
  editTitle.classList.toggle('hideTitle');
  editTitle.id = e.parentElement.parentElement.id
}

document.querySelector('.closeTitle').addEventListener('click', () => {
    let editTitle = document.querySelector('.editTitleContainer')
    editTitle.classList.toggle('hideTitle');
})

function editIntro() {
  fetch(`https://shrouded-temple-45259.herokuapp.com/edit-post/${window.localStorage["postID"]}/`, {
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

function toggleIntro (e) {
  let editIntro = document.querySelector('.editIntroContainer')
  editIntro.classList.toggle('hideIntro');
  editIntro.id = e.parentElement.parentElement.id
}

document.querySelector('.closeIntro').addEventListener('click', () => {
  let editIntro = document.querySelector('.editIntroContainer')
  editIntro.classList.toggle('hideIntro');
})

function editBody() {
  fetch(`https://shrouded-temple-45259.herokuapp.com/edit-post/${window.localStorage["postID"]}/`, {
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

function toggleBody (e) {
  let editBody = document.querySelector('.editBodyContainer')
  editBody.classList.toggle('hideBody');
  editBody.id = e.parentElement.parentElement.id
}

document.querySelector('.closeBody').addEventListener('click', () => {
  let editBody = document.querySelector('.editBodyContainer')
  editBody.classList.toggle('hideBody');
})

function editConclusion() {
  fetch(`https://shrouded-temple-45259.herokuapp.com/edit-post/${window.localStorage["postID"]}/`, {
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

function toggleConclusion (e) {
  let editConclusion = document.querySelector('.editConclusionContainer')
  editConclusion.classList.toggle('hideConclusion');
  editConclusion.id = e.parentElement.parentElement.id
}

document.querySelector('.closeConclusion').addEventListener('click', () => {
  let editConclusion = document.querySelector('.editConclusionContainer')
  editConclusion.classList.toggle('hideConclusion');
})

function editDate() {
  fetch(`https://shrouded-temple-45259.herokuapp.com/edit-post/${window.localStorage["postID"]}/`, {
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

function toggleDate (e) {
  let editDate = document.querySelector('.editDateContainer')
  editDate.classList.toggle('hideDate');
  editDate.id = e.parentElement.parentElement.id
}

document.querySelector('.closeDate').addEventListener('click', () => {
  let editDate = document.querySelector('.editDateContainer')
  editDate.classList.toggle('hideDate');
})

function editAuthor() {
  fetch(`https://shrouded-temple-45259.herokuapp.com/edit-post/${window.localStorage["postID"]}/`, {
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

function toggleAuthor (e) {
  let editAuthor = document.querySelector('.editAuthorContainer')
  editAuthor.classList.toggle('hideAuthor');
  editAuthor.id = e.parentElement.parentElement.id
}

document.querySelector('.closeAuthor').addEventListener('click', () => {
  let editAuthor = document.querySelector('.editAuthorContainer')
  editAuthor.classList.toggle('hideAuthor');
})

function editId() {
  fetch(`https://shrouded-temple-45259.herokuapp.com/edit-post/${window.localStorage["postID"]}/`, {
    method: "PUT",
    body: JSON.stringify ({
      id: document.querySelector('.editUserId').value,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
    }
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    window.alert("The user ID of your post was edited successfully.")
    window.location.href = "/posts.html";
    viewUserPosts();
  })
}

function toggleId (e) {
  let editId = document.querySelector('.editIdContainer')
  editId.classList.toggle('hideId');
  editId.id = e.parentElement.parentElement.id
}

document.querySelector('.closeId').addEventListener('click', () => {
  let editId = document.querySelector('.editIdContainer')
  editId.classList.toggle('hideId');
})

function addPost() {
  let add = document.querySelector('.createPostContainer')
  add.classList.toggle('hideCreate')
}

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
