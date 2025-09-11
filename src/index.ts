import { App } from "vue";
import vTextEllipsis from "./vTextEllipsis";

function install(app: App) {
    app.directive("text-ellipsis", vTextEllipsis);
}

export { vTextEllipsis };
export default { install };
