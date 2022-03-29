/**
 * @author wuaixiaoyao
 * @date 2019/11/23
 * @Description:
*/
import { Button } from 'antd-mobile';
import styled from 'styled-components';
//覆盖第三方组件的默认样式
const ButtonDiv = styled(Button)`
  width: 100px;
  span {
    color: red;
  }
`
export default ButtonDiv
