"use strict";
//api key: 9275ce7118d44eedb9e28344637c8fe0

const newsContainer = document.getElementById("news-container");
const btnPrev = document.getElementById("btn-prev");
const pageNum = document.getElementById("page-num");
const btnNext = document.getElementById("btn-next");

// Khởi tạo biến tổng số mẫu tin tức trả về từ API
let totalResults = 0;
getDataNews("us", 1);

/////////////////////////////////////////////////
// hàm lấy dữ liệu từ API (bất đồng bộ)
async function getDataNews(country, page) {
  try {
    // Kết nối với API và lấy dữ liệu
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${currentUser.category}&pageSize=${currentUser.pageSize}&page=${page}&apiKey=9275ce7118d44eedb9e28344637c8fe0`
    );
    const data = await res.json();
    // console.log(data);

    // Gọi hàm hiển thị danh sách tin tức
    displayNewsList(data);
  } catch (err) {
    // thông báo lỗi
    alert(`Error: ${err.message}`);
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
  getDataNews("us", --pageNum.textContent);
});

/////////////////////////////////////////////////
// Bắt sự kiện nhấn nút Next
btnNext.addEventListener("click", function () {
  getDataNews("us", ++pageNum.textContent);
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
  // Tạo html để newsContainer hiển thị
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
  // Hiển thị news lên newsContainer
  newsContainer.innerHTML = html;
}
