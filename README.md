Budo Demo
=========

Tool for quickly sharing a project on GitHub pages. Intended for use alongside the [budo](https://github.com/mattdesl/budo) rapid prototyping tool.

The goal is to be able to run a command similar to the budo dev server that will publish to gh-pages for a project. Example:

For development:

```bash
budo index.js --open --live --css styles.css -- -t glslify
``` 

For sharing:

```bash
budo-demo index.js --dest publish --include data --css styles.css -- -t glslify
```

Looks similar to budo, but will build the project into the "publish" directory, including the "data" directory, and then publish to github-pages. This is not intended for production builds, but only to make it quick and easy to share what you're working on.

CLI
---

```
Usage:
	budo index.js [opts] -- [browserify opts]

Options:
 --help, -h       show help message
 --version        show version
 --dest           name of build destination directory
 --include        files and directories to include in build
 --title          optional title for default index.html
 --css            optional stylesheet href for default index.html
 --publish        publish to github pages
 --clean          remove publish directory when finished
 --minify       minify css and uglify js
 --uglifyjs       uglify js only
 --minifycss      minify css only
 
```