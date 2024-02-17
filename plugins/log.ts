/**
 * Application level logging. If "enableLogging" is true, then
 * every request will be logged. Default is "false" set in "nitro.config.ts" and
 * .env value will overwrite. Used primarily in lower level environments.
 *
 * Example on each request...
 *
 * ```bash
 * GET /v1/jobs
 * POST /v1/users
 * GET /v1/jobs/1234
 * ```
 */
export default defineNitroPlugin((nitro) => {
    nitro.hooks.hook('request', async (event) => {
        const isLoggingEnabled = Boolean(useRuntimeConfig().enableLogging)
        if (isLoggingEnabled) {
            console.log(`${event.method} ${event.path}`)
        }
    })
})
