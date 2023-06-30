import type { Plugin } from 'vite';
import colors from 'picocolors';

export default function Monitor(): Plugin {
  console.log('global', global);

  return {
    name: 'vite-plugin-monitor',
    apply: 'serve',
    config(userConfig, env) {
      console.log('666 userConfig', userConfig);
      console.log('777 env', env);
      // 可以做进一步的修改，会自动合入当前的配置
    },
    configureServer(server) {
      const print = server.printUrls;

      server.printUrls = () => {
        const network = server.resolvedUrls?.network[0];
        const local = server.resolvedUrls?.local[0];

        if (!network && !local) {
          console.log(colors.red('获取IP地址失败，请检查vite.config.ts文件中server.host配置是否正确！'));
        } else {
          console.log(colors.green(
            '|_____ *** success *** _____|\n ' +
            '|----******************----| \n' +
            '|---********************---| \n'
          ));
          print();
        }
      };
    }
  };
}
