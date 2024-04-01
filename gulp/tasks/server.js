import browserSync from "browser-sync";

export const liveServer = (done) => {
  browserSync.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

export const reload = (done) => {
  browserSync.reload();
  done();
};
