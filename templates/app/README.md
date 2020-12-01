## 基座与微应用部署

### 基座注册子应用(config.ts)

```ts
// qiankun插件集成
qiankun: {
  master: {
    apps: [
      {
        name: 'sys-template', // 模板应用 唯一标识
        entry: '//localhost:9506', // html entry
      },
    ];
  }
}
```

### 装载子应用

- 使用路由绑定的方式 _建议使用这种方式来引入自带路由的子应用_

```ts
	// 子应用注册路由
    {
        name: '应用模板',
        icon: 'smile',
        path: '/sys-template',
        microApp: 'sys-template',
        locale: false,
        // layout:true, // 污染
        // 不使用基座layout
        // layout: false,
        layout: {
            hideMenu: true,
            hideNav: false,
            hideFooter: true,
        },
    },
```

- 使用 <MicroApp /> 组件的方式

  _建议使用这种方式来引入不带路由的子应用。 否则请自行关注微应用依赖的路由跟当前浏览器 url 是否能正确匹配上，否则很容易出现微应用加载了，但是页面没有渲染出来的情况。_

```ts
import { MicroApp } from 'umi';

<MicroApp name="sys-template" />;
```

### 子应用集成 qiankun 配置(config.ts)

```ts
  // qiankun插件集成
  qiankun: {
    slave: {},
  },

```

### 基座与子应用通讯

```ts
import { useModel } from 'umi';
export default () => {
  // 获取基座数据
  const masterProps = useModel('@@qiankunStateFromMaster') || {};
  const { masterState, setMasterState } = baseProps;
  return (
    <div>
      <p>list</p>
      <h1>{masterState.test}</h1>
      <button onClick={() => setMasterState({ test: 'test' })}>按钮</button>
    </div>
  );
};
```

## 微应用目录结构与页面路由约定

```
├─config
│      config.ts umi内置功能和插件的配置
│      routes.ts 页面路由配置
│
├─mock 存储mock文件
│
├─public 此目录下所有文件会被copy到输出路径
│
├─src
│  │  app.tsx 运行时入口，可扩展运行时的能力，比如修改路由等
│  │
│  ├─components 组件目录
│  │
│  ├─layouts 全局布局文件，可自定义左侧导航
│  │
│  ├─locales 国际化
│  │
│  ├─pages 所有路由组件存放位置
│  │  │
│  │  ├─manage 约定管理端入口目录
│  │  │
│  │  ├─sysTemplateMain 业务模型
│  │  │  ├─edit 新建、编辑页面目录
│  │  │  │  │  index.tsx 组件入口
│  │  │  │  │
│  │  │  │  ├─desktop 桌面端入口
│  │  │  │  │      index.less
│  │  │  │  │      index.tsx
│  │  │  │  │
│  │  │  │  └─mobile 移动端入口
│  │  │  │          index.less
│  │  │  │          index.tsx
│  │  │  │
│  │  │  ├─home 主页目录
│  │  │  │
│  │  │  ├─list 列表页目录
│  │  │  │
│  │  │  └─view 查看页目录
│  │
│  ├─services 业务接口定义
│  │
│  ├─types 业务模型定义
│  |
│  └─utils 工具类
```
