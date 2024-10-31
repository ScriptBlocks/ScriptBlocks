// plugins/ribbonTest.js
// This plugin adds a new item to the ribbon menu
function addRibbonMenuItem() {
    // Wait for the DOM to load before trying to manipulate it
    window.addEventListener('DOMContentLoaded', () => {
        const newMenuItem = document.createElement('li');
        const newLink = document.createElement('a');
        newLink.textContent = 'New Plugin Item';
        newLink.id = 'new-plugin-item'; // This ID will be used to attach events later

        // Define the action for the new menu item
        newLink.addEventListener('click', (event) => {
            event.preventDefault();
            alert('New Plugin Item clicked!');
            // Add additional functionality here as needed
        });

        newMenuItem.appendChild(newLink);
        document.querySelector('.ribbon-menu ul').appendChild(newMenuItem);
    });
}

// Export the function to be called by the main application
module.exports = addRibbonMenuItem;
