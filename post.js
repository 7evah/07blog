// Function to save posts to localStorage
function savePostsToLocalStorage(posts) {
    localStorage.setItem("posts", JSON.stringify(posts));
}

// Function to retrieve posts from localStorage
function getPostsFromLocalStorage() {
    const storedPosts = localStorage.getItem("posts");
    return storedPosts ? JSON.parse(storedPosts) : [];
}

// Function to display post details
function displayPostDetails() {
    const postDetailsSection = document.getElementById("post-details");
    const currentPost = JSON.parse(localStorage.getItem("currentPost"));
    const posts = getPostsFromLocalStorage(); // Load posts from localStorage

    if (currentPost) {
        // Assuming your navigation container has a class named 'nav'
const nav = document.querySelector('.navo');

// Create and append the image element
const img = document.createElement('img');
img.src = currentPost.picture; // Assuming currentPost.picture contains the image URL
img.alt = 'Post Picture'; // Set appropriate alt text
img.style.width = '100%'; // Make the image fill the entire width of the nav
nav.appendChild(img);

// Create and append the title element
const title = document.createElement('h2');
title.textContent = currentPost.title; // Assuming currentPost.title contains the title of the content
title.style.textAlign = 'center'; // Center align the title
nav.appendChild(title);

        const postDetailElement = document.createElement("div");
        postDetailElement.classList.add("post2");
        postDetailElement.innerHTML = `
            
            <p>${currentPost.content}</p><br>
            <h4 style="text-align: center;"> comments <h4>

            <ul>
                
                ${currentPost.comments.map(comment => `<li><span class="user">${comment.user} : </span><br><br> <span class="comment"> ${comment.text}</span></li>`).join('')}
               
            </ul>
            
        `;
        postDetailsSection.appendChild(postDetailElement);

        // Add event listener for the comment form submission
        const commentForm = document.getElementById("commentForm");
        commentForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent the default form submission behavior
            
            const commentUser = document.getElementById("commentUser").value;
            const commentText = document.getElementById("commentText").value;

            // Add the comment to the current post
            currentPost.comments.push({ user: commentUser, text: commentText });
            
            // Save the updated post to localStorage
            localStorage.setItem("currentPost", JSON.stringify(currentPost));

            // Find and update the corresponding post in the posts array
            const updatedPosts = posts.map(post => {
                if (post.id === currentPost.id) {
                    return currentPost;
                }
                return post;
            });

            // Save the updated posts array to localStorage
            savePostsToLocalStorage(updatedPosts);

            // Update the display to include the new comment
            postDetailElement.querySelector("ul").innerHTML += `<li>${commentUser}: ${commentText}</li>`;

            // Clear the form fields after adding the comment
            commentForm.reset();
        });
    } else {
        postDetailsSection.innerHTML = "<p>No post found.</p>";
    }
}


function myFunction(x) {
    x.classList.toggle("fa-thumbs-down");}
// Initial call to display post details
displayPostDetails();
