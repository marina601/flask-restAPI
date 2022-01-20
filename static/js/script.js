
// retrive all posts
function showPosts() {
    let delete_url = 'http://localhost:4444/delete/'
    alert('Page loaded')
    fetch('http://localhost:4444/posts')
    .then((res) => res.json())
    .then((data) => {
        let posts = '';
        data.forEach(post => {
            posts += `
            <div class="col-12 col-md-6 col-lg-4">
              <div class="card" style="width: 18rem;">
                <img src="${post.imageUrl}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Name: ${post.title}</h5>
                  <p class="card-text">Content: ${post.content}</p>
                  <p class="card-text text-muted">Date: ${post.createdAt}</p>
                  <p class='card-text text-muted'>Creator: ${post.creator}</p>
                  <button class='btn btn-warning'>Edit</button>
                  <span class='span1' value='${post._id.$oid}' id='${post._id.$oid}'>${post._id.$oid}</span>
                  <a class='btn btn-danger delete_post' onClick='deletePost'>Delete</a>
                  <button class='btn btn-info'>View</button>
                </div>
              </div>
            </div>`;
        });
        document.getElementById('posts').innerHTML = posts;
    });
};

showPosts();
// show collapsable elements
document.getElementById('formData').addEventListener('submit', retriveName);
// get the data by id
function retriveName (e) {
    e.preventDefault();

    let id = document.getElementById('name').value;

    fetch(`http://localhost:4444/${id}`)
    .then((res) => res.json())
    .then((data) => {
        document.getElementById("output").innerHTML = `
        <div class="card" style="width: 18rem;">
          <img src="${data.imageUrl}" class="card-img-top" alt="...">
           <div class="card-body">
            <h5 class="card-title">Name: ${data.title}</h5>
            <p class="card-text">Content: ${data.content}</p>
            <p class="card-text text-muted">Date: ${data.createdAt}</p>
            <p class='card-text text-muted'>Creator: ${data.creator}</p>
        </div>`;
    });
};

// Create a new post 
document.getElementById('postData').addEventListener('submit', postData)

function postData (e) {
    e.preventDefault();

    let creator = document.getElementById('creator').value;
    let title = document.getElementById('title').value;
    imageUrl = document.getElementById('imageUrl').value;
    content = document.getElementById('content').value;
    createdAt = document.getElementById('createdAt').value

    fetch('http://localhost:4444/add_post', {
        method : 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            'creator': creator,
            'title': title,
            'imageUrl': imageUrl,
            'content': content,
            'createdAt': createdAt
        })
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
}


let buttons = document.querySelectorAll('.delete_post');
for (let i = 0 ; i < buttons.length; i++) {
    buttons[i].addEventListener('click', postData) ; 
 }


function deletePost() {
    let span_id = document.getElementsByClassName('span1');
    console.log(span_id)

    for (let i =0; i <= span_id.length; i++) {
        postId = span_id[i].value;
        console.log(span_id[i]);
    

    fetch(`http://localhost:4444/delete/${postId}`, {
        method: 'DELETE',
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    }

}
