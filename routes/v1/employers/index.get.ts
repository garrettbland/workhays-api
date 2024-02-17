export default eventHandler(async (event) => {
  throw new Error("Whoa employer error");
  try {
    throw new Error("Whoa employer error");
    return {
      jobs: [
        {
          name: "retail sales associate",
        },
      ],
    };
  } catch (err) {
    return {
      employers: [],
      error: true,
    };
  }
});
