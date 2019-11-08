/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
console.log('Promise', axios
.get('https://api.github.com/users/raudelf'));
console.log('Promise2', axios
.get('https://api.github.com/users/raudelf/followers'));
/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = ['gustavo-yepez', 'tauanlongaretti', 'wktg623', 'VitaliyM3', 'Bobj2018', 'emster7013', 'Afrodo1', 'alesslongaretti'];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
const followerCards = (data) => {

  // Elements
  const card = document.createElement('div');
  const profImg = document.createElement('img');
  const cardInfo = document.createElement('div');
  const name = document.createElement('h3');
  const userName = document.createElement('p');
  const location = document.createElement('p');
  const prof = document.createElement('p');
  const gitPage = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');

  // Nesting
  card.appendChild(profImg);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(location);
  cardInfo.appendChild(prof);
  prof.appendChild(gitPage);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);

  // Classes
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  userName.classList.add('username');

  // Content
  profImg.src = data.avatar_url;
  name.textContent = `${data.name}`;
  userName.textContent = `${data.login}`;
  location.textContent = `${data.location}`;
  gitPage.textContent = `Github Page`;
  gitPage.href = data.html_url;
  followers.textContent = `Follower: ${data.followers}`;
  following.textContent = `Following: ${data.following}`;
  bio.textContent = `${data.bio}`;
  
  // Execute
  return card;
};

const cards = document.querySelector('.cards');

axios.get('https://api.github.com/users/raudelf')
  .then(resolved => {
    cards.appendChild(followerCards(resolved.data));
    console.log('res', resolved);
    return resolved;
  })
  .catch(err => {
    console.log('Unable to retrieve data', err)
  });

axios.get('https://api.github.com/users/raudelf/followers')
.then(resolved => {
  const users = resolved.data;
  // users.forEach(follower => {
  //   cards.appendChild(followerCards(follower));
  // })
  return followersArray.push(users);
})
.catch(err => {
  console.log ('Unable to retrieve follower data', err)
});

followersArray.forEach(follower => {
  axios.get(`https://api.github.com/users/${follower}`)
  .then(resolved => {
    cards.appendChild(followerCards(resolved.data))
    return resolved;
  })
})
/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
