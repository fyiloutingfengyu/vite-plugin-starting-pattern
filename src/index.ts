import type { Plugin } from 'vite';
import colors from 'picocolors';

export default function startingPattern(type = '', color: string = 'green'): Plugin {
  return {
    name: 'vite-plugin-starting-pattern',
    apply: 'serve',
    config(userConfig, env) {
      // 可以做进一步的修改，会自动合入当前的配置
    },
    configureServer(server) {
      const print = server.printUrls;
      const outPutLogInfo = (str) => {
        console.log(colors[color](str));
      };

      server.printUrls = () => {
        const network = server.resolvedUrls?.network[0];
        const local = server.resolvedUrls?.local[0];

        if (!network && !local) {
          console.log(colors.red('获取IP地址失败，请检查vite.config.ts文件中server.host配置是否正确！'));
          return;
        }

        // todo f 完善type
        // todo f 配置颜色
        switch (type) {
          case 'type1':
            outPutLogInfo('*****type1*****');
            break;
          case 'type2':
            outPutLogInfo('*****type2*****');
            break;
          default:
            outPutLogInfo('|____ *** success *** ____|\n ' +
              '|----******************----| \n' +
              '|---********************---| \n');
            break;
        }
        print();


      };
    }
  };
}
