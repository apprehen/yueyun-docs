const obj = {
  name: 'John',
  age: 30,
}
const age = obj.age
obj.age = 31
console.log(obj.age.__proto__===age.__proto__)
console.log(age.__proto__)