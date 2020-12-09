# 1. 函数相关

## 1.1. call()& apply()& bind()

### 1.1.1. API说明

- call()
  - 语法: call(fn, obj, ...args)
  - 功能: 执行fn, 使this为obj, 并将后面的n个参数传给fn(功能等同于函数对象的call方法)
- apply()
  - 语法: apply(fn, obj, args)
  - 功能: 执行fn, 使this为obj, 并将args数组中的元素传给fn(功能等同于函数对象的apply方法)
- bind()
  - 语法: bind(fn, obj, ...args)
  - 功能: 给fn绑定this为obj, 并指定参数为后面的n个参数 (功能等同于函数对象的bind方法)



### 1.1.2.实现说明

- 区别call()/apply()/bind()
  - call(obj)/apply(obj): 调用函数, 指定函数中的this为第一个参数的值
  - bind(obj): 返回一个新的函数, 新函数内部会调用原来的函数, 且this为bind()指定的第一参数的值
  - 注意: 如果obj是null/undefined, this为window
- 应用
  - all()/bind()应用: 根据伪数组生成真数组
  - bind(): react中组件的自定义方法 / vue中的事件回调函数内部
- 自定义call()/apply()
  - 给obj添加一个临时方法, 方法名任意, 值为当前函数
  - 通过obj调用这个临时方法, 并将接收的参数传入
  - 删除obj上的这个临时方法属性
- 自定义实现bind()
  - 返回一个新函数
  - 在新函数内部通过原函数对象的call方法来执行原函数
  - 指定原函数的this为obj
  - 指定参数为bind调用的参数和后面新函数调用的参数



### 1.1.3.编码实现

- 自定义函数对象的call方法: `src/function/call.js`

```js
/* 
自定义函数对象的call方法
*/
export function call(fn, obj, ...args) {
  console.log('call()')

  // 如果obj是undefined/null, this指定为window
  if (obj===undefined || obj===null) {
    // return fn(...args)
    obj = window
  }

  // 给obj添加一个临时方法, 方法指向的函数就是fn
  obj.tempFn = fn
  // 通过obj来调用这个方法 ==> 也就会执行fn函数 ==> 此时fn中的this肯定为obj
  const result = obj.tempFn(...args)
  // 删除obj上的临时方法
  delete obj.tempFn
  // 返回fn执行的结果
  return result
}
```

- 自定义函数对象的apply方法: `src/function/apply.js`

```js
/* 
自定义函数对象的apply方法
*/
export function apply(fn, obj, args) {
  console.log('apply()')

  // 如果obj是undefined/null, this指定为window
  if (obj===undefined || obj===null) {
    // return fn(...args)
    obj = window
  }

  // 给obj添加一个临时方法, 方法指向的函数就是fn
  obj.tempFn = fn
  // 通过obj来调用这个方法 ==> 也就会执行fn函数 ==> 此时fn中的this肯定为obj
  const result = obj.tempFn(...args)
  // 删除obj上的临时方法
  delete obj.tempFn
  // 返回fn执行的结果
  return result
}
```

- 自定义函数对象的bind方法: `src/function/bind.js`

```js
import {call} from './call'
/* 
  自定义函数对象的bind方法
*/
export function bind(fn, obj, ...args) {
  console.log('bind()')
  // 返回一个新函数
  return (... args2) => {
    // 通过call调用原函数, 并指定this为obj, 实参为args与args2
    return call(fn, obj, ...args, ...args2)
  }
}
```

### 1.1.4.测试

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>函数的call/apply/bind()</title>
</head>
<body>
  <script src="../dist/atguigu-utils.js"></script>
  <script>
    var m = 11
    function f(a, b) {
      console.log(a, b, this.m, this)
      return a + b
    }

    const obj = {m: 22}

    /* 测试内置的函数对象的call方法 */
    // console.log(f.call(obj, 1, 2, 3))
    // console.log(f.call(undefined, 1, 2, 3))
    
    /* 测试内置的函数对象的apply方法 */
    // console.log(f.apply(obj, [4, 5, 6]))
    // console.log(f.apply(undefined, [4, 5, 6]))
    
    /* 测试内置的函数对象的bind方法 */
    // const f2 = f.bind(obj)
    // // console.log(f(1, 2)) // bind()并没有改变函数本身, 接收调用原函数是不会有任何变化的
    // f2(3, 4) // 必须调用bind返回的新函数, 原函数中的this才是指定的obj
    // console.log(f.bind(obj, 1)(3, 4))  // 1 3 22 obj   4
    // console.log(f.bind(obj, 1, 2)(3, 4)) // 1 2, 22 obj  3    注意: 可以暂停视频, 先自己分析一下

    /* ******************************************************** */

    /* 测试自定义call() */
    // console.log(aUtils.call(f, obj, 1, 2, 3))
    // console.log(aUtils.call(f, undefined, 1, 2, 3))
    
    /* 测试自定义apply() */
    // console.log(aUtils.apply(f, obj, [1, 2, 3]))
    // console.log(aUtils.apply(f, undefined, [1, 2, 3]))
    
    
    /* 测试自定义bind() */
    console.log(aUtils.bind(f, obj)(1, 2))
    console.log(aUtils.bind(f, obj, 3)(1, 2))
    console.log(aUtils.bind(f, obj, 4)(1, 2))
    console.log(aUtils.bind(f, undefined, 4)(1, 2))

  </script>
</body>
</html>

```



## 1.2. 函数节流与函数防抖

### 1.2.1. 相关理解

- 事件频繁触发可能造成的问题?

  - 一些浏览器事件:window.onresize、window.mousemove等，触发的频率非常高，会造成界面卡顿
  - 如果向后台发送请求，频繁触发，对服务器造成不必要的压力
- 如何限制事件处理函数频繁调用

  - 函数节流
  - 函数防抖
- 函数节流(throttle)

  - 理解: 
    - 在函数需要频繁触发时: 函数执行一次后，只有大于设定的执行周期后才会执行第二次
    - 适合多次事件按时间做平均分配触发
  - 场景：    
    - 窗口调整（resize）
    - 页面滚动（scroll）
    - DOM 元素的拖拽功能实现（mousemove）
    - 抢购疯狂点击（click）
- 函数防抖(debounce)

  - 理解:    
    - 在函数需要频繁触发时: 在规定时间内，只让最后一次生效，前面的不生效。    
    - 适合多次事件一次响应的情况
  - 场景:
    - 输入框实时搜索联想（keyup/input）
- 区别函数节流与防抖

![02_函数防抖与节流](../images/throttle_debounce.jpg)



### 1.2.2.API说明

- throttle()  节流
  - 语法: throttle(callback, wait)
  - 功能: 创建一个节流函数，在 wait 毫秒内最多执行 `callback` 一次
- debounce()  防抖
  - 语法: debounce(callback, wait)
  - 功能: 创建一个防抖动函数，该函数会从上一次被调用后，延迟 `wait` 毫秒后调用 `callback` 



### 1.2.3.编码实现

- `src/function/throttle.js`: 函数节流

```js
/* 
实现函数节流
- 语法: throttle(callback, wait)
- 功能: 创建一个节流函数，在 wait 毫秒内最多执行 `callback` 一次
*/
export function throttle(callback, wait) {
  let start = 0
  // 返回一个事件监听函数(也就是节流函数)
  return function (event) {
    console.log('throttle event')
    // 只有当距离上次处理的时间间隔超过了wait时, 才执行处理事件的函数
    const current = Date.now()
    if ( current - start > wait) {
      callback.call(this, event) // 需要指定this和参数
      start = current
    }
  }
}
```

- `src/function/debounce.js`: 函数防抖

```js
/* 
实现函数防抖
- 语法: debounce(callback, wait)
- 功能: 创建一个防抖动函数，该函数会从上一次被调用后，延迟 `wait` 毫秒后调用 `callback`
*/
export function debounce (callback, wait) {
  // 用来保存定时器任务的标识id
  let timeoutId = -1 
  // 返回一个事件监听函数(也就是防抖函数)
  return function (event) {
    console.log('debounce event')
    // 清除未执行的定时器任务
    if (timeoutId!==-1) {
      clearTimeout(timeoutId)
    }
    // 启动延迟 await 时间后执行的定时器任务
    timeoutId = setTimeout(() => {
      // 调用 callback 处理事件
      callback.call(this, event)
      // 处理完后重置标识
      timeoutId = -1
    }, wait)
  }
}
```

### 1.2.4.测试

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>函数节流与防抖</title>
</head>
<body>

  <button id="handle">正常处理</button>
  <button id="throttle">测试函数节流</button>
  <button id="debounce">测试函数防抖</button>
  
  <script src="../dist/atguigu-utils.js"></script>
  <!-- <script src="../node_modules/atguigu-utils/dist/atguigu-utils.js"></script> -->
  <script>
    /* 处理点击事件的回调函数 */
    function handleClick(event) { // 处理事件的回调
      console.log('处理点击事件', this, event)
    }

    document.getElementById('handle').onclick = handleClick
    document.getElementById('throttle').onclick = aUtils.throttle(handleClick, 2000)
    document.getElementById('debounce').onclick = aUtils.debounce(handleClick, 2000)
  </script>

</body>
</html>
```

