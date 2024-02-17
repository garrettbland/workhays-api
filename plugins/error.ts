export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook("error", async (error, { event }) => {
    // Log this externally somewhere
    console.error(`${event.path} Application error:`, error);
  });
});
