import { computed } from 'vue'

export type PropsType = {
    fontSize: number
    text: string
    gap: number
}

export default function useWatermarkBg(props: PropsType) {
    return computed(() => {
        const canvas = document.createElement('canvas')
        // 获取物理像素比
        const devicePixelRatio = window.devicePixelRatio || 1
        const fontSize = props.fontSize * devicePixelRatio
        const font = fontSize + 'px serif'
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

        // 获取文字宽度
        ctx.font = font
        const { width } = ctx.measureText(props.text)
        const canvasSize = Math.max(100, width) + props.gap + devicePixelRatio
        canvas.width = canvasSize
        canvas.height = canvasSize

        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.rotate((Math.PI / 180) * -45)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
        ctx.font = font
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(props.text, 0, 0)
        return {
            base64: canvas.toDataURL(),
            size: canvasSize,
            // 这里是为了让内容更清晰，因为设备的 devicePixelRatio 实际上是指将内容放大多少倍，只要将可视宽高除以 devicePixelRatio，便可以得到实际宽高
            styleSize: canvasSize / devicePixelRatio
        }
    })
}