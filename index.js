'use strict';

module.exports = function (opts) {
  opts = opts || {};

  return function dotfiles(file) {
    opts = this.setDefaults(this.pattern.options, opts);

    if (this.pattern.glob.charAt(0) === '.') {
      opts.dot = true;
    }

    var isDotfile = file.isDotfile();
    var isDotdir = file.isDotdir();
    var isDot = isDotdir || isDotfile;

    if (!isDot) {
      return file;
    }

    if (opts.dot === false && isDot) {
      file.exclude = true;
      return file;
    }

    // dotfiles
    if (isDotfile) {
      file.include = opts.dot === true || opts.dotfiles === true;
      return file;
    }

    // dotdirs
    if (isDotdir) {
      file.include = opts.dot === true || opts.dotdirs === true;
      return file;
    }

    return file;
  };
};
