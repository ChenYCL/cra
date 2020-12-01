import {isBrowser, isMobile} from 'react-device-detect';

/**
 * 渲染hooks
 */
interface Props {
  /** pc样式 */
  pc?: () => JSX.Element;
  /** 移动端布局 */
  mobile?: () => JSX.Element

}

export default ({mobile, pc}: Props) => {
  if (isBrowser) {
    console.log('browser')
    return pc ? pc() : null
  }
  if (isMobile) {
    console.log('mobile')
    return mobile ? mobile() : null
  }

  return null;

}
