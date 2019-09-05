<template>
    <button :class="['button', type]"><slot></slot></button>
</template>
<script>
export default {
    props: {
        type: {
            type: String,
            default: 'primary',
            validator: (val) => ['primary', 'warning', 'danger', 'normal'].includes(val)
        }
    }
}
</script>
<style lang="scss" scoped>
$primary: #409EFF;
$warning: #E6A23C;
$danger: #F56C6C;

.button {
    display: inline-block;
    box-sizing: border-box;
    white-space: nowrap;
    cursor: pointer;
    text-align: center;
    outline: 0;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    border-width: 1px;
    border-style: solid;
    + .button {
        margin-left: 10px;
    }
    &.normal {
        background: #fff;
        border-color: #ddd;
        color: #666;
        &:active {
            border-color: $primary;
            color: $primary
        }
    }
    &.primary {
        color: #fff;
        background-color: $primary;
        border-color: $primary;
        &:active {
            background-color: darken($primary, 5%);
        }
    }
    &.warning {
        color: #fff;
        background-color: $warning;
        border-color: $warning;
        &:active {
            background-color: darken($warning, 5%);
        }
    }
    &.danger {
        color: #fff;
        background-color: $danger;
        border-color: $danger;
        &:active {
            background-color: darken($danger, 5%);
        }
    }
    &:hover {
        opacity: .8;
    }
    
}
</style>