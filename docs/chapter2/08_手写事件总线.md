# 8.手写事件总线
## 8.1.API说明

1. eventBus: 包含所有功能的事件总线对象
2. eventBus.on(eventName, listener): 绑定事件监听
3. eventBus.emit(eventName, data): 分发事件
4. eventBus.off(eventName): 解绑事件监听

## 8.2.编码实现

- `src/event-bus/index.js`

```js
const eventBus = {}

/* 
{
  add:  [callback1, callback2]
  delete: [callback3]
}
*/
let callbacksObj = {}

/* 
绑定事件监听
*/
eventBus.on = function (eventName, callback) {
  const callbacks = callbacksObj[eventName]
  if (callbacks) {
    callbacks.push(callback)
  } else {
    callbacksObj[eventName] = [callback]
  }
}

/* 
分发事件
*/
eventBus.emit = function (eventName, data) {
  const callbacks = callbacksObj[eventName]
  if (callbacks && callbacks.length > 0) {
    callbacks.forEach(callback => {
      callback(data)
    })
  }
}

/* 
移除事件监听
*/
eventBus.off = function (eventName) {
  if (eventName) {
    delete callbacksObj[eventName]
  } else {
    callbacksObj = {}
  }
}

export default eventBus
```

## 8.3.测试

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>手写事件总线</title>
</head>
<body>

  <script src="../dist/atguigu-utils.js"></script>
  <script>
    const { eventBus } = aUtils
    eventBus.on('add', (data) => {
      console.log('add', data)
    })
    eventBus.on('add', (data) => {
      console.log('add2', data)
    })
    eventBus.on('delete', (data) => {
      console.log('delete', data)
    })

    // eventBus.off('add')
    // eventBus.off()

    eventBus.emit('add', 123)
    eventBus.emit('delete', 'abc')
  </script>
</body>
</html>
```

