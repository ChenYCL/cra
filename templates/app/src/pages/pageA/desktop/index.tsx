import React, { useEffect } from 'react';
import { history, useModel } from 'umi';
import styles from './index.less'

export default () => {
  console.log(history);
  const masterProps = useModel('@@initialState');
  useEffect(() => {
    console.log('子应用全局内容: \n', masterProps);
  }, []);
  return <div className={styles.txt}>desktop index</div>;
};
