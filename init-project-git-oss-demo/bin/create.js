const execa = require('execa') // 调用shell和本地外部程序的javascript封装
const cwd = process.cwd() // 返回node.js进程的当前工作目录
const path = require('path')
const api = require('./api') // axios请求封装

module.exports = async (name, cmd) => {
    // 第一步: 在git仓库创建项目
    // a.如果公司提供了api创建项目-调用api传入对应参数
    // const GIT_PROJECT_PATH = await createGitProject(name);
    // b.如果是github 可以手动在github上的repositories上创建一个项目
    const GIT_PROJECT_PATH = 'git@github.com:DarLingHan/hltest.git'
    if (!GIT_PROJECT_PATH) {
        console.log('创建git仓库失败!')
        return
    }
    console.log('创建git仓库成功!')

    // 第二步：将前端项目模版拉到本地
    const gitPath = 'https://github.com/DarLingHan/vue-preset-demo.git'
    // await execa(
    //     vuePath,
    //     ['create', '-p', gitPath, name, '-c', '-n', '-r', ''],
    //     {
    //         stdio: 'inherit',
    //         env
    //     }
    // )
    execa('git', ['clone', gitPath])

    console.log('拉取代码');

    // 第三步：将模版提交到第一步创建的仓库里
    const cwdPath = path.join(cwd, name)
    execa('git', ['init'], {cwd: cwdPath})
    execa('git', ['add', '-A'], {cwd: cwdPath})
    execa('git', ['commit', '-m', 'init'], {cwd: cwdPath})
    execa('git', ['remote', 'add', 'origin', GIT_PROJECT_PATH], {cwd: cwdPath})
    execa('git', ['push', '--set-upstream', 'origin', 'master'], {cwd: cwdPath})
}

// 在git上创建项目
async function createGitProject(name) {
    const { description } = await inquirer.prompt({
        type: 'input',
        name: 'description',
        message: '请输入该仓库的描述'
    })
    // github提供的创建项目的api-url
    return api.post(``, {
        name,
        description
    }).then(res => {
        // 创建成功返回 仓库的相关信息
        return res
    }).catch(err => {
        console.log('创建仓库失败——', err)
    })
}
