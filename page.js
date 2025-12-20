const content = document.getElementById("content");
const pagination = document.getElementById("pagination");

const pageList = [
  { title: "Land Rover Defender 2025", file: "post/land-rover-defender-2025.html" },
  { title: "लेटेस्ट कार और टेक्नोलॉजी न्यूज़", file: "post/mercedes-g-class-2025.html" },
  { title: "Audi Q8 e-tron 2025", file: "post/audi-q8-etron-2025.html" },
  { title: "Mercedes-Benz S-Class ", file: "post/mercedes-s-class-2025.html" },
  { title: "Top Electric SUVs in India 2025", file: "post/electric-suvs-2025.html" },
  { title: "Top Luxury Cars 2025", file: "post/luxury-cars-2025.html" },
  { title: "Creta 2025 Model", file: "post/creta2025.html" },
  { title: "लेटेस्ट कार और टेक्नोलॉजी न्यूज़", file: "post/tata-curvv-2025.html" },
  { title: "Maruti Swift 2025", file: "post/swift2025.html" },
  { title: "Kia Seltos 2025", file: "post/seltos2025.html" },
  { title: "Toyota Fortuner 2025", file: "post/fortuner2025.html" },
  { title: "Honda Elevate 2025", file: "post/honda-elevate-2025.html" }
];

const postsPerPage = 7;
let currentPage = 1;

function renderPaginationControls(totalPages) {
  pagination.innerHTML = `
    <button ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(-1)">⟵ Previous</button>
    <span>Page ${currentPage} of ${totalPages}</span>
    <button ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(1)">Next ⟶</button>
  `;
}

function changePage(direction) {
  currentPage += direction;
  loadPreviews();
}

async function loadPreviews() {
  content.innerHTML = '';
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const pagesToShow = pageList.slice(start, end);

  for (let page of pagesToShow) {
    try {
      const res = await fetch(page.file);
      if (!res.ok) throw new Error("Page not found");

      const text = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');

      const image = doc.querySelector("img");
      const paragraph = doc.querySelector("p");

      const previewDiv = document.createElement("div");
      previewDiv.classList.add("preview-block");
      previewDiv.addEventListener("click", () => {
        window.location.href = page.file;
      });

      // Image wrapper
      if (image) {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("image-wrapper");

        const img = image.cloneNode(true);
        imageWrapper.appendChild(img);
        previewDiv.appendChild(imageWrapper);
      }

      // Text preview
      const textDiv = document.createElement("div");
      textDiv.classList.add("text-content");

      textDiv.innerHTML = `
        <h3>${page.title}</h3>
        <p class="preview-text">${paragraph ? paragraph.textContent : ""}</p>
      `;

      previewDiv.appendChild(textDiv);
      content.appendChild(previewDiv);

    } catch (error) {
      console.error("Error loading preview for", page.file, error);
      const fallback = document.createElement("p");
      fallback.textContent = `Could not load preview for ${page.title}`;
      content.appendChild(fallback);
    }
  }

  const totalPages = Math.ceil(pageList.length / postsPerPage);
  renderPaginationControls(totalPages);
}

// Initialize
window.addEventListener("DOMContentLoaded", loadPreviews);
