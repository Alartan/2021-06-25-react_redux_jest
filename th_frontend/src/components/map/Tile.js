const Tile = ({number, value, clickHandler}) => {
  const clickTile = (e) => {
    e.preventDefault();
    clickHandler(number);
  }
  return (
    <svg className="tile" onClick={clickTile}>
      <rect width='50px' height='50px' style={{fill:'blue', strokeWidth:3, stroke: 'black'}} />
      <text x="15" y="40" fill="red" style={{ font: "40px sans-serif" }}>{value}</text>
    </svg>
    );
}

export default Tile;