// base url
const url = 'http://localhost:4444/' ;

// GET
// retrive all posts
function showPosts() {
    fetch(url + '/posts')
    .then((res) => res.json())
    .then((data) => {
        let posts = '';
        data.forEach(post => {
            posts += `
            <div class="col-12 col-md-6 col-lg-4">
              <div class="card bg-light mb-3">
                <img src="${post.imageUrl}" class="card-img-top card-image" alt="${post.title}">
                <div class="card-body" data-id=${post._id.$oid}>
                  <h5 class="card-title">Name: ${post.title}</h5>
                  <p class="card-text card-content">Content: ${post.content}</p>
                  <p class="card-text text-muted">Date: ${post.createdAt}</p>
                  <p class='card-text text-muted card-author'>Creator: ${post.creator}</p>
                  <button type="button" class="btn btn-warning" id='edit-post' data-toggle="modal" data-target="#exampleModal">Edit Post</button>
                  <a class='btn btn-danger' href='#' id='delete-post'>Delete</a>
                  <a class='btn btn-info' href='#'>View</a>
                </div>
              </div>
            </div>`;
        });
        document.getElementById('posts').innerHTML = posts;
    });
};
showPosts();


//PUT
//View individual post 
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

// POST
// Create a new post 
document.getElementById('postData').addEventListener('submit', postData)

function postData (e) {
    e.preventDefault();

    let creator = document.getElementById('creator').value;
    let title = document.getElementById('title').value;
    let imageUrl = document.getElementById('imageUrl').value;
    let content = document.getElementById('content').value;
    let createdAt = document.getElementById('createdAt').value;

    fetch(url + '/add_post', {
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
    .then((data) => {
        const dataArr = [];
        dataArr.push(data);
        // call show post function with update content
        showPosts(dataArr);
        alert('New Post Created!')
    })
}

//get the form elements
let from_creator = document.getElementById('creator');
let form_title = document.getElementById('title');
let form_content = document.getElementById('content');
let form_imageUrl = document.getElementById('imageUrl').value;
// DELETE
// target the div where the list of posts is located
const postList = document.getElementById('posts');

postList.addEventListener('click', (e) => {
    //target the id of the individual element
    //console.log(e.target.id);
    e.preventDefault();
    let delBtn = e.target.id == 'delete-post';
    let editBtn = e.target.id == 'edit-post';

    let id = e.target.parentElement.dataset.id;
    console.log(id)
    
    // Delete Request
    if(delBtn) {
        fetch(url + '/delete/' + id, {
            method: 'DELETE',
        })
          .then(res => res.json())
          .then(() => location.reload())
          alert('Post deleted successfully!')
    }  
    
    //PUT Request
    if(editBtn) {
        // get the elements from the card
        const parent = e.target.parentElement;
        let title = parent.querySelector('.card-title').textContent;
        let content = parent.querySelector('.card-content').textContent;
        let creator = parent.querySelector('.card-author').textContent;
        console.log(creator);

        

        form_title.value = title;
        form_content.value = content;
        from_creator.value = creator;
    }
    
    let today = new Date();
    let date = today.getDate();

    const editButton = document.querySelector('.edit');
    // Update existing post
    // Method FETCH
    editButton.addEventListener('click', (e) => {
        e.preventDefault();
        fetch(url + '/update/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'creator': creator,
                'title': form_title.value,
                'imageUrl': form_imageUrl,
                'content': form_content.value ,
                'createdAt': date,
                'creator': from_creator.value,
            })
        })
          .then(res => res.json())
          .then(() => location.reload())
          alert('Post updated!')
    })
})
