describe('practice with sample tests', () => {
  test('two plus two is four', () => {
    expect(2 + 2).toEqual(4);
  });

  test('object assignment should work', () => {
    const data = { one: 1 };
    data['two'] = 2;
    expect(data).toEqual({ one: 1, two: 2 });
  });

  test('adding positive numbers is not zero', () => {
    for (let a = 1; a < 10; a++) {
      for (let b = 1; b < 10; b++) {
        expect(a + b).not.toBe(0);
      }
    }
  });

  test('there is no I in team', () => {
    expect('team').not.toMatch(/I/);
  });

  test('there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
  });
});
