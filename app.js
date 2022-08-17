const column_header = document.querySelectorAll(".column_header");
const column_main = document.querySelectorAll(".column_main");
const animal_column = document.getElementById("animal");
const books_column = document.getElementById("books");
const government_column = document.getElementById("government");
const others_column = document.getElementById("others");

const sortedCategory = {
  Animals: [],
  Books: [],
  Government: [],
  Others: [],
};

class Async {
  constructor() {
    this.url = "https://api.publicapis.org/entries";
  }

  async get() {
    let request = await fetch(this.url);
    return await request.json();
  }
}

const apiRequest = new Async();
apiRequest.get().then((data) => {
  data.entries.forEach((category) => {
    if (category.Category == "Animals") {
      sortedCategory.Animals.push(category);
    } else if (category.Category == "Books") {
      sortedCategory.Books.push(category);
    } else if (category.Category == "Government") {
      sortedCategory.Government.push(category);
    } else {
      sortedCategory.Others.push(category);
    }
  });
});

const myData = (e) => {
  const header = e.target.textContent;

  let headerClass = e.target.nextElementSibling.className;
  console.log();
  if (headerClass === "column_main hide") {
    e.target.nextElementSibling.classList.remove("hide");
  } else {
    e.target.nextElementSibling.classList.add("hide");
  }
  console.log(headerClass);
  if (header == "Animals") {
    sortedCategory.Animals.forEach((category) => {
      animal_column.innerHTML += `<div class="entry">
         <h3>${category.API}</h3> 
         <p>${category.Description}</p> 
         <p>${category.Link}</p>
          </div>`;
    });
  } else if (header == "Books") {
    sortedCategory.Books.forEach((category) => {
      books_column.innerHTML += `<div class="entry">
          <h3>${category.API}</h3>
          <p>${category.Description}</p>
          <p>${category.Link}</p>
          </div>`;
    });
  } else if (header == "Government") {
    sortedCategory.Government.forEach((category) => {
      government_column.innerHTML += `<div class="entry">
          <h3>${category.API}</h3>
          <p>${category.Description}</p>
          <p>${category.Link}</p>
          </div>`;
    });
  } else if (header == "Others") {
    sortedCategory.Others.forEach((category) => {
      console.log(category);
      others_column.innerHTML += `<div class="entry">
          <h3>${category.API}</h3>
          <p>${category.Description}</p>
          <p>${category.Link}</p>
          </div>`;
    });
  }

  e.preventDefault();
};

column_header.forEach(function (header) {
  header.addEventListener("click", myData);
});
