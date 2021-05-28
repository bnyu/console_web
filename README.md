# Console Web Framework

[中文文档](./README_zh.md)

Based on [Vue](https://github.com/vuejs/vue)

## Usage

1. Git clone `git clone https://github.com/bnyu/console_web.git`
2. Install [Yarn](https://yarnpkg.com/getting-started/install) or just use [Npm](https://www.npmjs.com/)
3. Run `yarn install` or `npm install` in the directory you cloned to install dependencies
4. Write your code and Developed with `yarn run serve` or `npm run serve`
5. Build with `yarn run build` or `npm run build`

### Example

Under the mock, there are some users defined with different permits, you can try login and see the efforts.

| Username    | Password    |
| ----------- | ----------- |
| root        | 123456      |
| p1          | 123456      |
| p2          | 123456      |
| p3          | 123456      |
| p4          | 123456      |

![DemoScreenshot](./doc/assets/screenshot.png)

You need a server to deal with login and other request in production environment, but you can use mock for the
development.

## License

This is licensed under the Apache License, Version 2.0. See [License](LICENSE) for the full license text.
