import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useModel } from 'umi';
import { DesktopOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import './index.less';

// const { Header, Content, Footer, Sider } = Layout;
const { Sider } = Layout;

const { SubMenu } = Menu;

// TODO: 刷新页面菜单状态保存高亮,收缩状态等

export default (props) => {
  window.console.log('sys-evaluation--props:', props);
  const masterProps = useModel('@@qiankunStateFromMaster');
  console.log('sys-evaluation-masterProps:', masterProps);
  const [collapsed, setCollaped] = useState<boolean>(false);
  return (
    // <Layout >
    <Sider
      style={{ minHeight: '100vh' }}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollaped}
    >
      <div className="logo" style={{ display: 'none' }} />
      <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to="/desktop/index">List菜单</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          <Link to="/desktop/edit">edit菜单</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<UserOutlined />} title="二级菜单">
          <Menu.Item key="3">
            <Link to="/desktop/view">视图</Link>
          </Menu.Item>
          <Menu.Item key="4">item4</Menu.Item>
          <Menu.Item key="5">item5</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>

    //  </Layout>
  );
};
