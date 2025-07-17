// Lightbox logic
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("closeBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const galleryItems = document.querySelectorAll(".gallery-item");
const images = Array.from(galleryItems).map(item => item.querySelector("img"));
let currentIndex = 0;

images.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    showLightbox();
  });
});

function showLightbox() {
  lightboxImg.src = images[currentIndex].src;
  lightbox.style.display = "flex";
}

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  showLightbox();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showLightbox();
});

window.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "Escape") closeBtn.click();
  }
});

// Filter logic
const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove 'active' class from current
    document.querySelector(".filter-btn.active")?.classList.remove("active");
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    galleryItems.forEach(item => {
      const category = item.getAttribute("data-category");
      if (filter === "all" || filter === category) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });
  });
});

// Scroll-to-top functionality
window.onscroll = function () {
  const btn = document.getElementById("topBtn");
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
