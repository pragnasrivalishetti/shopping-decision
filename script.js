async function searchProduct() {
    const query = document.getElementById("searchBox").value.trim();

    if (!query) {
        alert("Please enter a product name!");
        return;
    }

    try {
        const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
        const data = await res.json();

        processProducts(data.products);
    } catch (error) {
        console.log(error);
        alert("Error fetching data");
    }
}

function processProducts(products) {

    if (products.length === 0) {
        document.getElementById("results").innerHTML = "<p>No products found</p>";
        return;
    }

    // Best rated product
    let bestProduct = products.reduce((a, b) =>
        a.rating > b.rating ? a : b
    );

    // Lowest price product
    let lowestPriceProduct = products.reduce((a, b) =>
        a.price < b.price ? a : b
    );

    displayProducts(products, bestProduct, lowestPriceProduct);
}

function displayProducts(products, best, cheapest) {

    let output = "";

    products.forEach(p => {

        let tags = "";
        let className = "card";

        if (p === best) {
            tags += "⭐ Best Rated ";
            className += " best";
        }

        if (p === cheapest) {
            tags += "💰 Lowest Price";
            className += " lowest";
        }

        output += `
        <div class="${className}">
            <h3>${p.title}</h3>
            <p><b>🏷 Brand:</b> ${p.brand}</p>
            <p><b>💰 Price:</b> $${p.price}</p>
            <p><b>⭐ Rating:</b> ${p.rating}</p>
            <p><b>📝 Description:</b> ${p.description}</p>
            <p><b>📦 Stock:</b> ${p.stock}</p>
            <p style="color:green;"><b>${tags}</b></p>
        </div>`;
    });

    document.getElementById("results").innerHTML = output;
}
