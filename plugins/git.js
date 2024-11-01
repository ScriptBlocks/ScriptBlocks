// git.js
function initialize() {
    const pluginName = "GitPlugin";
    const items = [
        { label: 'Git Pull', action: () => alert('Git Pull executed') },
        { label: 'Git Push', action: () => alert('Git Push executed') },
    ];

    // Check if window and injectPluginMenu are available
    if (typeof window !== 'undefined' && window.injectPluginMenu) {
        window.injectPluginMenu(pluginName, items);
    } else {
        console.error('Cannot inject plugin menu: window or injectPluginMenu is not defined');
    }
}

module.exports = { initialize };
