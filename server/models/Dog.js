module.exports = class Dog {
  constructor(name, birth) {
    this.name = name;
    this.birth = birth || "unknown";
  }
  getAge() {
    return Math.floor((Date.now() - Date.parse(this.birth)) / 31556952000);
  }

  toJSON() {
    const { name, birth } = this;
    return {
      name,
      birth,
      age: this.getAge(),
    };
  }

  getNameToUpperCase() {
    return this.name.toUpperCase();
  }
};
