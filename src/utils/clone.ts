
import simpleGit, { SimpleGitOptions } from "simple-git"
import createLogger from "progress-estimator"
import chalk from 'chalk'
import path from 'path'

// 初始化进度条
const logger = createLogger({
  spinner: {
    interval: 100,
    frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"].map(t => (chalk.yellow(t)))
  }
});

const gitOptions: Partial<SimpleGitOptions> = {
  baseDir:  path.resolve(process.cwd(), `./project`),
  binary: 'git',
  maxConcurrentProcesses: 6,
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
    console.log(`${chalk.green("下载成功!!!")}`)
    console.log(`${chalk.blueBright("*************************************")}`)
    console.log(`${chalk.blueBright("*************************************")}`)
    console.log(`${chalk.blueBright("*******欢迎使用 tz-cli脚手架*********")}`)
    console.log(`${chalk.blueBright("*************************************")}`)
    console.log(`${chalk.blueBright("*************************************")}`)
    console.log()
    console.log()
    console.log()
    console.log(`${chalk.blueBright("请使用pnpm install安装依赖")}`)
    console.log(`${chalk.blueBright("请使用pnpm run dev启动项目")}`)
  } catch (error) {
    console.log(chalk.redBright('下载失败！'))
    console.log(error)
  }

}