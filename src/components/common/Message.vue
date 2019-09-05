<template>
    <div class="message">
        <slot>{{message}}</slot>
    </div>
</template>
<script>
export default {
    name: 'message',
    data(){
        return {
            duration: 1500,
            message: ''
        }
    },
    mounted(){
        setTimeout(()=>{
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
        }, this.duration)
    }
}
</script>
<style lang="scss" scoped>
    .message {
        position: fixed;
        min-width: 200px;
        height: 32px;
        line-height: 32px;
        padding-left: 20px;
        padding-right: 20px;
        font-size: 18px;
        text-align: center;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 4px;
        color: #fff;
        transition: 1s all ease;
        background-color: fade-out(#42b983, .2);
    }
</style>