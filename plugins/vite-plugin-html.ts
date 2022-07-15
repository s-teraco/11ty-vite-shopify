import { vitePluginHTMLServe } from "./vite-plugin-html-serve";

const vitePluginHTML = () => {
  return [vitePluginHTMLServe()];
};
export default vitePluginHTML;
