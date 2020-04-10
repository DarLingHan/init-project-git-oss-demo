#!/usr/bin/env node
// 指明脚本文件要使用node来执行

const program = require('commander')
program
    .command('create <project-name>')
    .description('初始化项目')
    .action(async (name, cmd) => {
        require('./create')(name, cmd)
    })
program.parse(process.argv);
// process.argv 包含启动Node.js进程时的命令行参数
