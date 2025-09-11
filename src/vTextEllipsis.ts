import { gsap } from "gsap";
import { ObjectDirective } from "vue";

/**
 * 自定义指令：v-text-ellipsis
 * @description 给元素添加文本溢出显示省略号，鼠标移入时内容滚动的效果
 */
const vTextEllipsis: ObjectDirective<HTMLElement, boolean> = {
    beforeMount(el, binding) {
        const enable = binding.value;

        if (enable === false) return;

        // 设置溢出省略
        el.style.overflow = "hidden";
        el.style.textOverflow = "ellipsis";
        el.style.textWrap = "nowrap";
        el.style.whiteSpace = "nowrap";

        // 动画实例
        let scrollAnimation: gsap.core.Tween | undefined;

        // 鼠标移入效果
        el.addEventListener("mouseenter", () => {
            // 停止当前动画
            scrollAnimation?.kill();

            // 隐藏内容溢出的省略号
            el.style.textOverflow = "unset";

            const SCROLL_SPEED = 60;
            const maxScrollWidth = el.scrollWidth;
            const duration = maxScrollWidth / SCROLL_SPEED;

            // 滚动显示更多内容
            scrollAnimation = gsap.to(el, { scrollLeft: maxScrollWidth, duration: duration });
        });

        // 鼠标移出效果
        el.addEventListener("mouseleave", () => {
            // 停止当前动画
            scrollAnimation?.kill();

            // 把内容滚动到开始的位置
            scrollAnimation = gsap.to(el, {
                scrollLeft: 0,
                duration: 0.15,
                onComplete() {
                    // 动画结束重新显示省略号
                    el.style.textOverflow = "ellipsis";
                },
            });
        });
    },
};

export default vTextEllipsis;
