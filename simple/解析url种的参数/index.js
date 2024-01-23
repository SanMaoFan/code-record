const parseQuery = (url) => {
    let q = {}
    url.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => q[k] = v)
    return q
}

// 实践
parseQuery('http://a.com/?a=1234&m=4321') // {a: '1234', m: '4321'}
parseQuery('a=1&m=2') // {a: '1', m: '2'}