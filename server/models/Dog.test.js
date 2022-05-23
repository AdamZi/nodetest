const Dog = require('./Dog');

describe('Dog', () => {
  describe('toJSON', () => {
    const dog = new Dog('test', '2021');
    test('should return specific structure of json', () => {
      expect(dog.toJSON()).toEqual({
        age: 1,
        birth: '2021',
        name: 'test',
      });
    });
  });

  describe('getNameToUpperCase', () => {
    test('should return name to uppercase', () => {
      const dog = new Dog('test', '2021');
      expect(dog.getNameToUpperCase()).toEqual('TEST');
    });

    test('should return empty string if name is not provided', () => {
      const dog = new Dog(null, '2021');
      expect(dog.getNameToUpperCase()).toEqual('');
    });
  });
});
