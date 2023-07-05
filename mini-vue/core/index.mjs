/*
 * @Author: hyman
 * @Date: 2023-06-20 16:46:40
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-21 00:07:12
 * @Description: 请填写简介
 */

import { watchEffect }  from './reacticvity/index.mjs'
import { mountElement, diff } from './render.mjs'

export function createApp(rootComponent){
    return {
        //将元素挂载到主组件和dom
        mount(rootContainer){
            const setupResult = rootComponent.setup()
            let isMounted = false
            let prevTree = null

            watchEffect(()=>{
                //判断是否初始化
                if(!isMounted){
                    console.log('mounted...')
                    isMounted = true
                    rootContainer.innerHTML = ``
                    const subTree = rootComponent.render(setupResult)
                    mountElement(subTree, rootContainer)
                    prevTree = subTree
                    
                }else{
                    const subTree = rootComponent.render(setupResult)
                    diff(prevTree, subTree, rootContainer)
                    prevTree = subTree
                }
                
            })
        }
    }
}



export * from './reacticvity/index.mjs'