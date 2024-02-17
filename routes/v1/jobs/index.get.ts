export default eventHandler((event) => {
  console.log("getting jobs...");
  //console.log(`api token: ${useRuntimeConfig(event).apiToken}`);
  return {
    jobs: [
      {
        name: "retail sales associate",
      },
    ],
  };
});
