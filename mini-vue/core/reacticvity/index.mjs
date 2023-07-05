/*
 * @Author: hyman
 * @Date: 2023-06-20 16:46:40
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-20 18:57:21
 * @Description: 请填写简介
 */

// let currentEffect = null

// class Dep {
//     constructor(value){
//         this.effects = new Set()
//         this._val = value
       
//     }

//     get value(){
//         dep.depend()
//         return this._val
//     }

//     set value(newValue){  
//         this._val = newValue
//         dep.notice()
//     }

//     //收集依赖
//     depend(){
//         if(currentEffect != null){
//             this.effects.add(currentEffect)
//         }
//     }

//     //触发依赖
//     notice(){
//         this.effects.forEach((effect)=>{
//             effect()
//         })
//     }
// }

// const dep = new Dep('zhangsan')

// const watchEffect = (effect) => {
//     //创建一个effect，运行
//     currentEffect = effect
//     effect()
//     currentEffect = null
// }

// watchEffect(()=>{
//     console.log(dep.value)
// })

// dep.value = 'lisi'

let currentEffect = null
class Dep{
    constructor(){
        this.effects = new Set()
    }

    depend(){
        if(currentEffect != null){
            this.effects.add(currentEffect)
        }
    }

    notice(){
        this.effects.forEach((effect)=>{
            effect()
        })
    }
}

export function watchEffect(effect){
    currentEffect = effect
    effect()
    currentEffect = null
}

let targetMap = new Map()
const getDep = (target, key) => {
    let depMap = targetMap.get(target)
    //没有存在旧的，就新开
    if(!depMap){
        depMap = new Map()
        targetMap.set(target, depMap)
    }

    let dep = depMap.get(key)

    if(!dep){
        dep = new Dep()
        depMap.set(key, dep)
    }


    return dep

}

export function reactive(raw){
    return new Proxy(raw, {
        get(target, key){
            //获取一个dep对象
            const dep =  getDep(target, key)
            dep.depend()
            return Reflect.get(target, key)
        },

        set(target, key, value){
            const dep = getDep(target, key)
            const result = Reflect.set(target, key, value)
            dep.notice()
            return result

        }
    })
}


// const obj = reactive({
//     id : 1,
//     name : 'zhangsan'
// })

// let b = 1
// //触发事件，不能改变绑定的值，会陷入无限循环
// watchEffect(()=>{  
//     b = obj.id
//     console.log(b)
    
// })

// obj.id = 4



