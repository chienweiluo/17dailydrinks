<template>
    <transition name="fade">
        <div class="dialog-wrapper">
            <div class="dialog">
                <div class="header" v-if="title">
                    <p class="title">{{title}}</p>
                    <button class="close-btn" @click="close()">&times;</button>
                </div>
                <div class="body">
                    <slot name="body"></slot>
                </div>
                <div class="footer">
                    <slot name="footer"></slot>
                </div>
            </div>
            <div class="mask"></div>
        </div>
    </transition>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            required: false
        },
        visible: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    methods: {
        close() {
            this.$emit('update:visible', false)
        }
    },
    mounted() {
        // simple lock scroll
       document.body.style.overflow = 'hidden'
    }
}
</script>
<style lang="scss" scoped>
.dialog-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
}

.dialog {
    position: relative;
    margin: 0 auto 50px;
    margin-top: 15vh;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-sizing: border-box;
    width: 90%;
    max-width: 360px;
    background-color: #fff;
    z-index: 2;
}

.mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000;
    z-index: 1;
}

.header {
    padding: 10px;
    .title {
        line-height: 18px;
        font-size: 18px;
        color: #333;
    }
    .close-btn {
        position: absolute;
        top: 18px;
        right: 20px;
        padding: 0;
        background: 0 0;
        border: none;
        outline: 0;
        cursor: pointer;
        font-size: 24px;
        color: #666;
    }
}

.body {
    padding: 10px 20px;
    font-size: 14px;
}

.footer {
    padding: 10px 20px 20px;
    text-align: right;
    box-sizing: border-box;
}

/* transition */
.fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>