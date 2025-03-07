document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("search", function() {
        const cancelButton = searchInput.shadowRoot.querySelector("input[type='search']::-webkit-search-cancel-button");
        if (cancelButton) {
            cancelButton.style.color = "red";
        }
    });
});
