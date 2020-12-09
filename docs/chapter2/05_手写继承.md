# 5.手写继承

## 5.1.实现方式

寄生组合式

## 5.2.说明

 其它方式的继承会在一次实例中调用两次父类的构造函数或有其它缺点

## 5.3.编码实现

```js
/* 
实现2个类型的继承
*/

function create(proto) {
  function Fn() { }
  Fn.prototype = proto
  return new Fn()
}

export function extend(Child, Parent) {
  Child.prototype = create(Parent.prototype)
  Child.prototype.constructor = Child
}
```

## 5.4.测试

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>手写继承</title>
</head>
<body>
  <script src="../dist/atguigu-utils.js"></script>
  <script>
    function Parent(name, age) {
      this.name = name
      this.age = age
    }
    Parent.prototype.sayName = function () {
      console.log('name:', this.name)
    }

    function Child(name, age, score) {
      Parent.call(this, name, age)
      this.score = score
    }
    
	// 实现Child与Parent的继承关系
    aUtils.extend(Child, Parent)
    
    Child.prototype.sayScore = function () {
      console.log('score:', this.score)
    }

    // 创建父类型对象
    var parent = new Parent('A', 30)
    parent.sayName()

    // 创建子类型对象
    var child = new Child('B', 5, 90)
    child.sayName()
    child.sayScore()
  </script>
</body>

</html>
```

