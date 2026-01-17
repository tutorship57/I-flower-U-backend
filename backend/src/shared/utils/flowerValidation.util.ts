function validateFlowersFromDB(
  selected: string[],
  flowerNames: string[]
) {
  return selected.filter(flower =>
    flowerNames.includes(flower)
  );
}

export { validateFlowersFromDB };