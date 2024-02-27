/**
 * GET all jobs
 */

const DEFAULT_LIMIT = 12

export default eventHandler(async (event) => {
    const limit = Number(getQuery(event)['limit'] ?? DEFAULT_LIMIT)
    const industry = getQuery(event)['industry']

    return {
        total_jobs: 100,
        total_pages: 4,
        current_page: 1,
        limit,
        industry,
        jobs: [
            {
                name: 'retail sales associate',
            },
        ],
    }
})
