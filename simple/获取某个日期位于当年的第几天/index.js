const dayOfYear = (date) => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)

// 实践(需要注意的是，这里的月份是从 0 开始的，以下的 5 代表 6 月份，勿忘)
dayOfYear(new Date(2023, 5, 1))