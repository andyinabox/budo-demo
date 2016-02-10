Budo Demo
=========

**Note:** this is currently an experimental module in early development.

Tool for quickly sharing a project on GitHub pages. Intended for use alongside the [budo](https://github.com/mattdesl/budo) rapid prototyping tool.

The goal is to be able to run a command similar to the budo dev server that will publish to gh-pages for a project. Example:

For development:

```bash
budo index.js --open --live --css styles.css -- -t glslify
``` 

For sharing:

```bash
budo-demo index.js --include data --css styles.css -- -t glslify
```

Looks similar to budo, but will automatically build the project files (including the "data" directory) into the "dist" directory, ready to publish however you choose. I'm running it from my "package.json" "scripts" option, and publishing using the [gh-pages](https://www.npmjs.com/package/gh-pages) module.

Here's an example from the "package.json" file of [one my projects](https://github.com/andyinabox/haar-visualizer/):

```json
  "scripts": {
    "start": "budo index.js --open --live --css styles.css",
    "build": "budo-demo index.js -c styles.css -i data",
    "publish": "npm run build; gh-pages -d dist"
  }
```

This is not intended for production builds, but only to make it quick and easy to share what you're working on.

CLI
---

```
Usage:
	budo-demo index.js [opts] -- [browserify opts]

Options:
 --help, -h       show help message
 --dest, -o       name of build destination directory
 --include, -i    files and directories to include in build
 --title, -t      optional title for default index.html
 --css, -c        optional stylesheet href for default index.html
 --minify         minify css
 
```

Todo
----

- [ ] Add publish capability?
- [ ] Allow for custom html
- [ ] Integrated js uglification?
- [ ] Test browserify transforms
- [ ] Write tests