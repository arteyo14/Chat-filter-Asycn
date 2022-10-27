// variable for API URL
const URL = "https://randomuser.me/api/?results=24";

//DOM Element
let userContainer = document.querySelector(".user__container");
let profile = document.querySelector(".preview");
let searchInput = document.querySelector("#input__search");

//create function to get data from API with axios
const fetchAxios = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(URL);
      resolve(response.data);
    } catch (error) {
      reject(error.message);
    }
  });
};

//create function to show user profile
const showUserProfile = (userData) => {
  let profile = document.querySelector(".preview");
  profile.innerHTML = `<img src="${userData.picture.large}" alt="${userData.name.first}-${userData.name.last}"/>`;
  profile.innerHTML += `<h2>${userData.name.title}.${userData.name.first} ${userData.name.last}</h2>`;
  profile.innerHTML += `<span>Gender: ${userData.gender}, ${userData.dob.age}</span>`;
  profile.innerHTML += `<span>Email: ${userData.email}</span>`;
  profile.innerHTML += `<span class="contact">${userData.phone}</span>`;
  profile.innerHTML += `<span class="contact">${userData.location.city}, ${userData.location.country}</span>`;
};

const genUserList = (userData) => {
  let userContainer = document.querySelector(".user__container");
  userData.forEach((user) => {
    let li = document.createElement("li");
    li.className = "container__profile";
    li.innerHTML = `<img src="${user.picture.medium}" alt="${user.name.first} ${user.name.last}"/> <div class="column"><span>${user.name.title}.${user.name.first} ${user.name.last}</span><div class="email"><span>${user.email}</span></div></div> `;
    userContainer.appendChild(li);
    li.addEventListener("click", () => showUserProfile(user));
  });
};

//create the main function
const main = async () => {
  let response = await fetchAxios();
  if (response?.results) {
    genUserList(response.results);
    let userData = response.results;

    searchInput.addEventListener("input", (e) => {
      let searchValue = e.target.value;
      userContainer.innerHTML = "";
      let newData = userData.filter((user) => {
        let name = `${user.name.title}.${user.name.first} ${user.name.last}}`;
        return name.toLowerCase().includes(searchValue.toLowerCase());
      });
      genUserList(newData);
    });
  } else {
    // if it cannot get data from API, then it will create element and show ERROR MESSAGE
    let error = document.createElement("div");
    error.className = "error";
    error.appendChild(document.createTextNode("ERROR: SOMETHING WRONG"));
    profile.appendChild(error);
  }
};

main();
