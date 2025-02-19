import { Command } from "commander";
import { version } from "../package.json";
import { create } from "./command/create";
import { update } from "./command/update";

const program = new Command('template-vue-cli');

program.version(version, '-v --version', '查看当前版本')

//创建一个create命令
program
  .command('create')
  .description('创建一个项目模板')
  .argument('[projectName]', '项目名称')
  .action(async (projectName) => {
    await create(projectName)
  })

//创建一个update命令
program
  .command('update')
  .description('更新template-vue-cli')
  .action(async () => {
    await update()
  })



program.parse()
