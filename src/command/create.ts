import fs from 'fs-extra'
import path from 'path'
import { input, select } from '@inquirer/prompts'
import { clone } from '../utils/clone'
import { name, version } from '../../package.json'
import axios, { AxiosResponse } from 'axios'
import lodash from 'loadsh'
import chalk from 'chalk'



export interface templateItemType {
  name: string,
  downLoadUrl: string,
  description: string,
  branch: string
}
export const templateList: Map<string, templateItemType> = new Map([
  ['vite-vue3-typeScript', {
    name: "vue3-admin",
    downLoadUrl: 'git@gitee.com:sohucw/admin-pro.git',
    description: '基于vue3+vite的一个后台管理系统。。。',
    branch: 'dev'
  }],
  ['webpack-vue2-typeScript', {
    name: "vtj.pro",
    downLoadUrl: 'https://gitee.com/newgateway/vtj.git',
    description: '基于 Vue3 + Typescript 的低代码页面可视化设计器',
    branch: 'master'
  }],
])

// 检查文件夹是否存在
export function isOverWrite(fileName: string) {
  console.log(`${fileName}文件夹已经存在！`)
  return select({
    message: '是否覆盖？',
    choices: [{ name: '覆盖', value: true }, { name: '取消', value: false }]
  })
}

// 获取npm包最新版本
export const getNpmLastestVersion = async (name: string) => {
  const npmUrl = `https://registry.npmjs.org/${name}`
  const { data } = (await axios.get(npmUrl) || {}) as AxiosResponse
  console.log('版本信息', data)
  return data['dist-tags'].latest
}

// 检查版本更新
export const checkVersion = async (name: string, currVersion: string) => {
  const lastestVersion = await getNpmLastestVersion(name)
  const needUpdate = lodash.gt(lastestVersion, currVersion)
  if (needUpdate) {
    console.log(`检测到 template-vue-cli 最新版:${chalk.blueBright(lastestVersion)} 当前版本:${chalk.blueBright(currVersion)} ~`)
    console.log(`可使用 ${chalk.yellow('pnpm')} install template-vue-cli@latest 更新 ~`)
  }
}

// 创建项目命令
export async function create(projectName?: string) {
  // 格式化模板数据
  const templateData = [...templateList.entries()].map((item: [string, templateItemType]) => {
    const [key, value] = item
    return {
      name: value.name,
      value: key,
      description: value.description
    }
  })
  if (!projectName) {
    projectName = await input({
      message: "请输入项目名称"
    })
  }
  const filePath = path.resolve(process.cwd(), `${projectName}`)
  console.log('文件路径', filePath)
  // 判断项目是否存在
  if (fs.existsSync(filePath)) {
    const isRun = await isOverWrite(projectName)
    if (!isRun) return
    try {
      await fs.remove(filePath)
    } catch (error) {
      console.log(`原有${projectName}文件夹${chalk.redBright("删除失败!")}`, error)
    }
  }
  // 检测版本
  await checkVersion(name, version)
  // 选择模板
  const templateName = await select({
    message: "请选择模板",
    choices: templateData
  })
  // 下载模板
  const gitTemplateInfo = templateList.get(templateName)
  if (!gitTemplateInfo) {
    console.log('模板不存在')
    return
  } else {
    clone(gitTemplateInfo.downLoadUrl, projectName as string, ['-b', gitTemplateInfo.branch])
  }
}
