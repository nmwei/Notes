# 一. 项目环境搭建
(1) 初始化项目
```
react-native init AwesomeProject
```
(2) 编译并运行应用
```
cd AwesomeProject
react-native run-android
react-native run-ios
```










# 其他
## 打包生成离线 jsbundle
1. `react-native bundle --help`查看打包参数

2.  `react-native bundle [参数]`构建`jsbundle`
```
react-native bundle [options]

builds the javascript bundle for offline use

Options:
  --entry-file <path>                Path to the root JS file, either absolute or relative to JS root
  --platform [string]                Either "ios" or "android" (default: "ios")
  --transformer [string]             Specify a custom transformer to be used
  --dev [boolean]                    If false, warnings are disabled and the bundle is minified (default: true)
  --minify [boolean]                 Allows overriding whether bundle is minified. This defaults to false if dev is true, and true if dev is false. Disabling minification can be useful for speeding up production builds for testing purposes.
  --bundle-output <string>           File name where to store the resulting bundle, ex. /tmp/groups.bundle
  --bundle-encoding [string]         Encoding the bundle should be written in (https://nodejs.org/api/buffer.html#buffer_buffer). (default: "utf8")
  --max-workers [number]             Specifies the maximum number of workers the worker-pool will spawn for transforming files. This defaults to the number of the cores available on your machine.
  --sourcemap-output [string]        File name where to store the sourcemap file for resulting bundle, ex. /tmp/groups.map
  --sourcemap-sources-root [string]  Path to make sourcemap's sources entries relative to, ex. /root/dir
  --sourcemap-use-absolute-path      Report SourceMapURL using its full path
  --assets-dest [string]             Directory name where to store assets referenced in the bundle
  --reset-cache                      Removes cached files
  --read-global-cache                Try to fetch transformed JS code from the global cache, if configured.
  --config [string]                  Path to the CLI configuration file
  --projectRoot [string]             Path to the root of the project
  --reactNativePath [string]         Path to React Native
  -h, --help                         output usage information%  
```
