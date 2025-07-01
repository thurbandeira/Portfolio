const switcher = document.querySelector(".switcher");

const trackPrevious = (el) => {
  const radios = el.querySelectorAll('input[type="radio"]');
  let previousValue = null;

  // init first select
  const initiallyChecked = el.querySelector('input[type="radio"]:checked');
  if (initiallyChecked) {
    previousValue = initiallyChecked.getAttribute("c-option");
    el.setAttribute("c-previous", previousValue);
  }

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.checked) {
        el.setAttribute("c-previous", previousValue ?? "");
        previousValue = radio.getAttribute("c-option");
      }
    });
  });
};

trackPrevious(switcher);

let lastScrollTop = 0;
const topBar = document.querySelector('.top-bar-wrapper');

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    topBar.classList.add("hide");
  } else {
    topBar.classList.remove("hide");
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

  const scrollBtn = document.getElementById("scrollTopBtn");
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.parent');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const filter = btn.getAttribute('data-filter');

      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

const phrases = [
  "Desenvolvedor Front-End",
  "Desenvolvedor Back-End",
  "Desenvolvedor Full Stack",
  "Especialista em UI/UX",
  "Estudante de Sistemas"
];

let i = 0;
let j = 0;
let currentPhrase = [];
let isDeleting = false;
let isEnd = false;

function loop() {
  isEnd = false;
  const typedText = document.getElementById("typed-text");

  typedText.innerHTML = currentPhrase.join("");

  if (i < phrases.length) {
    if (!isDeleting && j <= phrases[i].length) {
      currentPhrase.push(phrases[i][j]);
      j++;
    }

    if (isDeleting && j > 0) {
      currentPhrase.pop();
      j--;
    }

    if (j === phrases[i].length) {
      isEnd = true;
      isDeleting = true;
    }

    if (isDeleting && j === 0) {
      currentPhrase = [];
      isDeleting = false;
      i++;
      if (i === phrases.length) {
        i = 0;
      }
    }
  }

  const speed = isEnd ? 1500 : isDeleting ? 40 : 80;
  setTimeout(loop, speed);
}

document.addEventListener("DOMContentLoaded", loop);
