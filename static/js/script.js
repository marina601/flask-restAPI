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
                <div class="card-body" data-id=${post._id.$oid}>
                  <img src="${post.imageUrl}" class="card-img-top card-image" id='card-image' alt="${post.title}">
                  <h3 class="card-title">${post.title}</h3>
                  <p class="card-text card-content">${post.content}</p>
                  <span class='d-inline p-2'>Date:</span>
                  <p class="card-text text-muted d-inline p-2">${post.createdAt}</p>
                  <br>
                  <span class='d-inline p-2'>Author:</span>
                  <p class='card-text text-muted card-author d-inline'>${post.creator}</p>
                  <hr>
                  <button type="button" class="btn btn-warning" id='edit-post' data-toggle="modal" data-target="#exampleModal">Edit Post</button>
                  <a class='btn btn-danger' href='#' id='delete-post'>Delete</a>
                  <button type="button" class="btn btn-info" id='view-post' data-toggle="modal" data-target="#viewModal">View Post</button>
                </div>
              </div>
            </div>`;
        });
        document.getElementById('posts').innerHTML = posts;
    });
};
showPosts();



// POST
// Create a new post 
document.getElementById('postData').addEventListener('submit', postData)

function postData (e) {
    e.preventDefault();

    let creator = document.getElementById('creator').value;
    let title = document.getElementById('title').value;
    let imageUrl = document.getElementById('imageUrl').value;
    let content = document.getElementById('content').value;
    

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
        })
    })
    .then((response) => response.json())
    .then((data) => {
        const dataArr = [];
        dataArr.push(data);
        // call show post function with update content
        showPosts(dataArr);
        location.reload().alert('New Post Created!')
    })
}

//get the form elements
let from_creator = document.getElementById('creator');
let form_title = document.getElementById('title');
let form_content = document.getElementById('content');
let form_imageUrl = document.getElementById('imageUrl');
// DELETE
// target the div where the list of posts is located
const postList = document.getElementById('posts');

postList.addEventListener('click', (e) => {
    //target the id of the individual element
    //console.log(e.target.id);
    e.preventDefault();
    let delBtn = e.target.id == 'delete-post';
    let editBtn = e.target.id == 'edit-post';
    let viewBtn = e.target.id == 'view-post';

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
        let imageUrl = parent.querySelector('.card-image').src;

        console.log(imageUrl);

        

        form_title.value = title;
        form_content.value = content;
        from_creator.value = creator;
        form_imageUrl.value = imageUrl; 
    }

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
                'imageUrl': form_imageUrl.value,
                'content': form_content.value ,
                'creator': from_creator.value,
            })
        })
          .then(res => res.json())
          .then(() =>  location.reload())
          alert('Post updated!')
    })

    //GET
    //View individual post 
    if(viewBtn) {
        fetch(url + id)
        .then((res) => res.json())
        .then((data) => {
        document.getElementById("output").innerHTML = `
        <div class="modal fade" id="viewModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                       <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                         <span aria-hidden="true">&times;</span>
                       </button>
                  </div>
                <div class="modal-body">
                   <div class="card" style="width: 100%;">
                        <img src="${data.imageUrl}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h3 class="card-title">${data.title}</h3>
                            <p class="card-text">${data.content}</p>
                            <span class='d-inline p-2'>Updated on:</span>
                            <p class="card-text text-muted d-inline p-2">${data.createdAt}</p>
                            <br>
                            <span class='d-inline p-2'>Author:</span>
                            <p class='card-text text-muted card-author d-inline'>${data.creator}</p>
                            <hr>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>`;
    });
    }
})


// Sets copyright date in footer to current year
function getCurrentYear() {
    return new Date().getFullYear();
}
document.getElementById("copyright-year").innerHTML = getCurrentYear();