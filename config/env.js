/*!
 * 注入到html模版中的环境变量，前面一定带APP_前缀
 * 在模版中使用则不需要APP_前缀
 * 如env.*.js中声明了`{ APP_FOO: 1 }`
 * 在html模版中使用`<link rel="icon" href="<%= FOO %>">`
 *
 * 注入到JavaScript中的环境变量，前面一定带ENV_前缀
 * 在JavaScript中使用则不需要ENV_前缀
 * 如env.*.js中声明了`{ ENV_FOO: 1 }`
 * 在JavaScript中引用`var Foo = process.env.FOO`
 *
 * 环境变量命名协定
 * 1. 构建变量使用`BUILD_`前缀
 * 2. html模版变量使用`APP_`前缀
 * 3. JavaScript变量使用`ENV_`前缀
 */

const Env = {};
const { NODE_ENV } = process.env;
// load env.js, local.env.js
const files = ['env.js', 'local.env.js', `${NODE_ENV}.env.js`];

for (const name of files) {
  const filename = `./env/${name}`;
  try {
    const mod = require(filename);
    Object.assign(Env, mod);
  } catch (e) {
    console.warn('load [%s] error: %s', filename, e.message);
  }
}

// 附加上process.env变量
Object.assign(Env, process.env);

function getClientEnvironment() {
  const raw = Object.keys(Env).reduce((env, key) => {
    env[key] = Env[key];
    return env;
  }, {});

  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {})
  };

  return { raw, stringified };
}

module.exports = getClientEnvironment();
