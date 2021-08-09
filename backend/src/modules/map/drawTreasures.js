export default function drawTreasures() {
  let treasures = Array.from([1, 1, 1],
    () => Math.floor(Math.random() * 25 % 25)
  );
  while (treasures[0] === treasures[1])
    treasures[1] = Math.floor(Math.random() * 25 % 25);
  while (treasures[0] === treasures[2]
    || treasures[1] === treasures[2])
    treasures[2] = Math.floor(Math.random() * 25 % 25);
  return treasures;
};