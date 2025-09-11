# @amaoaaaaa/v-text-ellipsis

一个 Vue 3 指令，给文本添加溢出省略号效果，并在鼠标悬停时使用 GSAP 滚动显示全文。

---

## 特性

- 文本超出容器宽度时显示省略号 (`...`)。
- 鼠标悬停时，文本平滑滚动展示完整内容。
- 支持按需注册指令或全局注册插件。

---

## 安装

```bash
npm install @amaoaaaaa/v-text-ellipsis
```

> 注意：`vue` 和 `gsap` 为 peer dependencies，需要在项目中已安装。

---

## 使用方法

### 1. 全局注册插件

```ts
import { createApp } from "vue";
import App from "./App.vue";
import TextEllipsis from "@amaoaaaaa/v-text-ellipsis";

const app = createApp(App);
app.use(TextEllipsis);
app.mount("#app");
```

在组件中即可使用：

```vue
<template>
  <div v-text-ellipsis style="width: 200px;">
    这是一段很长的文本，鼠标悬停时会滚动显示完整内容。
  </div>
</template>
```

---

### 2. 按需注册指令

```ts
import { createApp } from "vue";
import App from "./App.vue";
import { vTextEllipsis } from "@amaoaaaaa/v-text-ellipsis";

const app = createApp(App);
app.directive("text-ellipsis", vTextEllipsis);
app.mount("#app");
```

### 3. 在组件内部注册指令

setup 语法糖，导入直接就能在 `template` 中用

```ts
<script lang="ts" setup>
import { vTextEllipsis } from "@amaoaaaaa/v-text-ellipsis";
</script>
```

---

## 指令参数

* `v-text-ellipsis="true|false"`

  * `true`：启用文本溢出省略和滚动效果
  * `false`：禁用效果

---

## 类型拓展

拓展 Vue 全局属性

```ts
// types/vue-shim.d.ts
import 'vue';
import { vTextEllipsis } from "@amaoaaaaa/v-text-ellipsis";

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        /**
         * 自定义指令：v-text-ellipsis
         * @description 给元素添加文本溢出显示省略号，鼠标移入时内容滚动的效果
         */
        vTextEllipsis: typeof vTextEllipsis; 
    }
}
```

## 注意事项

* 该指令依赖 `gsap` 实现滚动动画。
* 请确保元素有固定宽度，否则滚动效果可能不明显。
