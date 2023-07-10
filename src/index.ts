import type { Plugin } from 'vite';
import colors from 'picocolors';
import { Color } from '../type';
import patternList from './pattern-list';

export default function startingPattern(type = 'default', color: Color = 'green', pattern = ''): Plugin {
  return {
    name: 'vite-plugin-starting-pattern',
    apply: 'serve',
    config(userConfig, env) {
      // 可以做进一步的修改，会自动合入当前的配置
    },
    configureServer(server) {
      const _print = server.printUrls; // 存储 vite 内置的 printUrls函数
      const outPutLogInfo = (str) => {
        console.log(colors[color](str));
      };

      // 重写printUrls函数
      server.printUrls = () => {
        _print(); // 执行内置的printUrls函数，打到合并效果

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
      };
    }
  };
}
