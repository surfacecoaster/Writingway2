// AI initialization helper
// Exposes window.AI.init(app) which performs the model health check and updates the app state
(function () {
    async function init(app) {
        try {
            app.showModelLoading = true;
            app.loadingMessage = 'Connecting to AI server...';
            app.loadingProgress = 30;

            // Check if llama-server is running
            const response = await fetch('http://localhost:8080/health');

            if (response.ok) {
                app.loadingProgress = 100;
                app.loadingMessage = 'Connected to AI!';

                await new Promise(resolve => setTimeout(resolve, 500));

                app.aiStatus = 'ready';
                app.aiStatusText = 'AI Ready (Local Server)';
                app.showModelLoading = false;

                console.log('✓ Connected to llama-server successfully');
            } else {
                throw new Error('Server not responding');
            }
        } catch (error) {
            console.error('Could not connect to AI server:', error);
            app.aiStatus = 'error';
            app.aiStatusText = 'AI server not running';
            app.showModelLoading = false;

            console.log('Make sure start.bat launched llama-server successfully');
        }
    }

    window.AI = window.AI || {};
    window.AI.init = init;
})();
