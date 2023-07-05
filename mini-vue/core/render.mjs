/*
 * @Author: hyman
 * @Date: 2023-06-20 21:31:04
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-21 11:18:44
 * @Description: 请填写简介
 */

export function createElement(type){
    return document.createElement(type)
}

//匹配属性是否有变化，分为key变和value变,nextValue为空直接移出
export function patchProps(el, key, nextValue){
    if(nextValue === null){
        el.removeAttribute(key)
    }else{
        // 匹配on开头的事件
        if(key.startsWith("on")){
            const eventName = key.slice(2).toLocaleLowerCase()
            el.addEventListener(eventName, nextValue)
        }else{
            el.setAttribute(key, nextValue)
        }
    }
}

export function mountElement(vnode , container){
    //解析vnode
    const {type, props, children} = vnode

    const el =  (vnode.el = createElement(type))
    // 处理元素
    if(props){
        for( const key in props){
            const val = props[key]
            // el.setAttribute(key, val)
            patchProps(el, key, val)
        }
    }
    
    //处理子元素  string || Array
    if(typeof children === 'string'){
        const text = document.createTextNode(children)
        el.append(text)
    }else if(Array.isArray(children)){
        // 递归挂载
        children.forEach((v)=>{
            mountElement(v, el);
        })
    }

    //挂载到app上
    container.append(el)
    
}

/**
 * diff算法
 * @param {*} n1 old
 * @param {*} n2 new
 */
export function diff(n1, n2, container){
    
    //都空的时候
    if(!n1 && !n2){
        return ;
    }
    //
    if(!n1){
        mountElement(n2, container)
    }else if(!n2){
        container.removeChild(n1.el)
    }
    const el = (n2.el = n1.el)

    //类型不同，直接替换，然后比较子节点
    if(n1.type != n2.type){
        //替换该父节点
        n1.el.replaceWith(createElement(n2.type))
        // 处理props
        if(props){
            for(const key in n2.props){
                const val = n2.props[key]
                patchProps(n1.el, key, val)
            }
        }
        //递归处理子节点
        
        
    }else{
        // new : {id : 'test', data-1 : '123'}
        //old : { id　: 'test', data-0 : '123' }
        
        const oldProps = n1.props || {}
        const newProps = n2.props || {}

        //替换props
        Object.keys(newProps).forEach((key)=>{
            if(newProps[key] != oldProps[key]){
                //直接替换不同的,以及新增新的
                patchProps(el, key, newProps[key])
            }
        })

        //替换当前新增后的dom中不存在的项，即n2中没有,n1中有的
        Object.keys(oldProps).forEach((key)=>{
            if(oldProps[key] != newProps[key]){
                patchProps(el, key, null)
            }
        })


    }

    // 考虑子节点
    const oldChildren = n1.children || {}
    const newChildren = n2.children || {}

    // 处理 children
    // children -> string | array
    // newChildren -> string -> oldChildren string | array
    // newChildren -> array  ->oldChildren string | array
    
    if(typeof newChildren === 'string'){
        if(typeof oldChildren === 'string'){
            // 如果不同,直接替换文本
            if(newChildren !== oldChildren){               
                el.innerHTML = newChildren     
            }
        }else if(Array.isArray(oldChildren)){
            //数组直接替换
            el.textContext = newChildren
        }
    }else if(Array.isArray(newChildren)){
        //新旧类型不同，就直接挂载新的
        if(typeof oldChildren === 'string'){
            el.innerHTML = ``
            newChildren.forEach((v)=>{
                mountElement(v, el);
            })
        }else if(Array.isArray(oldChildren)){
            //新旧类型相同，再逐层比对，不考虑顺序切换
            //首先存在的情况是 old:{a,b,c} new:{a,b,d}
            //其次存在 old:{a,b,c} new :{a,b,c,d}
            // 以及 old:{a,b,c,d} new : {a,b}，由于上述已经处理了新旧为空的情况，直接diff
            const length = Math.max(oldChildren.length, newChildren.length)
            for(let i = 0; i < length; i++){
                diff(oldChildren[i], newChildren[i], el)
            }
        }
    }

}