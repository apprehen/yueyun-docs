// function outerFunction(x) {
//   return function innerFunction(y) {
//     return x + y;
//   };
// }

// const innerFunction = outerFunction(2);
// const result = innerFunction(3);
// console.log(result); // 5

// function foo() {
//   var name = 'yueyun'
//   let test1 = 1
//   const test2 = 2
//   const innerBar = {
//     getName: () => {
//       console.log(test1)
//       return name
//     },
//     setName: (newName) => {
//       name = newName
//     }
//   }
//   return innerBar
// }

// const bar = foo()
// bar.setName('yueyun2')
// console.log(bar.getName())
function debounce(func,delay) {
  let timer=null;
  return function () {
    // const context = this
    // console.log(this )
      const args = arguments
      clearTimeout(timer)
      timer = setTimeout(()=>{
          func.apply(this,args)
      },delay)
  }
}
window.addEventListener('scroll', debounce(() => {
  console.log('scroll')
}, 1000))