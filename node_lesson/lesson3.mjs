/*
 * @Author: hyman
 * @Date: 2023-06-24 11:44:41
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-24 11:57:03
 * @Description: 使用 superagent 与 cheerio 完成简单爬虫
 */

import express from 'express'
import superagent from 'superagent'
import cheerio from 'cheerio'

const app = express()

app.get('/', (req, res, next) => {
    superagent.get('https://cnodejs.org/')
    .end(function (err, sres) {
      // 常规的错误处理
      if (err) {
        return next(err);
      }
      // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
      // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
      // 剩下就都是 jquery 的内容了
      var $ = cheerio.load(sres.text);
      var items = [];
      $('#topic_list .topic_title').each(function (idx, element) {
        var $element = $(element);
        items.push({
          title: $element.attr('title'),
          href: $element.attr('href')
        });
      });

      res.send(items);
    });
})

app.listen(8089, () => {
    console.log('8089 listening...')
})