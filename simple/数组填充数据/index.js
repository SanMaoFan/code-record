// 创建一个每个元素都是 0，长度为 3 的数组
new Array(3).fill(0)

// 如果要要创建的元素是对象，不建议使用 fill，这会使得每一个元素公用一个内存地址，应使用 form 

Array.form({length: 3}, () => ({a: 1, b: 2}))