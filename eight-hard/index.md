##  如何理解JS的闭包

有一个函数以及相关引用环境组合而成的实体 在函数内部访问外部函数的变量

 并且这些变量可以在外部函数执行结束后可以依然保持其状态比如下面这样

```javascript
function outerFunction(x) {
  return function innerFunction(y) {
    return x + y;
  };
}

const innerFunction = outerFunction(2);
const result = innerFunction(3);
console.log(result); // 5
```

是怎么做到保存的呢？ 比如下面这样

```javascript
function foo() {
  var name = 'yueyun'
  let test1 = 1
  const test2 = 2
  const innerBar = {
    getName: () => {
      console.log(test1)
      return name
    },
    setName: (newName) => {
      name = newName
    }
  }
  return innerBar
}

const bar = foo()
bar.setName('yueyun2')
console.log(bar.getName())
```

我们可以知道，即使`foo()`这个函数已经被执行调用完了但是函数里的变量一直存在没有被销毁

**ES6 是支持块级作用域的，当执行到代码块时，如果代码块中有 let 或者 const 声明的变量，那么变量就会存放到该函数的词法环境中。**

`foo`函数执行完成后其执行上下文 但是由于返回了`setName`和`getName`中使用foo函数内部的`myname`和`test1`

## 闭包的应用

### 防抖

在持续触发事件，只执行最后一次操作

```javascript
function debounce(func,delay) {
    let timer=null;
    return function () {
        const context = this
        const args = arguments
       clearTimeout(timer)
        timer = setTimeout(()=>{
            func.apply(context,args)
        },delay)
    }
}
```

### 节流

使得一定时间内只触发一次函数,固定执行操作的频率

```javascript

```