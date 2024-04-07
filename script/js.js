async function fetchProducts() {
  const container = document.getElementById("productContainer");
  try {
    const response = await fetch("https://dummyjson.com/products?limit=8");
    const data = await response.json();

    data.products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "max-w-sm rounded overflow-hidden shadow-lg m-2";
      card.innerHTML = `
                  <div class="flex items-center justify-center overflow-hidden" style="height:200px;">
                      <img style="width:200px;" src="${product.thumbnail}" alt="${product.title}">
                  </div>
                  <div class="px-6 pt-4 pb-2">
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Price: $${product.price}</span>
                  </div>
                  <div class="px-2" style="height:200px;">
                      <div class="px-6 py-4">
                          <div class="font-bold text-xl mb-2">${product.title}</div>
                      </div>
                  <button type="button" class="view-product-btn text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">View Product</button>
                  </div>
              `;

      container.appendChild(card);

      // Find the button that was just created and attach a click event listener to it
      card.querySelector(".view-product-btn").addEventListener("click", () => {
        // Use SweetAlert to display the product details
        Swal.fire({
          title: `<strong>${product.title}</strong>`,
          html: `
              <div class="text-left">
                <img src="${product.thumbnail}" alt="${product.title}" class="w-full max-w-sm mx-auto rounded-md">
                <p>${product.description}</p>
                <p>Category: ${product.category}</p>
                <p>Price: $${product.price}</p>
              </div>
            `,
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText: "Close",
          confirmButtonAriaLabel: "Close this dialog",
        });
      });
    });
  } catch (error) {
    console.error("Fetching products failed:", error);
    // Check if the browser is online
    if (!navigator.onLine) {
      // Use SweetAlert to inform the user
      Swal.fire({
        title: "No Internet Connection",
        text: "Please connect to the internet to access the products.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    } else {
      // Handle other kinds of errors (e.g., API errors) here
      Swal.fire({
        title: "Error",
        text: "Failed to load products. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }
}

// Call the fetchProducts function to load products
fetchProducts();

// Ensure you have included SweetAlert2 library in your HTML
