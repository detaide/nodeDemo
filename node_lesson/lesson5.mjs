/*
 * @Author: hyman
 * @Date: 2023-06-24 11:59:21
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-24 12:10:43
 * @Description: async并发控制
 */

import async from 'async'

const urls = []

for( let i = 0; i < 50; i++){
    urls.push('html_' + i)
}


//并发数量
let conCount = 0;
const fetchUrl = (url, callBack) => {
    const delay = parseInt((Math.random() * 1000000) % 2000, 10)
    conCount += 1;
    console.log('现在的并发数是', conCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒')
    setTimeout(() => {
        conCount -= 1;
        callBack(null, url + 'html content')
    }, delay)
}

// fetchUrl('http://www.baidu.com')

/**
 * urls : 遍历集合
 * 20 ：并发数量
 * 回调函数
 */
async.mapLimit(urls, 20, (url, callBack) => {
    fetchUrl(url, callBack)
}, (err, result) => {
    // console.log('final'+ result)
})