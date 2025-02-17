import { Command } from "commander";
import { version } from "../package.json";
import { create } from "./command/create";

const program = new Command('tz-web-cli');

//创建一个create命令
program
.command('create')
.description('创建一个项目模板')
.argument('[projectName]','项目名称')
.action(async(projectName)=>{
  await create(projectName)
}).version(version,'-v')



program.parse()
