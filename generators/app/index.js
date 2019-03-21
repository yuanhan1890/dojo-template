const Generator = require('yeoman-generator')
const walker = require('walker')
const path = require('path')

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'appname',
        message: 'input new dojo\'s name',
        required: true
      }
    ]

    return this.prompt(prompts).then(props => {
      this.props = props
    })
  }

  writing() {
    this.destinationRoot(`./${this.props.appname}`);

    const ROOT = path.resolve(__dirname, 'templates')
    walker(ROOT)
      .on('file', (file) => {
        const filePath = path.relative(ROOT, file)

        this.fs.copyTpl(
          this.templatePath(filePath),
          this.destinationPath(filePath),
          this.props
        )
      })
      .on('end', () => {
        this.composeWith(require.resolve('generator-git-init'))
      })
  }

  install() {
    this.installDependencies({ yarn: true, npm: false, bower: false });
  }
}