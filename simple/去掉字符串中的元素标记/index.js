const removeTag = (fragment) => new DOMParser().parseFromString(fragment, 'text/html').body.textContent || ''

// 实践
removeTag('<div><div>哈哈哈哈哈<span>嘿嘿嘿</span></div></div>') // 哈哈哈哈哈嘿嘿嘿