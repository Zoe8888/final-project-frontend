function showPosts() {
    fetch("https://shrouded-temple-45259.herokuapp.com/show-posts/", {
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
        let postNo = 0;
        posts.forEach((post) => {
            console.log(post);
            document.querySelector(
                ".post-container"
            ).innerHTML += `<div class="post" id="${post[0]}" >
                                <div class="post-image"><img class="image" src="${post[1]}" alt="${post[2]}" /></div>
                                <h2 class="title">${post[2]}</h2>
                                <h3 class="author">Written by ${post[6]}</h3>
                                <h4 class="dateCreated">${post[7]}</h4>
                                <button class="viewPost">View Post</button>                            
                            </div>`
            postNo += 1
            document.querySelectorAll('.viewPost').forEach((button) => {
                button.addEventListener('click', (e) => {
                    console.log(e)
                    viewPost(e.currentTarget.parentElement.id)
                    let post = document.querySelector('.postModalContainer')
                    post.classList.toggle('hide');
                    post.classList.toggle('closePost')
                })
            })
        });
    });
}

showPosts();

function openPost (e) {
    let post = document.querySelector('.postModalContainer')
    post.classList.toggle('hide');
    post.id = e.currentTarget.parentElement.parentElement.id
}

// document.querySelector('.closePost').addEventListener('click', () => {
//     let post = document.querySelector('.postModal')
//     post.classList.toggle('hide');
//     post.classList.toggle('closePost');
// })

// document.querySelector('.viewPost').addEventListener('click', (e) => {
//     let post = document.querySelector('.postModal')
//     post.classList.toggle('hide');
//     post.classList.toggle('closePost');

//     viewPost(e.parentElement.id)
// })

function viewPost(post_id) {
    fetch(`https://shrouded-temple-45259.herokuapp.com/view-post/${post_id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `jwt ${window.localStorage["jwt-token"]}`,
        },
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        post = data.data;
        console.log(post);
        document.querySelector(
            ".postModal"
        ).id = post[0]
        document.querySelector(
            ".postModal"
        ).innerHTML = "";
            document.querySelector(
                ".postModal"
            ).innerHTML += `<h2 class="closePost" onclick="openPost()">Close<h2>
                                <div class="post-image"><img class="image" src="${post[1]}" alt="${post[2]}" /></div>
                                <h2 class="title">${post[2]}</h2>
                                <h3 class="dateCreated">${post[7]}</h3>
                                <div class="content">
                                    <h3 class="intro">${post[3]}</h3>
                                    <h3 class="body">${post[4]}</h3>
                                    <h3 class="conclusion">${post[5]}</h3>
                                </div>
                                <h3 class="author">${post[6]}</h3>
                                <button class="like" onclick="likePost(this)"><i class="fas fa-heart"></i></button>
                                <button class="comment()">Comment</button>`
            displayLikes(post[0])
            displayComments(post[0]);
        });

}

function likePost(element) {
    post_id = element.parentElement.id
    console.log(post_id)
    let username = window.localStorage["username"];
    fetch("https://shrouded-temple-45259.herokuapp.com/like-post/", {
        method: "POST",
        body: JSON.stringify({
            username: username,
            post_id: post_id,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `jwt ${window.localStorage["jwt-token"]}`,
        },
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        window.alert("Post liked")
    })
}

function displayLikes(post_id) {
    fetch(`https://shrouded-temple-45259.herokuapp.com/display-likes/${post_id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `jwt ${window.localStorage["jwt-token"]}`,
        },
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        likes = data.data;
        likes.forEach((like) => {
            document.querySelector(
                `.postModal`
            ).innerHTML += `<div class="post">
                                <div class="likeContainer">
                                    <p>Liked by ${like[0]}</p>
                                </div>
                            </div>`
        })
    })
}

function displayComments(post_id) {
    fetch(`https://shrouded-temple-45259.herokuapp.com/display-comments/${post_id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `jwt ${window.localStorage["jwt-token"]}`,
        },
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        comments = data.data;
        console.log(comments);
        comments.forEach((comment) => {
            console.log(comment);
            document.querySelector(
                `.postModal`
            ).innerHTML += `<div class="commentContainer">
                                <div class="comment" id=${comment[0]}>
                                    <p>${comment[1]}</p>
                                    <p>${comment[2]}</p>
                                    <button class="editComment" onclick="updateComment()">Edit</button>
                                    <button class="deleteComment">Delete</button>
                                </div>
                            </div>`
                            document.querySelectorAll('.deleteComment').forEach(button => {
                                button.addEventListener('click', (e) => {
                                    console.log(e)
                                    deleteComment(e.currentTarget.parentElement.id)
                                    document.querySelector('.editCommentContainer').id = comment[0]
                                });
                            })
        })
    })
}

document.querySelectorAll('.editComment').forEach(button => {
    button.addEventListener('click', (e) => {
        console.log(e)
        editComment(e.currentTarget.parentElement.id)
    });
})

function addComment() {
    fetch(`https://shrouded-temple-45259.herokuapp.com/add-comment/`, {
        method: "POST",
        body: JSON.stringify({
            comment: document.querySelector('.add').value,
        }),
        headers: {
            "Content-Type": "application/json",
            Authorization: `jwt ${window.localStorage["jwt-token"]}`,
          },
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        window.alert("Comment added to post")
    })
}

function comment() {
    let addComment = document.querySelector('.add')
    addComment.classList.toggle('hideAdd')
}

function editComment(comment_id) {
    fetch(`https://shrouded-temple-45259.herokuapp.com/edit-comment/${comment_id}/`, {
        method: "PUT",
        body: JSON.stringify({
            comment: document.querySelector('.edit').value,
        }),
        headers: {
            "Content-Type": "application/json",
            Authorization: `jwt ${window.localStorage["jwt-token"]}`,
        },
    })
    .then((res) => res.json)
    .then((data) => {
        console.log(data);
        window.alert("Your comment has been edited")
        window.location.href = "/home.html";
    })
}

function updateComment (e) {
    let editComment = document.querySelector('.editCommentContainer')
    editComment.classList.toggle('hideContainer');
    editComment.classList.toggle('.cancel');
}

document.querySelector('.editForm').addEventListener('submit', (e) => {
    e.preventDefault();
    editComment(e.currentTarget.parentElement.parentElement.id);
})

function deleteComment(comment_id) {
    fetch(`https://shrouded-temple-45259.herokuapp.com/delete-comment/${comment_id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `jwt ${window.localStorage["jwt-token"]}`,
        },
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        window.alert("Comment deleted")
    })
}