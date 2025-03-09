document.addEventListener("DOMContentLoaded", function () {
    loadComponent("header.html", "header-placeholder");
    loadComponent("footer.html", "footer-placeholder");
});

function loadComponent(url, placeholderId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(placeholderId).innerHTML = data;
        })
        .catch(error => console.error(`Error loading ${url}:`, error));
}
