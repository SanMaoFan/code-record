<template>
    <div class="container" ref="parentRef">
        <slot />
        <!-- 添加一个 div，填充满整个区域，设置水印背景并重复背景 -->
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, onMounted, onBeforeUnmount } from 'vue'

import type { PropsType } from './useWatermarkBg'
import useWatermarkBg from './useWatermarkBg'

const props: PropsType = defineProps({
    text: {
        type: String,
        required: true,
        default: ''
    },
    fontSize: {
        type: Number,
        default: 40
    },
    gap: {
        type: Number,
        default: 20
    }
})
const parentRef = ref<HTMLDivElement>()

const bg = useWatermarkBg(props)
const { base64, styleSize } = bg.value
// 用于触发 watchEffect 创建节点的依赖
const flag = ref(0)
let ob
let div

// 逻辑放到 watchEffect 而不是放到 onMounted 的原因时需要实时监听用户篡改页面的操作
watchEffect(() => {
    flag.value
    if (!parentRef.value) {
        return
    }
    // 去除已存在的水印节点
    if (div) {
        div.remove()
    }
    // div 使用创建的方式，主要是为了防止在页面上直接写 div时，用户可以直接删除的问题，不如采用创建的方式，可以实时重新产生新元素
    div = document.createElement('div')
    // 设置样式。不写类名样式是为了方便监听用户操作
    div.style.backgroundImage = `url(${base64})`
    div.style.backgroundSize = `${styleSize}px ${styleSize}px`
    div.style.backgroundRepeat = 'repeat'
    div.style.width = '100%'
    div.style.height = '100%'
    div.style.zIndex = '9999'
    div.style.position = 'absolute'
    // div.style.top = '0'
    // div.style.left = '0'
    // 直接设置 inset 可以省去设置定位的 top、bottom、left、right
    div.style.inset = '0'
    // 将水印加到父元素上
    parentRef.value?.appendChild(div)
})

// 监听用户对于水印的篡改操作
onMounted(() => {
    ob = new MutationObserver(records => {
        // console.log('监听器的内容', records)
        // 循环内容
        for (const record of records) {
            // 判断是否有删除水印的动作
            for (const dom of record.removedNodes) {
                // 判断删除的节点是否为水印节点
                if (dom === div) {
                    // 当删除水印节点时，将 flag 变量设置新值，让其触发 watchEffect 执行
                    flag.value++
                    return
                }
            }
            // 判断是否有修改样式属性(在创建 div 时，所采用 style 的形式增加样式，就是为了可以监听到用户修改 style 的操作，如果写在 class 是监听不到的)
            if (record.target === div && record.attributeName === 'style') {
                flag.value++
            }
        }
    })
    // 指定监听的元素，并配置要监听的内容
    ob.observe(parentRef.value, {
        childList: true,
        attributes: true,
        subtree: true
    })
})

// 组件卸载时应取消监听
onBeforeUnmount(() => {
    ob && ob.disconnect()
    div = null
})

</script>
<style lang="scss" scoped>
.container {
    position: relative;
}
</style>