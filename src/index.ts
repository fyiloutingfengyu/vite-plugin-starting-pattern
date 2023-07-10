import type { Plugin } from 'vite';
import colors from 'picocolors';
import { Color } from '../type';
import patternList from './pattern-list';

export default function startingPattern(type = 'default', color: Color = 'green', pattern = ''): Plugin {
  console.log(555,pattern);
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

        // 用户自定义图案
        if (pattern) {
          outPutLogInfo(pattern);
        } else {
          outPutLogInfo(patternList[type]);
        }

        print();
      };
    }
  };
}
