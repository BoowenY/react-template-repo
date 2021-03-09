const { promisify } = require("util");
const path = require("path");

const downloadRepo = promisify(require('download-git-repo'));
const open = require("open");

const repoConfig = require("../config/repo-config");
const log = require('../utils/log');
const terminal = require("../utils/terminal");
const { compile, writeToFile, createDirSync } = require("../utils/utils");

// callback -> promisify(函数) -> Promise -> async await
const createProjectAction = async (project) => {
  // 1.提示信息
  log.hint('yorn-cli helps you create your project, please wait a moment~');

  // 2.clone项目从仓库
  await downloadRepo(repoConfig.reactGitRepo, project, { clone: true });

  // 3.执行npm install
  const npm = process.platform === "win32" ? "npm.cmd" : "npm";
  await terminal.spawn(npm, ['install'], { cwd: `./${project}` });
  // 4.打开浏览器
  open("http://localhost:3000/");
  // 5.运行npm run serve
  await terminal.spawn(npm, ['run', 'serve'], { cwd: `./${project}` });

};

// 添加组件的action
const addComponentAction = async (name, dest) => {
  // 1.编译ejs模板 result
  const data = { name };
  const cmpResult = await compile("react-component.ejs", data);

  // 2.写入文件的操作
  const targetDest = path.resolve(dest, name);
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `index.jsx`);
    writeToFile(targetPagePath, cmpResult);
  }
};

// 添加组件和路由
const addPageAndRouteAction = async (name, dest) => {
  // 1.编译ejs模板
  const data = { name, lowerName: name.toLowerCase() };
  const pageResult = await compile("react-component.ejs", data);
  const routeResult = await compile("react-router.ejs", data);

  // 3.写入文件
  const targetDest = path.resolve(dest, name);
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `index.jsx`);
    const targetRoutePath = path.resolve(targetDest, "route.js");
    writeToFile(targetPagePath, pageResult);
    writeToFile(targetRoutePath, routeResult);
  }
};

const addStoreAction = async (name, dest) => {
  // 1.遍历的过程
  const storeResult = await compile("react-store.ejs", {});
  const typesResult = await compile("react-type.ejs", {});

  // 2.创建文件
  const targetDest = path.resolve(dest, name);
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.js`);
    const targetRoutePath = path.resolve(targetDest, "type.js");
    writeToFile(targetPagePath, storeResult);
    writeToFile(targetRoutePath, typesResult);
  }
};

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction,
};
