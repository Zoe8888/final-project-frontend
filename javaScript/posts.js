function viewUserPosts() {
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
                ".post-container"
            ).innerHTML += `<div class="post" id="${post[0]}">
                                <div class="postImage"><img src="${post[1]}" alt="${post[2]}" /></div>
                                <h3 class="title">${post[2]}</h3>
                                <div class="content">
                                  <p class="intro">${post[3]}</p>
                                  <p class="body">${post[4]}</p>
                                  <p class="conclusion">${post[5]}</p>
                                </div>
                                <p class="dateCreated">${post[7]}</p>
                                <p class="author">${post[6]}</p>
                                <div class="postButtons">
                                    <button class="editPost" onclick="edit(this)">Edit Post</button>
                                    <button class="deletePost">Delete Post</button>
                                </div>
                            </div>`
        });
    })
}

viewUserPosts();

function editPost() {
    fetch(`https://shrouded-temple-45259.herokuapp.com/edit-post/${window.localStorage["postID"]}/`, {
        method: "PUT", 
        body: JSON.stringify ({
          post_image: document.querySelector('.editPostImage').src,
          title: document.querySelector('.editTitle').value,
          intro: document.querySelector('.editIntro').value,
          body: document.querySelector('.editBody').value,
          conclusion: document.querySelector('.editConclusion').value,
          date_created: document.querySelector('.editDateCreated').value,
          author: document.querySelector('.editAuthor').value,
          id: document.querySelector('.editUserId').value,
        }),
        headers: {
            "Content-Type": "application/json",
            Authorization: `jwt ${window.localStorage["jwt-token"]}`,
          },
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.alert("Your post has been edited successfully.");
      window.location.href = "/posts.html";
      viewUserPosts();
    });
}


function edit (e) {
    let editPost = document.querySelector('.editPostContainer')
    editPost.classList.toggle('hide');
    editPost.id = e.parentElement.parentElement.id
}

document.querySelector('.close').addEventListener('click', () => {
    let editPost = document.querySelector('.editPostContainer')
    editPost.classList.toggle('hide');
    editPost.classList.toggle('.close');
})

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