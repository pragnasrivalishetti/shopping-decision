function searchProduct() {
    const query = document.getElementById("searchBox").value.trim();

    if (!query) {
        alert("Enter a product name!");
        return;
    }

    const products = generateProducts(query);
    displayProducts(products);
}

// Generate dynamic results for ANY product
function generateProducts(name) {
    const platforms = ["Amazon", "Flipkart", "Meesho", "Snapdeal"];

    return platforms.map(p => ({
        name: `${name} (${p})`,
        price: Math.floor(Math.random() * 50000) + 500,
        rating: (Math.random() * 2 + 3).toFixed(1),
        review: getReview(),
        platform: p,
        available: Math.random() > 0.3
    }));
}

function getReview() {
    const reviews = [
        "Excellent quality",
        "Value for money",
        "Average performance",
        "Highly recommended",
        "Not worth the price",
        "Good but can improve"
    ];

    return reviews[Math.floor(Math.random() * reviews.length)];
}

function displayProducts(products) {
    let best = products.reduce((a, b) =>
        parseFloat(a.rating) > parseFloat(b.rating) ? a : b
    );

    let output = "";

    products.forEach(p => {
        output += `
        <div class="card ${p === best ? 'best' : ''}">
            <h3>${p.name}</h3>
            <p>💰 Price: ₹${p.price}</p>
            <p>⭐ Rating: ${p.rating}</p>
            <p>📝 Review: ${p.review}</p>
            <p>🏪 Platform: ${p.platform}</p>
            <p>📦 Availability: ${p.available ? "In Stock" : "Out of Stock"}</p>
            ${p === best ? "<b style='color:green;'>✔ Best Choice</b>" : ""}
        </div>`;
    });

    document.getElementById("results").innerHTML = output;
}
