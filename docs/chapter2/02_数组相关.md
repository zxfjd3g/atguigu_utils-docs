# 2. 数组相关

## 2.1. API列表
1. map()
2. reduce() 
3. filter() 
4. find() 
5. findIndex() 
6. every() 
7. some() 
8. unique1() / unique2() / unique3() 
9. concat() 
10. slice() 
11. flatten() 
13. chunk() / chunk2() 
14. difference()  
16. pull() 
17. pullAll() 
18. drop() 
19. dropRight() 



## 2.2. 数组声明式系列方法

### 2.2.1.使用数组声明式系列方法

- **map**(): 返回一个由回调函数的返回值组成的新数组
- **reduce**(): 从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值
- **filter**(): 将所有在过滤函数中返回 `true` 的数组元素放进一个新数组中并返回
- **find**(): 找到第一个满足测试函数的元素并返回那个元素的值，如果找不到，则返回 `undefined`。
- **findIndex**(): 找到第一个满足测试函数的元素并返回那个元素的索引，如果找不到，则返回 `-1`。
- **every**(): 如果数组中的每个元素都满足测试函数，则返回 `true`，否则返回 `false。`
- **some**(): 如果数组中至少有一个元素满足测试函数，则返回 true，否则返回 false。

### 2.2.2.编码实现

- `src/array/declares.js`: 实现数组声明式处理系列工具函数

```js
/* 
实现map()
*/
export function map (array, callback) {
  const arr = []
  for (let index = 0; index < array.length; index++) {
    // 将callback的执行结果添加到结果数组中
    arr.push(callback(array[index], index))
  }
  return arr
}

/*
实现reduce() 
*/
export function reduce (array, callback, initValue) {
  let result = initValue
  for (let index = 0; index < array.length; index++) {
    // 调用回调函数将返回的结果赋值给result
    result = callback(result, array[index], index)
  }
  return result
}

/* 
实现filter()
*/
export function filter(array, callback) {

  const arr = []
  for (let index = 0; index < array.length; index++) {
    if (callback(array[index], index)) {
      arr.push(array[index])
    }
  }
  return arr
}

/* 
实现find()
*/
export function find (array, callback) {
  for (let index = 0; index < array.length; index++) {
    if (callback(array[index], index)) {
      return array[index]
    }
  }
  return undefined
}

/* 
实现findIndex()
*/
export function findIndex (array, callback) {
  for (let index = 0; index < array.length; index++) {
    if (callback(array[index], index)) {
      return index
    }
  }
  return -1
}

 /* 
 实现every()
 */
 export function every (array, callback) {
  for (let index = 0; index < array.length; index++) {
    if (!callback(array[index], index)) { // 只有一个结果为false, 直接返回false
      return false
    }
  }
  return true
}

/* 
实现some()
*/
export function some (array, callback) {
  for (let index = 0; index < array.length; index++) {
    if (callback(array[index], index)) { // 只有一个结果为true, 直接返回true
      return true
    }
  }
  return false
}
```

### 2.2.3.测试

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>数组声明式系列方法</title>
</head>
<body>
  <script src="../dist/atguigu-utils.js"></script>
  <script>
    /* 
    需求:
    1. 产生一个每个元素都比原来大10的新数组
    2. 得到所有奇数的和
    3. 得到值大于8且下标是偶数位的元素组成的数组
    4. 找出一个值大于8且下标是偶数位的元素
    5. 找出一个值大于8且下标是偶数位的元素的下标
    6. 判断下标为偶数的元素是否都为奇数
    7. 判断是否有下标为偶数的元素值为奇数
    */

    const arr = [1, 3, 6, 9, 15, 19, 16]

    /* 使用数组内置方法 */
    // console.log(arr.map((item, index) => item + 10))
    // console.log(arr.reduce((preTotal, item, index) => {
    //   return preTotal + (item%2===1 ? item : 0)
    // }, 0))
    // console.log(arr.filter((item, index) => item>8 && index%2===0))
    // console.log(arr.find((item, index) => item>8 && index%2===0))
    // console.log(arr.findIndex((item, index) => item>8 && index%2===0))
    // console.log(arr.every((item, index) => index%2===1 || item%2===1))
    // console.log(arr.some((item, index) => index%2===0 && item%2===1))


    /* 使用自定义工具函数 */
    console.log(aUtils.map(arr, (item, index) => item + 10))
    console.log(aUtils.reduce(arr, (preTotal, item, index) => {
      return preTotal + (item%2===1 ? item : 0)
    }, 0))
    console.log(aUtils.filter(arr, (item, index) => item>8 && index%2===0))
    console.log(aUtils.find(arr, (item, index) => item>8 && index%2===0))
    console.log(aUtils.findIndex(arr, (item, index) => item>8 && index%2===0))
    console.log(aUtils.every(arr, (item, index) => index%2===1 || item%2===1))
    console.log(aUtils.some(arr, (item, index) => index%2===0 && item%2===1))
  </script>
</body>
</html>
```



## 2.3.数组去重

### 2.3.1.API 说明

- 根据当前数组产生一个去除重复元素后的新数组
- 如: [2, 3, 2, 7, 6, 7] ==> [2, 3, 7, 6]

### 2.3.2. 实现

- 方法1: 利用forEach()和indexOf()
  - 说明: 本质是双重遍历, 效率差些

- 方法2: 利用forEach() + 对象容器
  - 说明: 只需一重遍历, 效率高些
- 方法3: 利用ES6语法: from + Set 或者 ... + Set
  - 说明: 编码简洁

### 2.3.3. 编码实现

- `src/array/unique.js`

```js
/*
方法1: 利用forEach()和indexOf()
  说明: 本质是双重遍历, 效率差些
*/
export function unique1 (array) {
  const arr = []
  array.forEach(item => {
    if (arr.indexOf(item)===-1) {
      arr.push(item)
    }
  })
  return arr
}

/*
方法2: 利用forEach() + 对象容器
  说明: 只需一重遍历, 效率高些
*/
export function unique2 (array) {
  const arr = []
  const obj = {}
  array.forEach(item => {
    if (!obj.hasOwnProperty(item)) {
      obj[item] = true
      arr.push(item)
    }
  })
  return arr
}

/*
方法3: 利用ES6语法
    1). from + Set
    2). ... + Set
    说明: 编码简洁
*/
export function unique3 (array) {
  // return Array.from(new Set(array))
  return [...new Set(array)]
}
```

### 2.3.4.测试

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>数组去重</title>
  </head>
  <body>
    <script src="../dist/atguigu-utils.js"></script>
    <script>
      console.log(aUtils.unique1([2, 3, 2, 7, 6, 7]))
      console.log(aUtils.unique2([2, 3, 2, 7, 6, 7]))
      console.log(aUtils.unique3([2, 3, 2, 7, 6, 7]))
    </script>
  </body>
</html>
```



## 2.4.数组合并与切片

### 2.4.1. API 说明

- concat(): 合并
  - 语法: var new_array = concat(array, value1[, value2[, ...[, valueN]]]) 
  - 功能: 将n个数组或值与当前数组合并生成一个新数组, 原始数组不会被改变 

- slice(): 切片
  - 语法: var new_array = slice(array, [begin[, end]])
  - 功能: 返回一个由 begin 和 end 决定的原数组的浅拷贝, 原始数组不会被改变

### 2.4.2.编码实现

- `src/array/concat.js`: 自定义数组合并

```js
/* 
语法: var new_array = concat(old_array, value1[, value2[, ...[, valueN]]]) 
功能: 将n个数组或值与当前数组合并生成一个新数组
*/
export function concat (array, ...values) {
  const arr = [...array]
  values.forEach(value => {
    if (Array.isArray(value)) {
      arr.push(...value)
    } else {
      arr.push(value)
    }
  })
  return arr
}
```



- `src/array/slice.js`: 自定义数组切片

```js
/* 
  语法: var new_array = slice(oldArr, [begin[, end]])
  功能: 返回一个由 begin 和 end 决定的原数组的浅拷贝, 原始数组不会被改变
*/
export function slice (array, begin, end) {
  // 如果当前数组是[], 直接返回[]
  if (array.length === 0) {
    return []
  }

  // 如果begin超过最大下标, 直接返回[]
  begin = begin || 0
  if (begin >= array.length) {
    return []
  }

  // 如果end不大于begin, 直接返回[]
  end = end || array.length
  if (end > array.length) {
    end = array.length
  }
  if (end <= begin) {
    return []
  }

  // 取出下标在[begin, end)区间的元素, 并保存到最终的数组中
  const arr = []
  for (let index = begin; index < end; index++) {
    arr.push(array[index])
  }

  return arr
}
```

### 2.4.3.测试

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>数组合并与切片</title>
</head>
<body>

  <script src="../dist/atguigu-utils.js"></script>
  <script>
    console.log(aUtils.concat([1, 2], [3, 4], 6))  // [1, 2, 3, 4, 6]

    console.log(aUtils.slice([1, 3, 5, 7, 9]))  // [1, 3, 5, 7, 9]
    console.log(aUtils.slice([1, 3, 5, 7, 9], 1, 3)) // [3, 5]
    console.log(aUtils.slice([1, 3, 5, 7, 9], 1, 10)) // [3, 5, 7, 9]
  </script>
</body>
</html>
```



## 2.5.数组扁平化

### 2.5.1.API 说明

- 语法: flatten(array)
- 取出嵌套数组(多维)中的所有元素放到一个新数组(一维)中
- 如: [1, [3, [2, 4]]]  ==>  [1, 3, 2, 4]

### 2.5.2.编码实现

- `src/array/flatten.js`

- 方法一: 递归 + reduce() + concat()
- 方法二: ... + some() + concat()

```js
/* 
数组扁平化: 取出嵌套数组(多维)中的所有元素放到一个新数组(一维)中
  如: [1, [3, [2, 4]]]  ==>  [1, 3, 2, 4]
*/

/*
方法一: 递归 + reduce() + concat()
*/
export function flatten1 (array) {
  return array.reduce((pre, item) => {
    if (Array.isArray(item) && item.some(cItem => Array.isArray(cItem))) {
      return pre.concat(flatten1(item))
    } else {
      return pre.concat(item)
    }
  }, [])
}

/*
方法二: ... + some() + concat()
*/
export function flatten2 (array) {
  let arr = [].concat(...array)
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}
```

### 2.5.3.测试

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>数组扁平化</title>
</head>
<body>
  <script src="../dist/atguigu-utils.js"></script>
  <script>
    console.log(aUtils.flatten1([1, [3, [2, 4]]]))
    console.log(aUtils.flatten2([1, [3, [2, 4]]]))
  </script>
</body>
</html>
```



## 2.6.数组分块

### 2.6.1.API 说明

- 语法: chunk(array, size)
- 功能: 将数组拆分成多个 size 长度的区块，每个区块组成小数组,整体组成一个二维数组

### 2.6.2.编码实现

- `src/array/chunk.js`

```js
/* 
将数组拆分成多个 size 长度的区块，每个区块组成小数组,整体组成一个二维数组
*/
export function chunk (array, size) {
  if (array.length===0) {
    return []
  }
  size = size || 1

  const bigArr = []
  let smallArr = []

  array.forEach(item => {
    if (smallArr.length===0) {
      bigArr.push(smallArr)
    }
    smallArr.push(item)
    if (smallArr.length===size) {
      smallArr = []
    }
  })

  return bigArr
}
```

### 2.6.3.测试

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>数组分块</title>
</head>
<body>
  <script src="../dist/atguigu-utils.js"></script>
  <script>
    console.log(aUtils.chunk([1, 2, 3, 4, 5, 6, 7], 3)) // [[1,2,3], [4,5,6],[7]]
    console.log(aUtils.chunk([1, 2, 3, 4, 5, 6, 7]))// [[1],[2],[3],[4],[5],[6],[7]]
    console.log(aUtils.chunk([1, 2, 3, 4, 5, 6, 7], 8))// [[1, 2, 3, 4, 5, 6, 7]]
  </script>
</body>
</html>
```



## 2.7.数组取差异

### 2.7.1.API 说明

- 语法: difference(arr1, arr2)
- 功能: 得到当前数组中所有不在arr中的元素组成的数组(不改变原数组)
- 例子: difference([1,3,5,7], [5, 8])  ==> [1, 3, 7]

### 2.7.2.编码实现

- `src/array/difference.js`

```js
/* 
difference(arr1, arr2): 得到arr1中所有不在arr2中的元素组成的数组(不改变原数组)
    如: [1,3,5,7].difference([5, 8])  ==> [1, 3, 7]
*/
export function difference (arr1, arr2) {
  if (arr1.length===0) {
    return []
  } else if (arr2.length===0) {
    return arr1.slice()
  }
  return arr1.filter(item => arr2.indexOf(item)===-1)
}
```

### 2.7.3.测试

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>数组取差异</title>
</head>
<body>
  <script src="../dist/atguigu-utils.js"></script>
  <script>
    console.log(aUtils.difference([1,3,5,7], [5, 8]))
  </script>
</body>
</html>
```



## 2.8.删除数组中部分元素

### 2.8.1.API相关

- pull(array, ...values): 
  - 删除原数组中与value相同的元素, 返回所有删除元素的数组
  - 说明: 原数组发生了改变
  - 如: pull([1,3,5,3,7], 2, 7, 3, 7) ===> 原数组变为[1, 5], 返回值为[3,3,7]
- pullAll(array, values): 
  - 功能与pull一致, 只是参数变为数组
  - 如: pullAll([1,3,5,3,7], [2, 7, 3, 7]) ===> 数组1变为[1, 5], 返回值为[3,3,7] 

### 2.8.2. 编码实现

- src/array/pull.js

```js
/* 
1. pull(array, ...values): 
  删除数组中与value相同的元素, 返回所有删除元素的数组
  说明: 数组发生了改变
  如: pull([1,3,5,3,7], 2, 7, 3, 7) ===> 数组变为[1, 5], 返回值为[3,3,7]
2. pullAll(array, values): 
  功能与pull一致, 只是参数变为数组
  如: pullAll([1,3,5,3,7], [2, 7, 3, 7]) ===> 数组变为[1, 5], 返回值为[3,3,7]
*/
export function pull (array, ...values) {
  if (array.length===0 || values.length===0) {
    return []
  }
  values = Array.from(new Set(values))
  var result = []
  for (let index = 0; index < array.length; index++) {
    const item = array[index];
     if (values.indexOf(item)!==-1) {
      array.splice(index, 1)
      result.push(item)
      index--
    }
  }
  return result
}

export function pullAll (array, values) {
  if (!values || !Array.isArray(values)) {
    return []
  }
  return pull(array, ...values)
}
```



### 2.8.3.测试

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>删除数组中部分元素</title>
</head>
<body>
  <script src="../dist/atguigu-utils.js"></script>
  <script>
    var arr = [1,3,5,3,7]
    console.log(aUtils.pull(arr, 2, 7, 3, 7), arr)
    var arr2 = [1,3,5,3,7]
    console.log(aUtils.pullAll(arr2, [2, 7, 3, 7]), arr2)
  </script>
</body>
</html>
```



## 2.9. 得到数组的部分元素

### 2.9.1.API 相关

- drop(array, count)
  - 得到当前数组过滤掉左边count个后剩余元素组成的数组
  - 说明: 不改变当前数组, count默认是1
  - 如: drop([1,3,5,7], 2) ===> [5, 7]
- dropRight(array, count)
  - 得到当前数组过滤掉右边count个后剩余元素组成的数组
  - 说明: 不改变当前数组, count默认是1
  - 如: dropRight([1,3,5,7], 2) ===> [1, 3]

### 2.9.2. 编码实现

- src/array/drop.js

```js
/* 
1. drop(array, count): 
   得到数组过滤掉左边count个后剩余元素组成的数组
   说明: 不改变当前数组, count默认是1
   如: drop([1,3,5,7], 2) ===> [5, 7]
2. dropRight(array, count): 
   得到数组过滤掉右边count个后剩余元素组成的数组
   说明: 不改变数组, count默认是1
   如: dropRight([1,3,5,7], 2) ===> [1, 3]
*/

export function drop (array, count) {
  if (array.length === 0 || count >= array.length) {
    return []
  }
  count = count || 1

  return array.filter((item, index) => index>=count)
}

export function dropRight (array, count) {
  if (array.length === 0 || count >= array.length) {
    return []
  }
  count = count || 1

  return array.filter((item, index) => index < array.length-count)
}
```

### 2.9.3.测试

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>得到数组的部分元素</title>
</head>
<body>
  <script src="../dist/atguigu-utils.js"></script>
  <script>
    console.log(aUtils.drop([1,3,5,7], 2))
    console.log(aUtils.drop([1,3,5,7], 4))
    console.log(aUtils.drop([1,3,5,7]))

    console.log(aUtils.dropRight([1,3,5,7], 2))
    console.log(aUtils.dropRight([1,3,5,7], 4))
    console.log(aUtils.dropRight([1,3,5,7]))
  </script>
</body>
</html>
```

