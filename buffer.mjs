/*
 * @Author: hyman
 * @Date: 2023-06-05 20:37:48
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-05 20:52:31
 * @Description: 请填写简介
 */

const buf1 = Buffer.alloc(10, 1);

const buf3 = Buffer.alloc(10,2);


const buf2 = Buffer.from(buf1)

// console.log(buf3.byteLength)

for ( const item in buf3) {
    console.log(item)
}