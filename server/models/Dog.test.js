const Dog = require("./Dog");

describe("Dog", () => {
  describe("toJSON", () => {
    const dog = new Dog("test", "2021");
    test("should return specific structure of json", () => {
      expect(dog.toJSON()).toEqual({
        age: 1,
        birth: "2021",
        name: "test",
      });
    });
  });

  describe("getNameToUpperCase", () => {
    const dog = new Dog("test", "2021");
    test("should return name to uppercase", () => {
      expect(dog.getNameToUpperCase()).toEqual("TEST");
    });
  });
});
