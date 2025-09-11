import { App } from "vue";
import textEllipsis from "./textEllipsis";

function install(app: App) {
    app.directive("text-ellipsis", textEllipsis);
}

export { textEllipsis };
export default { install };
