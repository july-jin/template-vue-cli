import process from "child_process";
import ora from "ora";
import chalk from "chalk";


const spinner = ora({
  text: '正在更新...',
  spinner: {
    interval: 100,
    frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"].map(t => (chalk.yellow(t)))
  }
})
export async function update() {
  spinner.start()
  process.exec('npm install template-vue-cli@latest -g', (error, stdout, stderr) => {
    if (error) {
      spinner.fail(`${chalk.red('更新失败')}`)
      console.error(`exec error: ${error}`);
      return;
    }
    stdout && console.log(`${stdout}`);
    stderr && console.log(`${stderr}`);
    spinner.succeed(`${chalk.green('更新成功!')}`)
  });
}