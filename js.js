async function fetchProducts() {
  const container = document.getElementById("productContainer");
  try {
    const response = await fetch("https://dummyjson.com/products?limit=8");
    const data = await response.json();

    data.products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "max-w-sm rounded overflow-hidden shadow-lg m-2";
      card.innerHTML = `
                <div class="flex items-center justify-center  overflow-hidden" style="height:200px;">
                    <img style="width:200px;" src="${product.thumbnail}" alt="${product.title}">
                </div>
                <div class="px-6 pt-4 pb-2">
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Price: $${product.price}</span>
                </div>
                <div class="px-2" style="height:200px;">
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">${product.title}</div>
                    </div>
                <button type="button" data-modal-toggle="productDetailModal-${product.id}" class="modal-open text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">View Product</button>

                </div>

            `;

      // Add the modal for product details
      const modal = document.createElement("div");
      modal.innerHTML = `
                <div id="productDetailModal-${product.id}" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
                        <!-- Modal content -->
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <!-- Modal header -->
                            <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    ${product.title}
                                </h3>
                                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="productDetailModal-${product.id}">
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <!-- Modal body -->
                            <div class="p-6 space-y-6">
                                <img src="${product.thumbnail}" alt="${product.title}" class="w-full max-w-sm mx-auto rounded-md">
                                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    ${product.description}
                                </p>
                                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Category: ${product.category}
                                </p>
                            </div>
                            <!-- Modal footer -->
                            <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                <button data-modal-toggle="productDetailModal-${product.id}" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
      document.body.appendChild(modal);

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Fetching products failed:", error);
    container.innerText = "Failed to load products. Please try again later.";
  }
}

fetchProducts();
