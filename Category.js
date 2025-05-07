let posts = [
    { id: 1, discounts: "20%", title: "Nik PT aniom", description: "<strong>Країна виробник:</strong> Китай  <br> <strong>Вид взуття:</strong> Багатошиповки, стоноги <br> <strong>Стан:</strong> Новий <br>", price: "1500 грн.", image: "Сороканіжки Nik PT aniom.jpg", category: "Сороконіжки" },
    { id: 2, discounts: "45%", title: "Adidas X Speedportal TF", description: "<strong>Країна виробник:</strong> Індонезія <br> <strong>Вид взуття:</strong> Багатошиповки, стоноги <br> <strong>Стан:</strong> Новий <br>",price: "2120 грн.",  image: "Сороканіжки Adidas X Speedportal TF.jpg", category: "Сороконіжки" },
    { id: 3, discounts: "55%", title: "Nike Tiempo X Legend", description: "<strong>Країна виробник:</strong> В'єтнам <br> <strong>Вид взуття:</strong> Багатошиповки, стоноги <br> <strong>Стан:</strong> Новий <br>",price: "2400 грн.",  image: "Сороконіжки Nike Tiempo X.jpg", category: "Сороконіжки" },
    { id: 4, discounts: "85%", title: "Nike Air Zoom", description: "<strong>Країна виробник:</strong> В'єтнам <br> <strong>Вид взуття:</strong> Багатошиповки <br> <strong>Стан:</strong> Новий <br>",price: "3100 грн.",  image: "Nike Air Zoom.jpg", category: "Сороконіжки" },
    { id: 5, discounts: "20%", title: "Nike Tiempo X PRO FG", description: "<strong>Країна виробник:</strong> Китай <br> <strong>Вид взуття:</strong> Бутси <br> <strong>Стан:</strong> Новий <br>",price: "2280 грн.",  image: "Бутси Nike Tiempo X PRO FG.jpg", category: "Бутси" },
    { id: 6, discounts: "30%", title: "Nike Phantom GX FG", description: "<strong>Країна виробник:</strong> Боснія та Герцеговина <br> <strong>Вид взуття:</strong> Бутси <br> <strong>Стан:</strong> Новий <br>",price: "2550 грн.",  image: "Бутси Nike Phantom GX FG.jpg", category: "Бутси" },
    { id: 7, discounts: "90%", title: "Nike Mercurial Superfly 9", description: "<strong>Країна виробник:</strong> Китай <br> <strong>Вид взуття:</strong> Бутси <br> <strong>Стан:</strong> Новий <br>",price: "4000 грн.",  image: "Бутси Nike Mercurial Superfly 9.jpg", category: "Бутси" },
    { id: 8, discounts: "70%", title: "Puma Future 1.3", description: "<strong>Країна виробник:</strong> В'єтнам <br> <strong>Вид взуття:</strong> Бутси <br> <strong>Стан:</strong> Новий <br>",price: "2150 грн.",  image: "Бутси Puma Future 1.3.jpg", category: "Бутси" }
];


function loadPosts(category = "Всі товари") {
    if (category === "Корзина") {
        category = "Всі товари"; 
    }

    const container = document.getElementById("cardsContainer");
    const sortSelect = document.getElementById("sort-by-name");
    const priceRange = document.getElementById("price-range");
    const searchInput = document.getElementById("search");
    const priceRangeValue = document.getElementById("price-range-value");

    let filteredPosts = posts.filter(post => {
        const maxPrice = parseInt(priceRange.value);
        const postPrice = parseInt(post.price); 
        if (postPrice > maxPrice) {
            return false;
        }

        const searchTerm = searchInput.value.toLowerCase();
        if (
            !post.title.toLowerCase().includes(searchTerm) &&
            !post.description.toLowerCase().includes(searchTerm) &&
            !post.category.toLowerCase().includes(searchTerm)
        ) {
            return false;
        }

        return category === "Всі товари" || post.category === category;
    });

    priceRangeValue.textContent = `0 - ${priceRange.value} грн`;

    const sortValue = sortSelect.value;
    if (sortValue === "name-asc") {
        filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === "name-desc") {
        filteredPosts.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortValue === "price-asc") {
        filteredPosts.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    } else if (sortValue === "price-desc") {
        filteredPosts.sort((a, b) => parseInt(b.price) - parseInt(a.price));
    }


    let postsHtml = '';
    filteredPosts.forEach(function(post, index) {
        postsHtml += `<div class="image-card">
            <div class="image_and_text-container">
                <img class="image" src="${post.image}" alt="${post.title}">
                <div class="discount">${post.discounts}</div>
                <p class="name">${post.title}</p>
                <h2>${post.price}</h2>
                <button class="toggle-description" data-index="${index}">Показати опис</button>
                <p class="description hidden">${post.description}</p>
                <button class="butt-corsina" onclick="addToCart(${post.id})">Додати в корзину</button>
            </div>
        </div>`;
    });

    container.innerHTML = postsHtml;

    document.querySelectorAll('.toggle-description').forEach(button => {
        button.addEventListener('click', function() {
            let descript = this.nextElementSibling;
            descript.classList.toggle('hidden');
            if (descript.classList.contains('hidden')) {
                this.textContent = "Показати опис";
            } else {
                this.textContent = "Приховати опис";
            }
        });
    });
}


document.getElementById("sort-by-name").addEventListener("change", function() {
    loadPosts("Всі товари");  
});

document.getElementById("price-range").addEventListener("input", function() {
    loadPosts("Всі товари");  
});

document.getElementById("search").addEventListener("input", function() {
    loadPosts("Всі товари"); 
});


loadPosts("Всі товари");

const filterButtons = document.querySelectorAll('.navig button');

filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        loadPosts(this.textContent);
    });
});
