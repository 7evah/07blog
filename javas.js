//array object 
let posts = [
    { 
        id: 1, 
        title: "First Post", 
        content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum(The Extremes of Good and Evil) by Cicero written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.",
        picture: "train.jpg",
        comments: [
          { user: "User1", text: "Comment 1" },
          { user: "User2", text: "Comment 2" }
        ]
      },
      { 
        id: 2, 
        title: "Second Post", 
        content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum(The Extremes of Good and Evil) by Cicero written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.",
        picture: "07perfectpic.jpg",
        comments: [
          { user: "User3", text: "Comment 3" },
          { user: "User4", text: "Comment 4" }
        ]
      }
  ]; 

// Function to save posts to localStorage
function savePostsToLocalStorage() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

// Function to retrieve posts from localStorage
function getPostsFromLocalStorage() {
    const storedPosts = localStorage.getItem("posts");
    return storedPosts ? JSON.parse(storedPosts) : [];
}
  
// Function to display posts on the first page
function displayPosts() {
    const secpost = document.getElementById("posts");
    secpost.innerHTML = "";
    
    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        const limitedContents = limitWords(post.content, 50);
        postElement.innerHTML = `
            <img src="${post.picture}" alt="Post Picture"> <br>
            <h2>${post.title}</h2>
            <p>${limitedContents}</p>
            
            <button onclick="viewPost(${post.id})">View Post</button>
        `;
        secpost.appendChild(postElement);
    });
}

// Function to view individual post
function viewPost(postId) {
    const post = posts.find(post => post.id === postId);
    localStorage.setItem("currentPost", JSON.stringify(post));
    window.location.href = "page2.html";
}
  
// Function to add a new post
function addPost(title, content, picture) {
    const newPost = {
        id: posts.length + 1, // Generate auto ID
        title: title,
        content: content,
        picture: picture,
        comments: []
    };
    posts.push(newPost);
    savePostsToLocalStorage();
    displayPosts();
}

// Function to edit a post
function editPost(postId, newTitle, newContent, newPicture) {
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
        posts[postIndex].title = newTitle;
        posts[postIndex].content = newContent;
        posts[postIndex].picture = newPicture;
        displayPosts();
    } else {
        console.log("Post not found");
    }
}

// Function to delete a post
function deletePost(postId) {
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
        posts.splice(postIndex, 1);
        savePostsToLocalStorage(); 
        displayPosts();
    } else {
        console.log("Post not found");
    }
}

// Function to handle user input and perform corresponding action
function handleUserInput(action) {
    switch (action) {
        case 'add':
            openAddPostPopup();
            break;
        case 'edit':
            openEditPostPopup();
            break;
        case 'delete':
            const postIdToDelete = parseInt(prompt("Enter the ID of the post to delete:"));
            deletePost(postIdToDelete);
            break;
        default:
            console.log("Invalid action");
    }
}

// Function to add a new post from the popup
function addPostFromPopup() {
    const title = document.getElementById("newTitle").value;
    const content = document.getElementById("newContent").value;
    const picture = document.getElementById("newPicture").value;
    
    // Validate input (optional)
    if (title.trim() === "" || content.trim() === "" || picture.trim() === "") {
        alert("Please fill in all fields");
        return;
    }
    
    addPost(title, content, picture);
    savePostsToLocalStorage();
    
    // Close the popup after adding the post
    closeAddPostPopup();
}

// Function to open the add post popup
function openAddPostPopup() {
    document.getElementById("addPostModal").style.display = "block";
}

// Function to close the add post popup
function closeAddPostPopup() {
    document.getElementById("addPostModal").style.display = "none";
}


// Function to handle editing a post from the popup
function handleEditPostFromPopup() {
    const postIdToEdit = parseInt(document.getElementById("editPostId").value);
    const newTitle = document.getElementById("editTitle").value;
    const newContent = document.getElementById("editContent").value;
    const newPicture = document.getElementById("editPicture").value;
    
    // Validate input (optional)
    if (isNaN(postIdToEdit) || postIdToEdit <= 0) {
        alert("Please enter a valid post ID");
        return;
    }

    editPost(postIdToEdit, newTitle, newContent, newPicture);
    savePostsToLocalStorage();
    
    // Close the popup after editing the post
    closeEditPostPopup();
}

// Function to open the edit post popup
function openEditPostPopup() {
    document.getElementById("editPostModal").style.display = "block";
}

// Function to close the edit post popup
function closeEditPostPopup() {
    document.getElementById("editPostModal").style.display = "none";
}
// Function to search posts by title

function searchPosts() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const searchResults = posts.filter(post => post.title.toLowerCase().includes(searchTerm));
    
    // Display search results
    displaySearchResults(searchResults);

    // Hide the regular posts display
    document.getElementById("posts").style.display = "none";
}


// Function to display search results
function displaySearchResults(results) {
    const searchResultsSection = document.getElementById("searchResults");
    searchResultsSection.innerHTML = "";

    results.forEach(post => {
        const postElement = document.createElement("div");
        postElement.innerHTML="";
        postElement.classList.add("post1");
          // Limit the content to 50 words
        const limitedContent = limitWords(post.content, 50);
        postElement.innerHTML = `
            <img src="${post.picture}" alt="Post Picture"> <br>
            <h2>${post.title}</h2>
            <p>${limitedContent}</p>
            
            <button onclick="viewPost(${post.id})">View Post</button>
        `;
        searchResultsSection.appendChild(postElement);
        
    });
    // Function to limit the maximum number of words in the content


    // Show the search results section
    searchResultsSection.style.display = "block";
}


// Function to handle page load
window.onload = function() {
    // Get posts from localStorage
    posts = getPostsFromLocalStorage();

    // Display posts
    displayPosts();
};
function limitWords(content, limit) {
    const words = content.split(" ");
    if (words.length > limit) {
        return words.slice(0, limit).join(" ") + "...";
    } else {
        return content;
    }
}

displayPosts();
// When the user scrolls down 20px from the top of the document, slide down the navbar
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("navbaro").style.top = "0";
  } else {
    document.getElementById("navbaro").style.top = "-60px";
  }
}
