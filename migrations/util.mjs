/**
 * Max items per batch that can be committed to firebase
 */
export const MAX_PER_BATCH = 499

export const waitOneSecond = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 1010)
    })
}
