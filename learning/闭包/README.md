参考：
- [闭包的五大作用-高级前端必须吃透的点。](https://www.bilibili.com/list/watchlater?bvid=BV17C4y1P7gh&oid=748773053)

## 定义

闭包的基本语法是在一个函数内部定义另一个函数（`函数嵌套函数`），并返回这个内部函数。这样，内部函数就形成了一个闭包，可以访问外部函数的变量和参数。

```js
function outerFunction() {
    let outerVariable = 'Hello'
    
    function innerFunction() {s
        console.log(outerVariable)
    }

    return innerFunction
}

// 创建闭包
const closure = outerFunction()

// 调用闭包
closure() // Hello
```

## 作用

此文实现闭包五个作用：
- 保护变量
- 数据封装
- 记忆效果
- 函数工厂
- 异步操作

### 保护变量

闭包可以用于保护变量，使其在外部无法直接访问和修改。通过使用闭包，可以创建私有变量，只能通过内部函数来访问和修改。

```js
function createCounter() {
    let count = 0

    return {
        increment: function() {
            count++
        },
        decrement: function() {
            count--
        },
        getCounter: function() {
            return count
        }
    }
}

const counter = createCounter()

console.log(counter.getCounter()) // 0

counter.increment()
counter.increment()
console.log(counter.getCounter())  // 2

counter.decrement()
console.log(counter.getCounter()) // 1
```


### 数据封装

闭包可以用于数据封装，通过创建私有变量和公共方法，实现对数据的封装和访问控制。

```js
function createPerson(name, age) {
    let _name = name
    let _age = age

    return {
        getName: function() {
            return _name
        },
        getAge: function() {
            return _age
        },
        setName: function(newName) {
            _name = newName
        },
        setAge: function(newAge) {
            _age = newAge
        }
    }
}

const person = createPerson('John', 25)

console.log(person.getName()) // John
console.log(person.getAge()) // 25

person.setName('Jane')
person.setAge(30)

console.log(person.getName()) // Jane
console.log(person.getAge())  // 30
```

### 记忆效果

闭包可以用于实现记忆化效果。即在函数执行过程中缓存并重复使用先前的计算结果，以提高函数的执行效率。

```js
function memoize(func) {
    let cache = {}
    
    return function(n) {
        // 判断是否有记录 n 参数对应的执行函数
        if (n in cache) {
            return cache[n]
        }

        // 记录 n 参数对应函数执行后的结果，以便下一次同样的 n 参数可以直接得知执行结果
        const result = func(n)
        cache[n] = result

        return result
    }
}

// 计算平方
function square(n) {
    return n * n
}

// 使用记忆化优化平方函数
const memoizedSquare = memoize(square)

console.log(memoizedSquare(5))  // 第一次计算，结果为 25
console.log(memoizedSquare(5))  // 直接从缓存中获取结果，结果为 25
```


### 函数工厂

闭包可以实现函数工厂，函数工厂是一个函数，用于创建并返回其他函数，通过使用闭包函数工厂，可以根据不同的配置参数生成具有相似功能的函数，使代码更加灵活和可复用。

```js
function createMultiplier(multiplier) {
    return function(num) {
        return num * multiplier
    }
}

// 创建乘法函数工厂
const double = createMultiplier(2)
const triple = createMultiplier(3)

console.log(double(5)) // 10
console.log(triple(5)) // 15
```

### 异步操作

闭包可以用于实现异步操作，特别是在 js 中。通过使用闭包，可以在异步操作中捕获和保留状态、变量或回调函数。

```js
function asyncOperation(callback) {
    setTimeout(function() {
        const result = 'Async operation completed'
        callback(result)
    }, 2000)
}

// 调用异步操作
asyncOperation(function(result) {
    console.log(result) // Async operation completed
})
```