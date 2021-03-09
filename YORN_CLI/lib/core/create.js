const program = require("commander");

const {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction,
} = require('./actions');

const createCommands = () => {
  program
    .command("create <project> [others...]")
    .description("clone a repository into a folder")
    .action(createProjectAction);

  program
    .command("addcmp <name>")
    .description(
      "add react component, ex: yorn addcmp HelloWorld [-d src/components]"
    )
    .action((name) => {
      addComponentAction(name, program.dest || "src/components");
    });

  program
    .command("addpage <page>")
    .description(
      "add react page and router config, ex: yorn addpage Home [-d src/pages]"
    )
    .action((page) => {
      addPageAndRouteAction(page, program.dest || "src/pages");
    });

  program
    .command("addstore <store>")
    .description(
      "add react page and router config, ex: yorn addpage Home [-d src/pages]"
    )
    .action((store) => {
      addStoreAction(store, program.dest || "src/store/");
    });
};

module.exports = createCommands;
