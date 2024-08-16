window.addEventListener("DOMContentLoaded", () => {
  // const blocksContainer = document.querySelector("#blocks");

  // const blockSize = 50;
  // const screenWidth = window.innerWidth;
  // const screenHeight = window.innerHeight;

  // const numOfColumns = Math.ceil(screenWidth / blockSize);
  // const numOfRows = Math.ceil(screenHeight / blockSize);
  // const numOfBlocks = numOfColumns * numOfRows;

  // function createBlocks() {
  //   for (let i = 0; i < numOfBlocks; i++) {
  //     const block = document.createElement("div");

  //     block.classList.add("block");
  //     block.dataset.index = i;
  //     block.addEventListener("mouseover", highlightRandomNeighbours);

  //     blocksContainer.appendChild(block);
  //   }
  // }

  const blocksContainer = document.querySelector("#blocks");

  const blockSize = 30;
  const containerWidth = blocksContainer.offsetWidth;
  const containerHeight = blocksContainer.offsetHeight;

  const numOfColumns = Math.floor(containerWidth / blockSize);
  const numOfRows = Math.floor(containerHeight / blockSize);
  const numOfBlocks = numOfColumns * numOfRows;

  function createBlocks() {
    for (let i = 0; i < numOfBlocks; i++) {
      const block = document.createElement("div");

      block.classList.add("block");
      block.dataset.index = i;
      block.addEventListener("mouseover", highlightRandomNeighbours);

      blocksContainer.appendChild(block);
    }
  }

  function highlightRandomNeighbours() {
    const index = parseInt(this.dataset.index);

    const neighbours = [
      index - 1,
      index + 1,
      index - numOfColumns,
      index + numOfColumns,
      index - numOfColumns - 1,
      index - numOfColumns + 1,
      index + numOfColumns - 1,
      index + numOfColumns + 1,
    ].filter(
      (i) =>
        i >= 0 &&
        i < numOfBlocks &&
        Math.abs((i % numOfColumns) - (index % numOfColumns)) <= 1
    );

    this.classList.add("highlight");
    setTimeout(() => {
      this.classList.remove("highlight");
    }, 500);

    shuffleArray(neighbours)
      .slice(0, 1)
      .forEach((nIndex) => {
        const neighbour = blocksContainer.children[nIndex];

        if (neighbour) {
          neighbour.classList.add("highlight");
          setTimeout(() => {
            neighbour.classList.remove("highlight");
          }, 500);
        }
      });
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  createBlocks();
});
