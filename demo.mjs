/*
 * @Author: hyman
 * @Date: 2023-06-05 21:16:04
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-05 21:55:00
 * @Description: 请填写简介
 */

/*
    模拟异步回调
function DemoFunction(param1, fun){
    console.log(param1)
    setTimeout(()=>{
        const err = null;
        const data = {result:"success"};
        fun(err, data);
    })
};


DemoFunction(123, (err,data)=>{
    if(err){
        console.log("err");
    }

    console.log(data)
})
 */

import os from 'os'

console.log(os.cpus())