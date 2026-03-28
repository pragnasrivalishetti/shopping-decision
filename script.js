async function searchProduct() {
    const query = document.getElementById("searchBox").value;

    const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
    const data = await res.json();

    displayProducts(data.products);
}

function displayProducts(products) {
    let output = "";

    products.forEach(p => {
        output += `
        <div class="card">
            <h3>${p.title}</h3>
            <p>💰 Price: $${p.price}</p>
            <p>⭐ Rating: ${p.rating}</p>
            <p>📝 ${p.description}</p>
            <p>📦 Stock: ${p.stock}</p>
        </div>`;
    });

    document.getElementById("results").innerHTML = output;
}
