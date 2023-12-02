const sleep = async (ms: number = 500): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export default sleep;
