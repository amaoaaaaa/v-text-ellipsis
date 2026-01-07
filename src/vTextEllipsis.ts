import { gsap } from "gsap";
import { DirectiveBinding, ObjectDirective } from "vue";

// 存储动画实例和事件监听器，方便清理和更新
const map = new WeakMap<
    HTMLElement,
    {
        enter: () => void;
        leave: () => void;
        kill: () => void;
    }
>();

/**
 * 自定义指令：v-text-ellipsis
 * @description 给元素添加文本溢出显示省略号，鼠标移入时内容滚动的效果
 */
const vTextEllipsis: ObjectDirective<HTMLElement, boolean> = {
    // 挂载和更新时都执行
    beforeMount(el, binding) {
        init(el, binding);
    },
    updated(el, binding) {
        init(el, binding);
    },
    beforeUnmount(el) {
        const state = map.get(el);

        state?.kill();
        map.delete(el);
    },
};

function init(el: HTMLElement, binding: DirectiveBinding<boolean>) {
    const enable = binding.value;

    // 如果禁用了，清除样式并移除监听
    if (enable === false) {
        el.style.overflow = "";
        el.style.textOverflow = "";
        el.style.whiteSpace = "";

        map.get(el)?.kill();
        map.delete(el);

        return;
    }

    // 设置溢出省略
    el.style.overflow = "hidden";
    el.style.textOverflow = "ellipsis";
    el.style.textWrap = "nowrap";
    el.style.whiteSpace = "nowrap";

    // 避免重复绑定
    if (map.has(el)) return;

    // 动画实例
    let scrollAnimation: gsap.core.Tween | undefined;

    const onMouseEnter = () => {
        // 停止当前动画
        scrollAnimation?.kill();

        // 隐藏内容溢出的省略号
        el.style.textOverflow = "unset";

        const SCROLL_SPEED = 60;
        const maxScrollWidth = el.scrollWidth;
        const duration = maxScrollWidth / SCROLL_SPEED;

        // 滚动显示更多内容
        scrollAnimation = gsap.to(el, { scrollLeft: maxScrollWidth, duration: duration });
    };
    const onMouseLeave = () => {
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
    };

    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", onMouseLeave);

    // 缓存清理函数
    map.set(el, {
        enter: onMouseEnter,
        leave: onMouseLeave,
        kill: () => {
            scrollAnimation?.kill();
            el.removeEventListener("mouseenter", onMouseEnter);
            el.removeEventListener("mouseleave", onMouseLeave);
        },
    });
}

export default vTextEllipsis;
