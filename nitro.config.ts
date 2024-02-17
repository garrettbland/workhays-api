//https://nitro.unjs.io/config
export default defineNitroConfig({
    /**
     * Use Netlify Edge functions
     * https://nitro.unjs.io/deploy/providers/netlify#netlify-edge-functions
     */
    preset: 'netlify-edge',
    runtimeConfig: {
        /**
         * "dev_token" by default. Use NEXT_API_TOKEN to override in .env
         */
        apiToken: 'dev_token',

        /**
         * false by default. Use NEXT_ENABLE_LOGGING to override in .env
         */
        enableLogging: false,
    },
})
