let usernameinp = document.querySelector("#usernameInput")
let btn = document.querySelector('#searchBtn')
let card = document.querySelector('#profileCard')


function getProfileData(username){
    return fetch(`https://api.github.com/users/${username}`).then( (raw) => {
        if(!raw.ok) throw new Error("Github user not found...")
        return raw.json();
    });
}

function getRepos(username){
    return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then( (raw) => {
        if(!raw.ok) throw new Error("Unable to fetch repos...")
        return raw.json();
    });
}

function decorateprofilecard(details){
    let data = `<div class="flex flex-col sm:flex-row items-center gap-6">
        <!-- Profile Image -->
        <img 
          src="${details.avatar_url}" 
          alt="GitHub Profile Picture" 
          class="w-32 h-32 rounded-full border-4 border-blue-500"
        />

        <!-- User Info -->
        <div class="flex-1 space-y-2">
          <h2 class="text-2xl font-bold text-white">${details.name}</h2>
          <p class="text-gray-400">${details.bio}</p>
          <div class="flex gap-6 mt-4 text-sm text-gray-400">
            <div><span class="font-semibold text-white">Followers</span> ${details.followers}</div>
            <div><span class="font-semibold text-white">Following</span> ${details.following}</div>
            <div><span class="font-semibold text-white">Public Repos:</span> ${details.public_repos}</div>
          </div>
        </div>
      </div>

      <!-- More Info -->
      <div class="mt-6 border-t border-gray-700 pt-4 space-y-2 text-sm text-gray-300">
        <div><strong class="text-white">Location:</strong> ${details.location}</div>
        <div><strong class="text-white">Company:</strong> ${details.company}</div>
        <div><strong class="text-white">Twitter:</strong> ${details.twitter_username}</div>
        <div>
          <strong class="text-white">Website:</strong>
          <a href="https://github.blog" class="text-blue-400 hover:underline">${details.url}</a>
        </div>
      </div>`

      card.innerHTML = data
}

btn.addEventListener("click", function(){
    let username = usernameinp.value.trim()
    if(username.length > 0){
        getProfileData(username).then((details)=>{
        decorateprofilecard(details)
        })
    }
    else{
        alert('Enter any username before searching...')
    }
})