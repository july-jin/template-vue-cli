import { defineConfig } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import nodeExternals from 'rollup-plugin-node-externals'
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import typescript from "rollup-plugin-typescript2";

export default defineConfig([
  {
    input: {
      index: 'src/main.ts', // 打包入口文件
    },
    output: [
      {
        dir: 'dist', // 输出目标文件夹
        format: 'cjs', // 输出 commonjs 文件
      }
    ],
    external: [
      // 使用正则表达式排除 project 文件夹下的所有模块
      /^project\/.*/
    ],
    // 这些依赖的作用上文提到过
    plugins: [
      nodeResolve(),
      nodeExternals({
        devDeps: false, // 可以识别我们 package.json 中的依赖当作外部依赖处理 不会直接将其中引用的方法打包出来
      }),
      typescript(),
      json(),
      commonjs(),
      terser({
        format: {
          comments: false, // 移除注释
        },
      }),
    ],
  },
]);