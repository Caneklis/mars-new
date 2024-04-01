import webpackStream from "webpack-stream";
import { webpackConfig } from "../../webpack.config.js";

export const scripts = () => {
  return (
    app.gulp
      .src(app.path.src.js, { sourcemaps: true })
      .pipe(app.plugins.plumber())
      // .pipe(
      //   webpackStream({
      //     // entry: {
      //     //   vendor: "./src/js/libs.js",
      //     //   main: "./src/js/main.js",
      //     // },
      //     mode: "development",
      //     output: {
      //       filename: "[name].js",
      //       path: app.path.build.js,
      //     },
      //     module: {
      //       rules: [
      //         {
      //           test: /\.js$/,
      //           exclude: /node_modules/,
      //           loader: "babel-loader",
      //           options: {
      //             presets: ["@babel/preset-env"],
      //           },
      //         },
      //       ],
      //     },
      //   })
      // )
      .pipe(
        webpackStream(webpackConfig)
        // webpackStream({
        //   mode: "development",
        //   entry: {
        //     libs: "./src/js/libs.js",
        //     main: "./src/js/main.js",
        //   },
        //   output: {
        //     filename: "[name].min.js",
        //   },
        //   plugins: [new CleanWebpackPlugin()],
        //   module: {
        //     rules: [
        //       {
        //         test: /\.js$/,
        //         exclude: /node_modules/,
        //         loader: "babel-loader",
        //         options: {
        //           presets: ["@babel/preset-env"],
        //         },
        //       },
        //     ],
        //   },
        // })
      )
      .pipe(app.gulp.dest(app.path.build.js))
      .pipe(app.plugins.browserSync.stream())
  );
};
