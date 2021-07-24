export default function proximitySquare(treasure, tile) {
  const treasure_x = treasure % 5;
  const treasure_y = Math.floor(treasure / 5);
  const tile_x = tile % 5;
  const tile_y = Math.floor(tile / 5);
  return (treasure_x - tile_x) ** 2 + (treasure_y - tile_y) ** 2;
}
