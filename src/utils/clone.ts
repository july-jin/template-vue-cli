
import simpleGit, { SimpleGitOptions } from "simple-git"
import createLogger from "progress-estimator"
import chalk from 'chalk'
import figlet from 'figlet'

// 初始化进度条
const logger = createLogger({
  spinner: {
    interval: 100,
    frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"].map(t => (chalk.yellow(t)))
  }
});

const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 6,
};
const goodPrinter = async () => {
  const data = await figlet('欢迎使用 ！！！');
  console.log(chalk.rgb(40, 156, 193).visible(data));
};
export const clone = async (url: string, projactName: string, options: Array<string>) => {
  const gitClone = new Promise((resolve, reject) => {
    simpleGit(gitOptions).clone(url, projactName, options, (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve(true)
    })
  })

  try {
    await logger(gitClone, '下载中...', {
      estimate: 5000,//预计下载时间
    })
    console.log()
    console.log()
    console.log()
    console.log(`${chalk.green("✅下载成功!!!")}`)
    console.log(`${chalk.blueBright("*************************************")}`)
    console.log(`${chalk.blueBright("*************************************")}`)
    console.log(`${chalk.blueBright("*******欢迎使用 tz-cli脚手架*********")}`)
    console.log(`${chalk.blueBright("*************************************")}`)
    console.log(`${chalk.blueBright("*************************************")}`)
    console.log()
    console.log()
    console.log()

    goodPrinter()

    console.log(`✨${chalk.blueBright("安装依赖:pnpm install")}`)
    console.log(`✨${chalk.blueBright("启动项目:pnpm run dev")}`)


  } catch (error) {
    console.log(chalk.redBright('💀下载失败！'))
    console.log(error)
  }

}