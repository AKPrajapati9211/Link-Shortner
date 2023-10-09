document.addEventListener("DOMContentLoaded", function () {
    const originalLinkInput = document.getElementById("originalLink");
    const shortenButton = document.getElementById("shortenButton");
    const linksList = document.getElementById("linksList");

    // Load existing links from localStorage
    const storedLinks = JSON.parse(localStorage.getItem("shortenedLinks")) || [];

    // Function to generate a random short code
    function generateShortCode() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let shortCode = "";
        for (let i = 0; i < 6; i++) {
            shortCode += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return shortCode;
    }

    // Function to shorten a link
    function shortenLink(originalLink) {
        const shortCode = generateShortCode();
        const shortenedLink = {
            original: originalLink,
            short: shortCode,
        };
        storedLinks.push(shortenedLink);
        localStorage.setItem("shortenedLinks", JSON.stringify(storedLinks));
        return shortenedLink;
    }

    // Function to display shortened links
    function displayLinks() {
        linksList.innerHTML = "";
        storedLinks.forEach((link) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<a href="${link.original}" target="_blank">${link.short}</a>`;
            linksList.appendChild(listItem);
        });
    }

    // Event listener for shortening a link
    shortenButton.addEventListener("click", function () {
        const originalLink = originalLinkInput.value.trim();
        if (originalLink !== "") {
            const shortenedLink = shortenLink(originalLink);
            displayLinks();
            originalLinkInput.value = "";
        }
    });

    // Initial display of links
    displayLinks();
});
