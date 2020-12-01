import React from 'react';
import M from './mobile';
import D from './desktop';
import WithView from '@/components/WithView';

export default (): React.ReactNode => {
  return <div>{WithView({ mobile: M, pc: D })}</div>;
};
