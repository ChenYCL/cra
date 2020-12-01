import React, { useEffect } from 'react';
import { history, useModel } from 'umi';
import { MobileView, BrowserView } from 'react-device-detect';
import MVIEW from './mobile';
import DESKTOSK from './desktop';

export default (): React.ReactNode => {
  console.log(history);
  const masterProps = useModel('@@initialState');
  useEffect(() => {
    console.log('子应用全局内容: \n', masterProps);
  }, []);
  return (
    <div>
      <MobileView>
        <MVIEW />
      </MobileView>
      {/*-------------------------*/}
      <BrowserView>
        <DESKTOSK />
      </BrowserView>
    </div>
  );
};
