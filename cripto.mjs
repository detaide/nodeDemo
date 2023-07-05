/*
 * @Author: hyman
 * @Date: 2023-06-05 21:21:24
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-05 21:23:36
 * @Description: 请填写简介
 */

// import crypto from 'crypto'

const { createHmac } = await import('node:crypto');

const str = 'hello World'

const mac = createHmac('sha256', str)
            .update("I Love China")
            .digest('hex');

console.log(mac)
