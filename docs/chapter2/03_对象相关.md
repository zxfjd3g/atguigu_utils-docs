# 3. 对象相关

## 3.1.相关API
- newInstance()
- myInstanceOf()
- mergeObject()
- clone1() / clone2()
- deepClone1() / deepClone2() / deepClone3() / deepClone4()



## 3.2.自定义new

### 3.2.1.API 相关

- 语法: newInstance(Fn, ...args)
- 功能: 创建Fn构造函数的实例对象
- 实现: 创建空对象obj, 调用Fn指定this为obj, 返回obj

### 3.2.3.编码实现

- `src/object/newInstance.js`

```js
export function newInstance(Fn, ...args) {
  // 创建一个新的对象
  const obj = {}
  // 执行构造函数
  const result = Fn.apply(obj, args) // 相当于: obj.Fn()
  // 如果构造函数执行的结果是对象, 返回这个对象
  if (result instanceof Object) {
    return result
  }
  // 如果不是, 返回新创建的对象
  obj.__proto__.constructor = Fn // 让原型对象的构造器属性指向Fn
  // 返回对象
  return obj
}
```

### 3.2.3.测试

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>自定义new</title>
</head>
<body>
  <script src="../dist/atguigu-utils.js"></script>
  <script>
    function Person(name, age) {
      this.name = name
      this.age = age
      // return {}
      // return []
      // return function (){}
      // return 1
      // return undefined
    }

    const p = new Person('tom', 12)
    console.log(p)

    const p2 = aUtils.newInstance(Person, 'Jack', 13)
    console.log(p2, p2.constructor)
  </script>
</body>
</html>
```



## 3.3.自定义instanceof

### 3.3.1. API 相关

- 语法: myInstanceOf(obj, Type)
- 功能: 判断obj是否是Type类型的实例
- 实现: Type的原型对象是否是obj的原型链上的某个对象, 如果是返回tru, 否则返回false

### 3.3.2.编码实现

- `src/object/myInstanceOf.js`

```js
export function myInstanceOf(obj, Type) {
  // 得到原型对象
  let protoObj = obj.__proto__

  // 只要原型对象存在
  while(protoObj) {
    // 如果原型对象是Type的原型对象, 返回true
    if (protoObj === Type.prototype) {
      return true
    }
    // 指定原型对象的原型对象
    protoObj = protoObj.__proto__
  }
  
  return false
}
```

### 3.3.3. 测试

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>自定义instanceof</title>
</head>
<body>
  <script src="../dist/atguigu-utils.js"></script>
  <script>
    function Person(name, age) {
      this.name = name
      this.age = age
    }
    const p = new Person('tom', 12)
    
    console.log(aUtils.myInstanceOf(p, Object), p instanceof Object)
    console.log(aUtils.myInstanceOf(p, Person), p instanceof Person)
    console.log(aUtils.myInstanceOf(p, Function), p instanceof Function)
  </script>
</body>
</html>
```



## 3.4.合并多个对象

### 3.4.1.API 相关

- 语法: object mergeObject(...objs)
- 功能: 合并多个对象, 返回一个合并后对象(不改变原对象)
- 例子: 
  - { a: [{ x: 2 }, { y: 4 }], b: 1}
  - { a: { z: 3}, b: [2, 3], c: 'foo'}
  - 合并后: { a: [ { x: 2 }, { y: 4 }, { z: 3 } ], b: [ 1, 2, 3 ], c: 'foo' }

### 3.4.2.编码实现

- `src/object/mergeObject.js`

```js
export function mergeObject(...objs) {
  return objs.reduce((pre, obj) => {
    return Object.keys(obj).reduce((p, key) => {
      p[key] = !p.hasOwnProperty(key) ? obj[key] : [].concat(p[key], obj[key])
      return p
    }, pre)
  }, {})
}
```

### 3.4.3.测试

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>合并多个对象</title>
</head>
<body>
  <script src="../dist/atguigu-utils.js"></script>
  <script>
    const object = {
      a: [{ x: 2 }, { y: 4 }],
      b: 1
    }
    const other = {
      a: { z: 3},
      b: [2, 3],
      c: 'foo'
    }
    console.log(aUtils.merge(object, other)) 
  </script>
</body>
</html>
```



## 3.5. 对象/数组拷贝

### 3.5.1.区别浅拷贝与深拷贝

- 纯语言表达:
  - 浅拷贝: 只是复制了对象属性或数组元素本身(只是引用地址值)
  - 深拷贝: 不仅复制了对象属性或数组元素本身, 还复制了指向的对象(使用递归)
- 举例说明: 拷贝persons数组(多个人对象的数组)
  - 浅拷贝: 只是拷贝了每个person对象的引用地址值, 每个person对象只有一份
  - 深拷贝: 每个person对象也被复制了一份新的

### 3.5.2.实现浅拷贝

- `src/object/clone.js`

```js
/* 
实现浅拷贝
  方法一: 利用ES6语法
  方法二: 利用ES5语法: for...in
*/
/* 方法一: 利用ES6语法*/
export function clone1(target) {
  if (target instanceof Array) {
    // return target.slice()
    // return target.filter(() => true)
    // return target.map(item => item)
    return [...target]
  } else if (target instanceof Object){
    // return Object.assign({}, target)
    return {...target}
  } else {
    return target
  }
}

/* 方法二: 利用ES5语法: for...in */
export function clone2(target) {
  if (target!=null && typeof target==='object') {
    const cloneTarget = Array.isArray(target) ? [] : {}
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        cloneTarget[key] = target[key]
      }
    }
    return cloneTarget
  } else {
    return target
  }
}
```



### 3.5.3.实现深拷贝

- 实现一: 大众乞丐版
  - 问题1: 函数属性会丢失
  - 问题2: 循环引用会出错
- 实现二: 面试基础版
  - 解决问题1: 函数属性还没丢失
- 实现三: 面试加强版本
  - 解决问题2: 循环引用正常
- 实现四: 面试加强版本2(优化遍历性能)
  - 数组: while | for | forEach() 优于 for-in | keys()&forEach() 
  - 对象: for-in 与 keys()&forEach() 差不多

- 编码实现: `src/object/deepClone.js`

```js
/* 
深度克隆
1). 大众乞丐版
    问题1: 函数属性会丢失
    问题2: 循环引用会出错
2). 面试基础版本
    解决问题1: 函数属性还没丢失
3). 面试加强版本
    解决问题2: 循环引用正常
4). 面试加强版本2(优化遍历性能)
    数组: while | for | forEach() 优于 for-in | keys()&forEach() 
    对象: for-in 与 keys()&forEach() 差不多
*/
/* 
1). 大众乞丐版
  问题1: 函数属性会丢失
  问题2: 循环引用会出错
*/
export function deepClone1(target) {
  return JSON.parse(JSON.stringify(target))
}

/* 
获取数据的类型字符串名
*/
function getType(data) {
  return Object.prototype.toString.call(data).slice(8, -1)
}

/*
2). 面试基础版本
  解决问题1: 函数属性还没丢失
*/
export function deepClone2(target) {
  const type = getType(target)

  if (type==='Object' || type==='Array') {
    const cloneTarget = type === 'Array' ? [] : {}
    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        cloneTarget[key] = deepClone2(target[key])
      }
    }
    return cloneTarget
  } else {
    return target
  }
}

/* 
3). 面试加强版本
  解决问题2: 循环引用正常
*/
export function deepClone3(target, map = new Map()) {
  const type = getType(target)
  if (type==='Object' || type==='Array') {
    let cloneTarget = map.get(target)
    if (cloneTarget) {
      return cloneTarget
    }
    cloneTarget = type==='Array' ? [] : {}
    map.set(target, cloneTarget)
    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        cloneTarget[key] = deepClone3(target[key], map)
      }
    }
    return cloneTarget
  } else {
    return target
  }
}

/* 
4). 面试加强版本2(优化遍历性能)
    数组: while | for | forEach() 优于 for-in | keys()&forEach() 
    对象: for-in 与 keys()&forEach() 差不多
*/
export function deepClone4(target, map = new Map()) {
  const type = getType(target)
  if (type==='Object' || type==='Array') {
    let cloneTarget = map.get(target)
    if (cloneTarget) {
      return cloneTarget
    }

    if (type==='Array') {
      cloneTarget = []
      map.set(target, cloneTarget)
      target.forEach((item, index) => {
        cloneTarget[index] = deepClone4(item, map)
      })
    } else {
      cloneTarget = {}
      map.set(target, cloneTarget)
      Object.keys(target).forEach(key => {
        cloneTarget[key] = deepClone4(target[key], map)
      })
    }

    return cloneTarget
  } else {
    return target
  }
}
```

### 3.5.4.测试

- 浅拷贝测试

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>浅克隆/浅复制/浅拷贝</title>
</head>
<body>
  <!-- 
    实现浅拷贝
        方法一: 利用ES6语法
        方法二: 利用ES5语法: for...in
  -->
  <script src="../dist/atguigu-utils.js"></script>
  <script>
    const obj1 = { x: 'abc', y: {m: 1} }
    // const obj2 = aUtils.clone1(obj1)
    const obj2 = aUtils.clone2(obj1)
    console.log(obj2, obj2===obj1, obj2.x===obj1.x, obj2.y===obj1.y)

    const arr1 = ['abc', {m: 1}]
    // const arr2 = aUtils.clone1(arr1)
    const arr2 = aUtils.clone2(arr1)
    console.log(arr2, arr2===arr1, arr2[0]===arr1[0], arr2[1]===arr1[1])
  </script>
</body>
</html>
```

- 深拷贝测试

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>深度克隆/深复制/深拷贝</title>
</head>
<body>
  <script src="https://cdn.bootcss.com/lodash.js/4.17.15/lodash.min.js"></script>
  <script src="../dist/atguigu-utils.js"></script>
  <script>
    const obj1 = { 
      a: 1,
      b: [ 'e', 'f', 'g'],
      c: { h: { i: 2 } },
      d: function (){}
     }
     obj1.b.push(obj1.c)
     obj1.c.j = obj1.b
     
    // const obj2 = _.cloneDeep(obj1)
    // const obj2 = aUtils.deepClone1(obj1)
    // const obj2 = aUtils.deepClone2(obj1)
    // const obj2 = aUtils.deepClone3(obj1)
    const obj2 = aUtils.deepClone4(obj1)
    console.log(obj2, obj2.c === obj1.c, obj2.d===obj1.d)
  </script>
</body>
</html>
```

