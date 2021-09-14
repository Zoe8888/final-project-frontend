// Prevents the page from refreshing after every search a user makes
document.querySelector('.search').addEventListener('submit', (e) => {
    e.preventDefault()
    search()
})

// Toggle that hides and displays the nav bar
document.querySelector('.menu').addEventListener('click', () => {
    document.getElementById('navContainer').classList.toggle('active')
})

// A function that allows the user to search for a specific post
function search() {
    let value = document.querySelector('#search').value
    fetch(`https://shrouded-temple-45259.herokuapp.com/search/${value}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        posts = data.data;
        document.querySelector(
            ".searchedContainer").innerHTML = '';
        if (posts.length == 0) {
            document.querySelector(
                ".searchedContainer")
                .innerHTML += `<div class="searchResult">
                                    <p>None of the posts match your search.</p>
                                    <button class="clear" onclick=" document.querySelector('.searchResult').innerHTML = ''">Clear</button>
                                </div>`
        } else {
            posts.forEach((post) => {
                console.log(post);
                document.querySelector(
                    ".searchedContainer")
                    .innerHTML += `<div class="searchResult" id="${post[0]}">
                                        <p>${post[2]}</p>
                                        <button class="viewResult">View</button>
                                        <button class="clear" onclick="document.querySelector('.searchedContainer').innerHTML = ''">Clear</button>
                                    </div>`
                                    document.querySelectorAll('.viewResult').forEach((button) => {
                                        button.addEventListener('click', (e) => {
                                            viewPost(e.currentTarget.parentElement.id)
                                            let post = document.querySelector('.postModalContainer')
                                            post.classList.toggle('hide');
                                            post.classList.toggle('closePost')
                                            document.body.classList.toggle('disable');
                                            window.location.href = '#top'
                                        })
                                    })       
            })
        }
    })
}

// Clears results from the search bar
function clear() {
    document.querySelector('.searchResult').innerHTML = ""
}

// Shows all the posts created by users
function showPosts() {
    fetch("https://shrouded-temple-45259.herokuapp.com/show-posts/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
                                <div class="right">
                                    <h2 class="title">${post[2]}</h2>
                                    <h3 class="author">Written by ${post[6]}</h3>
                                    <h4 class="dateCreated">${post[7]}</h4>
                                    <button class="viewPost">View Post</button>
                                </div>                            
                            </div>`
            postNo += 1
            document.querySelectorAll('.viewPost').forEach((button) => {
                button.addEventListener('click', (e) => {
                    viewPost(e.currentTarget.parentElement.parentElement.id)
                    let post = document.querySelector('.postModalContainer')
                    post.classList.toggle('hide');
                    post.classList.toggle('closePost')
                    document.body.classList.toggle('disable');
                    window.location.href = '#top'
                })
            })
        });
    });
}

showPosts();

// Toggle which opens up a post the user selected
function openPost (e) {
    let post = document.querySelector('.postModalContainer')
    post.classList.toggle('hide');
    post_id = document.querySelector('.post').id;
    document.body.classList.toggle('disable');
}

// This function displays a single post and includes both likes and comments
function viewPost(post_id) {
    fetch(`https://shrouded-temple-45259.herokuapp.com/view-post/${post_id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
            ).innerHTML += `<div class="blogPost" id="${post[0]}">
                                <h2 class="closePost" onclick="openPost()">Close</h2>
                                <div class="postImage"><img class="image" src="${post[1]}" alt="${post[2]}" /></div>
                                <h2 class="title">${post[2]}</h2>
                                <h3 class="dateCreated">${post[7]}</h3>
                                <div class="content">
                                    <h3 class="intro">${post[3]}</h3>
                                    <h3 class="body">${post[4]}</h3>
                                    <h3 class="conclusion">${post[5]}</h3>
                                </div>
                                <h3 class="author">Written by ${post[6]}</h3>
                                <div class="likes">
                                </div>
                                <div class="interact">
                                    <button class="like" onclick="if (this.classList.contains('active')) {
                                        unlike(this)
                                    } else {
                                        likePost(this)
                                    }"><i class="fas fa-heart"></i></button>
                                    <button class="comment" onclick="comment()">Comment</button>
                                </div>
                            </div>`
            displayLikes(post[0])
            displayComments(post[0]);
            
        });

}

// This function allows the user to like a post if they have an account and are logged in
function likePost(element) {
    post_id = element.parentElement.parentElement.id
    console.log(post_id)
    let username = window.localStorage["username"]
    if (window.localStorage["jwt-token"]) {
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
                element.classList.add('active')
                displayLikes(post_id)
        })
    } else {
        document.querySelector(
            '.postModal'
            ).innerHTML += `<div class="login">
                                <button class="exit" onclick="exit()">X</button>
                                <h3>You need to be logged in to like this post. <br> Login or register <a href="login.html">here</a></h3>
                            </div>`
    }
}

// This allows the user to unlike a post if they have an account and are logged in
function unlike(element) {
    post_id = element.parentElement.parentElement.id;
    username = window.localStorage['username'];
    fetch("https://shrouded-temple-45259.herokuapp.com/like-post/", {
        method: "PATCH",
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
            window.alert("Post unliked")
            element.classList.remove('active')
            displayLikes(post_id)
    })
}

// Toggle that closes the login modal
function exit() {
    document.querySelector('.login').remove()
}

// This function shows all the likes the post currently has
function displayLikes(post_id) {
    fetch(`https://shrouded-temple-45259.herokuapp.com/display-likes/${post_id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        likes = data.data;
        like_no = likes.length
        document.querySelector(
            ".likes").innerHTML = '';
        likes.forEach((like) => {
            console.log(like)
            document.querySelectorAll('.like').forEach((button) => {
                if (window.localStorage.username == like[0]) {
                    button.classList.add('active')
                }
            });
        })
        if (like_no == 1) {
            document.querySelector(
                `.likes`
            ).innerHTML += `<div class="blogPost">
                                <div class="likeContainer">
                                    <p>Liked by ${like_no} person</p>
                                </div>
                            </div>`
        } else {
            document.querySelector(
                `.likes`
            ).innerHTML += `<div class="blogPost">
                                <div class="likeContainer">
                                    <p>Liked by ${like_no} people</p>
                                </div>
                            </div>`
        }
    })
}

// This displays all the comments the post currently has. It includes both the comment and the username
function displayComments(post_id) {
    fetch(`https://shrouded-temple-45259.herokuapp.com/display-comments/${post_id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
                                <div class="userComment" id=${comment[0]}>
                                    <p>${comment[1]}</p>
                                    <p class="commentUsername">${comment[2]}</p>
                                    <button class="buttonsMenu"><i class="fas fa-ellipsis-h ellipsis"></i></button>
                                    <div class="buttonsContainer hideButtons">
                                        <button class="editComment" onclick="updateComment(this)"><i class="fas fa-edit"></i></button>
                                        <button class="deleteComment" onclick=deleteComment(this)"><i class="fas fa-trash"></i></button>
                                    </div>
                                </div>
                            </div>`
                            document.querySelectorAll('.buttonsMenu').forEach(button => {
                                button.addEventListener('click', (e) => {
                                    e.currentTarget.parentElement.querySelector('.buttonsContainer').classList.toggle('hideButtons')
                                })
                            })
                            
                            document.querySelectorAll('.deleteComment').forEach(button => {
                                button.addEventListener('click', (e) => {
                                    console.log(e)
                                    deleteComment(e.currentTarget.parentElement.parentElement.id)
                                });
                            })
                            document.querySelectorAll('.saveEditedComment').forEach(button => {
                                button.addEventListener('click', (e) => {
                                    console.log(e.currentTarget.parentElement.parentElement)
                                    editComment(e.currentTarget.parentElement.parentElement.querySelector('.commentUsername').innerHTML)
                                });
                            })        
                        })
    })
}

// A toggle that reveals a options to edit or delete a comment
function buttons() {
    let menu = document.querySelectorAll('.buttonsContainer')
    menu.classList.toggle('hideButtons')
}

// A function that allows the user to comment on a post if they are logged in to their account
function addComment() {
    let username = window.localStorage['username'];
    let post_id = document.querySelector('.blogPost').id;
    if (window.localStorage["jwt-token"]) {
        fetch(`https://shrouded-temple-45259.herokuapp.com/add-comment/`, {
            method: "POST",
            body: JSON.stringify({
                comment: document.querySelector('.add').value,
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
                window.alert("Comment added to post");
                displayComments(post_id);
        })
    } else {
        document.querySelector(
            '.postModal'
            ).innerHTML += `<div class="login">
                                <button class="exit" onclick="exit()">X</button>
                                <h3>You need to be logged in to comment on this post. <br> Login or register <a href="login.html">here</a></h3>
                            </div>`
    }
}

// Toggle that opens up the add comment container
function comment() {
    let addComment = document.querySelector('.addCommentContainer')
    addComment.classList.toggle('hideAdd')
}

document.querySelector('.cancelComment').addEventListener('click', () => {
    comment()
})

document.querySelector('.addCommentForm').addEventListener('submit', (e) => {
    e.preventDefault()
})

// This allows the user to edit one of their own comments if they are logged in
function editComment() {
    username = window.localStorage['commentUsername']
    comment_id = document.querySelector('.editCommentContainer').id
    console.log('p', comment_id);
    if (window.localStorage["jwt-token"]) {
        if (window.localStorage["username"] == username) {
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
                window.location.href = "/index.html";
            })
        }
        else {
            document.querySelector(
                '.postModal'
            ).innerHTML += `<div class="error">
                                <button class="exitError" onclick="exitError()">X</button>
                                <h2>Error! You can only edit your own comments.</h2>
                            </div>`
        }
    } else {
        document.querySelector(
            '.postModal'
            ).innerHTML += `<div class="login">
                                <button class="exit" onclick="exit()">X</button>
                                <h3>You need to be logged in to edit this comment. <br> Login or register <a href="login.html">here</a></h3>
                            </div>`
    }
}

// Allows the user to exit out the error message
function exitError() {
    document.querySelector('.error').remove()
}

// Toggle thar opens and closes the edit comment container
function updateComment (e) {
    let editComment = document.querySelector('.editCommentContainer')
    editComment.classList.toggle('hideContainer');
    editComment.classList.toggle('cancel');
    document.querySelector('.editCommentContainer').id = e.parentElement.parentElement.id;
    window.localStorage['commentUsername'] = e.parentElement.parentElement.querySelector('.commentUsername').innerHTML
}

document.querySelector('.editForm').addEventListener('submit', (e) => {
    e.preventDefault();
    editComment(e.currentTarget.parentElement.parentElement.id);
})

// This allows the user to delete one of their comments if they are logged in to their account
function deleteComment(comment_id) {
    username = window.localStorage['commentUsername']
    console.log(username)
    console.log(comment_id);
    if (window.localStorage["jwt-token"]) {
        if (window.localStorage["username"] == username) {
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
            displayComments(post_id)
        })
        } else {
            document.querySelector(
                '.postModal'
            ).innerHTML += `<div class="deleteError">
                                <button class="exitDelete" onclick="exitDelete()">X</button>
                                <h2>Error! You can only delete your own comments.</h2>
                            </div>`
        }
    } else {
        document.querySelector(
            '.postModal'
            ).innerHTML += `<div class="login">
                                <button class="exit" onclick="exit()">X</button>
                                <h3>You need to be logged in to delete this comment. <br> Login or register <a href="login.html">here</a></h3>
                            </div>`
    }
}

// Exits out of the delete error message
function exitDelete() {
    document.querySelector('.deleteError').remove()
}

