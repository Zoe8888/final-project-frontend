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
                                <h3 class="dateCreated">${post[7]}</h3>
                                <div class="content">
                                    <h3 class="intro">${post[3]}</h3>
                                    <h3 class="body">${post[4]}</h3>
                                    <h3 class="conclusion">${post[5]}</h3>
                                </div>
                                <h3 class="author">${post[6]}</h3>
                                <button class="like" onclick="likePost(this)"><i class="fas fa-heart"></i></button>                            
                            </div>`
            postNo += 1
            displayLikes(post[0])
            
            displayComments(post[0]);

        });
    });
}

showPosts();

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
            document.getElementById(
                `${post_id}`
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
            document.getElementById(
                `${post_id}`
            ).innerHTML += `<div class="commentContainer">
                                <div class="comment" id=${comment[0]}>
                                    <p>${comment[1]}</p>
                                    <p>${comment[2]}</p>
                                    <button class="editComment">Edit</button>
                                    <button class="deleteComment">Delete</button>
                                </div>
                            </div>`
        })
    })
}

// function editComment(comment_id)