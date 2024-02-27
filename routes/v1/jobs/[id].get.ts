/**
 * GET individual job
 */
export default defineEventHandler(async (event) => {
    const job_id = getRouterParam(event, 'id')

    return {
        job_id,
    }
})
