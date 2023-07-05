/*
 * @Author: hyman
 * @Date: 2023-06-20 21:14:10
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-21 11:24:11
 * @Description: 请填写简介
 */
import { h } from './core/h.mjs'
import { reactive, watchEffect } from './core/index.mjs'
export default {
    render( context ) {
        //构建虚拟dom
        return h('div',{ id: context.data.count, }, [
            h('div', null, `count-${context.data.count}`),
            h('div', null, `double-${context.data.double}`),
            h('button', {
                onClick : context.doubleClick
            }, "click"),
            h('button',{
                onClick : context.doubleremove
            },'remove')
        ] )
    },

    setup() {
        
        const data = reactive({
            count : 1,
            double : 1
        })

        watchEffect(()=>{
            data.double = data.count * 2
        })

        const doubleClick = () => {
            const app = document.querySelector("#app")
            data.count++;
            const div = document.createElement('div')
            div.setAttribute('id', `new-${data.count}`)
            div.innerHTML = `new ${data.count}`
            app.append(div)
            
        }

        const doubleremove = () => {
            const app = document.querySelector("#app")
            const div = document.querySelector('#' + `new-${data.count}`)
            data.count -= 1;
            app.removeChild(div)
        }

        return{
            data,
            doubleClick,
            doubleremove
        }
    }
}