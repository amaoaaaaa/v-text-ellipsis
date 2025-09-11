import { App } from "vue";
import vTextEllipsis from "./textEllipsis";

function install(app: App) {
    app.directive("text-ellipsis", vTextEllipsis);
}

export { vTextEllipsis };
export default { install };
