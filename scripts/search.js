"use strict";
//api key: 9275ce7118d44eedb9e28344637c8fe0
const newsContain = document.getElementById("news-container");
const pageNum = document.getElementById("page-num");
const navPageNum = document.getElementById("nav-page-num");

const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const btnSubmit = document.getElementById("btn-submit");
const inputQuery = document.getElementById("input-query");

let totalResults = 0;
let keyword = "";
navPageNum.style.display = "none";

//////////////////////////////////////////////////////////////
// Bắt sự kiện ấn nút search
btnSubmit.addEventListener("click", function () {
  pageNum.textContent = "1";
  // reset news về rỗng trước khi hiển thị news mới tìm kiếm theo keyword
  newsContain.innerHTML = "";
  // kiểm tra người dùng có nhập keyword không
  if (inputQuery.value.trim().length === 0) {
    // nếu không thì ẩn nút next, prev và số trang
    navPageNum.style.display = "none";
    alert("Please input keyword for searching!");
  } else {
    keyword = inputQuery.value;
    // gọi hàm lấy data
    searchDataNews(keyword, 1);
  }
});

//////////////////////////////////////////////////////////////
// tìm kiếm data news theo keyword
async function searchDataNews(keyword, page) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${keyword}&sortBy=popularity&pageSize=${currentUser.pageSize}&page=${page}&apiKey=9275ce7118d44eedb9e28344637c8fe0`
    );
    const data = await res.json();
    // Kiểm tra nếu không có bài viết nào phù hợp với keyword
    if (data.totalResults == 0) {
      // ẩn nút chuyển trang nếu có lỗi
      navPageNum.style.display = "none";
      throw new Error(
        "No articles matching the search keyword. Please input another keyword!"
      );
    }

    // hiển thị nút chuyển trang khi tìm kiếm thành công
    navPageNum.style.display = "block";

    // hiển thị tin tức
    displayNewsList(data);

    // bắt lỗi và thông báo cho người dùng
  } catch (err) {
    alert(err.message);
  }
}

/////////////////////////////////////////////////
// Kiểm tra số trang để ẩn nút Prev
function checkBtnPrev() {
  // Nếu là trang 1 thì ẩn nút Prev
  if (pageNum.textContent == 1) {
    btnPrev.style.display = "none";
  } else {
    btnPrev.style.display = "block";
  }
}

/////////////////////////////////////////////////
// Kiểm tra số trang để ẩn nút Next
function checkBtnNext() {
  // Nếu số trang bằng với số làm tròn trên của kết quả totalResults/pageSize
  // Ví dụ tổng là 69, pageSize là 5 thì số trang là 69/5=13.8 làm tròn lên thành 14
  if (pageNum.textContent == Math.ceil(totalResults / currentUser.pageSize)) {
    btnNext.style.display = "none";
  } else {
    btnNext.style.display = "block";
  }
}

/////////////////////////////////////////////////
// Bắt sự kiện nhấn nút Prev
btnPrev.addEventListener("click", function () {
  searchDataNews(keyword, --pageNum.textContent);
});

/////////////////////////////////////////////////
// Bắt sự kiện nhấn nút Next
btnNext.addEventListener("click", function () {
  searchDataNews(keyword, ++pageNum.textContent);
});

/////////////////////////////////////////////////
// Hàm hiển thị NewsList
function displayNewsList(data) {
  // Gán giá trị cho biến totalResults
  totalResults = data.totalResults;
  // Kiểm tra số trang để ẩn nút Prev hoặc Next
  checkBtnPrev();
  checkBtnNext();

  let html = "";
  // Tạo html để newsContai hiển thị
  data.articles.forEach(function (article) {
    html += `
    <div class="card flex-row flex-wrap">
            <div class="card mb-3" style="">
              <div class="row no-gutters">
                <div class="col-md-4">
                  <img
                    src=${
                      article.urlToImage
                        ? article.urlToImage
                        : "../no-image-found.png"
                    }
                    class="card-img"
                    alt="img"
                  />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">
                      ${article.title}
                    </h5>
                    <p class="card-text">
                     ${article.description}
                    </p>
                    <a
                      href="${article.url}"
                      class="btn btn-primary"
                      target="_blank"
                      >View</a
                    >
                  </div>
                </div>
              </div>
            </div>
      </div>
    `;
  });
  // Hiển thị news lên newsContain
  newsContain.innerHTML = html;
}
