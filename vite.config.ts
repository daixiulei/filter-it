/*
 * @Author: xiulei.dai
 * @Date: 2022-12-05 09:48:40
 * @LastEditors: xiulei.dai
 * @LastEditTime: 2022-12-06 21:50:22
 * @Description:
 */
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "./docs"
    }
})
