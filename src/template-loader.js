/**
 * Template Loader Module
 * Loads HTML templates from src/templates directory
 */
(function () {
    const TemplateLoader = {
        cache: {},

        /**
         * Load a template from the templates directory
         * @param {string} templateName - Name of the template file (without .html extension)
         * @returns {Promise<string>} - Template HTML content
         */
        async load(templateName) {
            // Check cache first
            if (this.cache[templateName]) {
                return this.cache[templateName];
            }

            try {
                const response = await fetch(`src/templates/${templateName}.html`);
                if (!response.ok) {
                    throw new Error(`Failed to load template: ${templateName}`);
                }

                const html = await response.text();
                this.cache[templateName] = html;
                return html;
            } catch (error) {
                console.error(`Template loading error for ${templateName}:`, error);
                return '';
            }
        },

        /**
         * Load and inject a template into a target element
         * @param {string} templateName - Name of the template file
         * @param {HTMLElement} targetElement - Element to inject the template into
         * @returns {Promise<void>}
         */
        async loadInto(templateName, targetElement) {
            const html = await this.load(templateName);
            if (html && targetElement) {
                targetElement.innerHTML = html;
            }
        },

        /**
         * Clear the template cache
         */
        clearCache() {
            this.cache = {};
        }
    };

    // Export to window
    window.TemplateLoader = TemplateLoader;
})();
