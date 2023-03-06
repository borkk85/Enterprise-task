window.onload = function () {
  async function getBooks() {
    let url = "./listofbooks.json";
    try {
      let res = await fetch(url);
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }

  //Display of all book items alphabetically//
  async function renderBooks(query = "") {
    let books = await getBooks();

    books.sort(function (a, b) {
      if (a.author < b.author) {
        return -1;
      }
      if (a.author < b.author) {
        return +1;
      }
      return 0;
    });

    let displayTable = document.querySelector(".table-wrapper");
    let isHidden = document.querySelector(".result-wrapper");

    if (query === "") {
      let html = `
      <table class="table-header">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
    `;

      books.forEach((book) => {
        html += `
        <tr>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.genre}</td>
        </tr>
      `;
      });

      html += `
        </tbody>
      </table>
    `;

      displayTable.innerHTML = html;
      displayTable.classList.remove("is-hidden");
      isHidden.classList.add("is-hidden");
    }
  }

  renderBooks();

  //search and cancel button functionallity
  let searchButton = document.querySelector("#search");
  let searchInput = document.querySelector("#input");
  let cancelButton = document.querySelector("#cancel-button");

  searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    searchQuery = searchInput.value.toLowerCase();
    showResults();
  });

  searchInput.addEventListener("focus", () => {
    searchButton.classList.remove("is-hidden");
  });

  searchInput.addEventListener("blur", () => {
    if(searchInput.value === '') {
      searchButton.classList.add("is-hidden");
    }
  });

  cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    let input = document.querySelector("#input");
    let displayTable = document.querySelector(".table-wrapper");
    let isHidden = document.querySelector(".result-wrapper");
    let error = document.querySelector(".error-section");

    input.value = "";
    error.classList.add("is-hidden");
    displayTable.classList.remove("is-hidden");
    isHidden.classList.add("is-hidden");
    isHidden.innerHTML = "";
    error.innerHTML = "";
  });

  //search result rendering of error and filtered search result
  const showResults = async () => {
    let books = await getBooks();

    books.sort(function (a, b) {
      if (a.author < b.author) {
        return -1;
      }
      if (a.author < b.author) {
        return +1;
      }
      return 0;
    });

    let displayTable = document.querySelector(".table-wrapper");
    let isHidden = document.querySelector(".result-wrapper");
    let error = document.querySelector(".error-section");

    if (!searchQuery) {
      displayTable.classList.remove("is-hidden");
      isHidden.classList.add("is-hidden");
      return;
    }

    let filtered = books.filter((book) => {
      return (
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    if (filtered.length === 0) {
      error.innerHTML = `
      <div class='no-results'>
      <i class="fas fa-exclamation-triangle"></i>
      <h2>No results found, please query again</h2>
      </div>
      `;

      error.classList.remove("is-hidden");
      displayTable.classList.add("is-hidden");
      isHidden.classList.add("is-hidden");
    } else {
      let html = `
      <table class="table-header">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
    `;

      filtered.forEach((book) => {
        html += `
        <tr>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.genre}</td>
        </tr>
      `;
      });

      html += `
        </tbody>
      </table>
    `;

      isHidden.innerHTML = html;
      displayTable.classList.add("is-hidden");
      isHidden.classList.remove("is-hidden");
    }
  };

 
};
