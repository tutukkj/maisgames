const products = [
  {
    id: "ps5-slim",
    name: "Console PlayStation 5 Slim",
    brand: "PlayStation",
    category: "console",
    price: "R$ 3.999,90",
    art: "console",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=85",
    accent: "#2f6cff",
    glow: "rgba(47, 108, 255, .28)",
    description: "Um destaque demonstrativo para representar a linha de consoles PlayStation na vitrine.",
    features: ["Console de mesa", "Experiência em alta definição", "Item ilustrativo do protótipo"]
  },
  {
    id: "series-s",
    name: "Console Xbox Series S",
    brand: "Xbox",
    category: "console",
    price: "R$ 2.599,90",
    art: "tower",
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=1200&q=85",
    accent: "#8ee234",
    glow: "rgba(142, 226, 52, .24)",
    description: "Uma opção compacta exibida para demonstrar comparação entre plataformas no catálogo.",
    features: ["Design compacto", "Biblioteca digital", "Item ilustrativo do protótipo"]
  },
  {
    id: "switch-oled",
    name: "Nintendo Switch OLED",
    brand: "Nintendo",
    category: "console",
    price: "R$ 2.349,90",
    art: "handheld",
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=1200&q=85",
    accent: "#ff315f",
    glow: "rgba(255, 49, 95, .28)",
    description: "Console híbrido usado como exemplo de produto para a categoria Nintendo.",
    features: ["Modo portátil e TV", "Tela em destaque", "Item ilustrativo do protótipo"]
  },
  {
    id: "fc25",
    name: "EA Sports FC 25",
    brand: "Multiplataforma",
    category: "jogo",
    price: "R$ 299,90",
    art: "game",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=85",
    accent: "#c7ff34",
    glow: "rgba(199, 255, 52, .22)",
    description: "Capa demonstrativa para validar a apresentação de jogos dentro da mesma vitrine.",
    features: ["Categoria esportes", "Versões por plataforma", "Disponibilidade a confirmar"]
  },
  {
    id: "dualsense",
    name: "Controle DualSense",
    brand: "PlayStation",
    category: "acessorio",
    price: "R$ 499,90",
    art: "controller",
    image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=1200&q=85",
    accent: "#ff164d",
    glow: "rgba(255, 22, 77, .25)",
    description: "Acessório demonstrativo para mostrar como detalhes e contato aparecem no catálogo.",
    features: ["Controle sem fio", "Feedback tátil", "Cores sujeitas à disponibilidade"]
  },
  {
    id: "headset",
    name: "Headset Gamer 7.1",
    brand: "Mais Games",
    category: "acessorio",
    price: "R$ 289,90",
    art: "headset",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=85",
    accent: "#8e58ff",
    glow: "rgba(142, 88, 255, .28)",
    description: "Exemplo de headset para representar acessórios de setup e áudio gamer.",
    features: ["Áudio imersivo", "Microfone ajustável", "Modelo ilustrativo"]
  }
];

const categoryLabels = { console: "Console", jogo: "Jogo", acessorio: "Acessório" };
const grid = document.querySelector("[data-product-grid]");
const count = document.querySelector("[data-count]");
const empty = document.querySelector("[data-empty]");
const search = document.querySelector("[data-search]");
const filters = [...document.querySelectorAll("[data-filter]")];
let activeFilter = "todos";

const artMarkup = (type) => {
  const art = {
    console: `<svg viewBox="0 0 260 220" aria-hidden="true"><path class="fill" d="M101 22c20 19 30 57 28 101-2 44-10 68-27 78H63c18-25 24-56 21-96-3-39 2-66 17-83Z"/><path class="dark" d="M130 27c18 28 22 66 19 105-2 35-8 57-20 69h-27c15-28 21-61 17-99-3-33 1-59 11-75Z"/><path class="fill" d="M149 34c17 14 26 46 25 93-1 36-8 61-22 74h-23c15-25 20-58 17-95-2-31-1-55 3-72Z"/><path d="M55 203h126"/><path class="accent" d="M114 48h4v119h-4z"/></svg>`,
    tower: `<svg viewBox="0 0 260 220" aria-hidden="true"><rect class="fill" x="72" y="20" width="116" height="180" rx="6"/><circle class="dark" cx="130" cy="70" r="38"/><circle cx="130" cy="70" r="27"/><path d="m104 47 52 46M156 47l-52 46"/><circle class="accent" cx="91" cy="181" r="5"/></svg>`,
    handheld: `<svg viewBox="0 0 300 220" aria-hidden="true"><rect class="dark" x="70" y="46" width="160" height="128" rx="8"/><rect x="84" y="59" width="132" height="102" rx="3"/><path class="accent" d="M49 46h31v128H49c-14 0-25-11-25-25V71c0-14 11-25 25-25Z"/><path class="fill" d="M251 46h-31v128h31c14 0 25-11 25-25V71c0-14-11-25-25-25Z"/><circle class="dark" cx="53" cy="82" r="10"/><path d="M48 126h10m-5-5v10"/><circle class="dark" cx="246" cy="92" r="5"/><circle class="dark" cx="258" cy="108" r="5"/><circle class="dark" cx="234" cy="108" r="5"/></svg>`,
    game: `<svg viewBox="0 0 260 220" aria-hidden="true"><rect class="fill" x="69" y="16" width="122" height="188" rx="5"/><rect class="dark" x="82" y="30" width="96" height="128"/><path class="accent" d="m82 118 49-88h47l-60 128H82z"/><text x="92" y="103" fill="white" stroke="none" font-size="25" font-family="Arial Black">FC</text><text x="92" y="133" fill="white" stroke="none" font-size="30" font-family="Arial Black">25</text><path d="M91 179h78"/></svg>`,
    controller: `<svg viewBox="0 0 300 220" aria-hidden="true"><path class="fill" d="M78 66c20-18 44-27 72-27s52 9 72 27c14 13 22 33 25 61l7 59c2 18-20 28-31 14l-35-42H112l-35 42c-11 14-33 4-31-14l7-59c3-28 11-48 25-61Z"/><path class="dark" d="M111 99h-14V85H84v14H70v13h14v14h13v-14h14z"/><circle class="dark" cx="213" cy="91" r="8"/><circle class="dark" cx="231" cy="108" r="8"/><circle class="dark" cx="195" cy="108" r="8"/><circle class="dark" cx="213" cy="125" r="8"/><circle class="dark" cx="126" cy="139" r="13"/><circle class="dark" cx="174" cy="139" r="13"/><path class="accent" d="M138 72h24v5h-24z"/></svg>`,
    headset: `<svg viewBox="0 0 260 220" aria-hidden="true"><path class="fill" d="M51 126V98c0-44 35-79 79-79s79 35 79 79v28h-17V99c0-35-27-63-62-63S68 64 68 99v27Z"/><rect class="dark" x="43" y="111" width="44" height="76" rx="20"/><rect class="dark" x="173" y="111" width="44" height="76" rx="20"/><path d="M61 185c16 18 35 25 58 25h27"/><circle class="accent" cx="152" cy="210" r="8"/></svg>`
  };
  return art[type] || art.controller;
};

const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function filteredProducts() {
  const term = normalize(search.value.trim());
  return products.filter((product) => {
    const matchesCategory = activeFilter === "todos" || product.category === activeFilter;
    const haystack = normalize(`${product.name} ${product.brand} ${categoryLabels[product.category]}`);
    return matchesCategory && (!term || haystack.includes(term));
  });
}

function renderProducts() {
  const visible = filteredProducts();
  grid.innerHTML = visible.map((product) => `
    <article class="product-card" style="--product-accent:${product.accent};--card-glow:${product.glow}">
      <div class="product-art">
        <span class="product-demo">Foto do produto</span>
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </div>
      <div class="product-body">
        <div class="product-meta"><span>${categoryLabels[product.category]}</span><span>${product.brand}</span></div>
        <h3>${product.name}</h3>
        <div class="product-bottom">
          <div class="product-price"><small>valor ilustrativo</small><strong>${product.price}</strong></div>
          <button class="product-detail" type="button" data-product="${product.id}" aria-label="Ver detalhes de ${product.name}">↗</button>
        </div>
      </div>
    </article>
  `).join("");

  count.textContent = `${visible.length} ${visible.length === 1 ? "item" : "itens"}`;
  empty.hidden = visible.length > 0;
  grid.hidden = visible.length === 0;
  document.querySelectorAll("[data-product]").forEach((button) => button.addEventListener("click", () => openProduct(button.dataset.product)));
}

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    activeFilter = filter.dataset.filter;
    filters.forEach((item) => item.classList.toggle("is-active", item === filter));
    renderProducts();
  });
});

search.addEventListener("input", renderProducts);
document.querySelector("[data-clear]").addEventListener("click", () => {
  search.value = "";
  activeFilter = "todos";
  filters.forEach((item) => item.classList.toggle("is-active", item.dataset.filter === "todos"));
  renderProducts();
  search.focus();
});

document.querySelectorAll("[data-quick-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    search.value = button.dataset.quickFilter;
    activeFilter = "todos";
    filters.forEach((item) => item.classList.toggle("is-active", item.dataset.filter === "todos"));
    renderProducts();
    document.querySelector("#catalogo").scrollIntoView({ behavior: "smooth" });
  });
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    search.focus();
    document.querySelector("#catalogo").scrollIntoView({ behavior: "smooth" });
  }
});

const dialog = document.querySelector("[data-dialog]");
function openProduct(id) {
  const product = products.find((item) => item.id === id);
  if (!product) return;
  const art = dialog.querySelector("[data-dialog-art]");
  art.innerHTML = `<img src="${product.image}" alt="${product.name}" />`;
  art.style.setProperty("--product-accent", product.accent);
  dialog.querySelector("[data-dialog-brand]").textContent = `${categoryLabels[product.category]} · ${product.brand}`;
  dialog.querySelector("[data-dialog-title]").textContent = product.name;
  dialog.querySelector("[data-dialog-description]").textContent = product.description;
  dialog.querySelector("[data-dialog-price]").textContent = product.price;
  dialog.querySelector("[data-dialog-features]").innerHTML = product.features.map((feature) => `<li>${feature}</li>`).join("");
  dialog.querySelector("[data-dialog-whatsapp]").href = `https://wa.me/5511968950657?text=${encodeURIComponent(`Oi, Mais Games! Vi o ${product.name} no catálogo e quero confirmar os detalhes.`)}`;
  dialog.showModal();
}

document.querySelector("[data-dialog-close]").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  const box = dialog.getBoundingClientRect();
  const outside = event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
  if (outside) dialog.close();
});

const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

renderProducts();
