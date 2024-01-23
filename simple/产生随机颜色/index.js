const randomColor = () => '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')

// 实践
randomColor() // '#4645b2'