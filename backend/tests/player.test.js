import Players from '../players';

test('New players', () => {
  let test_player = new Players;
  expect(test_player.players).toStrictEqual({});
});