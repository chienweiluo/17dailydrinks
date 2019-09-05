import Vue from 'vue'
import message from '@/components/common/Message.vue'

let messageConstructor = Vue.extend(message)

let instance = null
let instances = []

const Message = function(message) {

    instance = new messageConstructor({
        data: {
            message
        }
    })

    instance.$slots.default = [instance.message]
    instance.message = null
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
    
    instance.vm.visible = true
    instance.dom = instance.vm.$el
    instances.push(instance)
    return instance.vm
}

export default Message