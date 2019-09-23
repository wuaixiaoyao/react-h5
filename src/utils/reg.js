/**
 * @author wuaixiaoyao
 * @date 2019/9/23
 * @Description:正则校验
*/
class RegUtil {
  checkReg(reg,str){
    return reg.test(str)
  }
  checkChinaPhoneNumber(str){//国内手机号
    let phoneReg=/^1[2-9]\d{9}$/;
    return this.checkReg(phoneReg,str)
  }

  checkSpace(str){//空格
    let spaceReg = /\s+/g;
    return this.checkReg(spaceReg,str)
  }
  checkCn(str){
    let reg = /^[\u4e00-\u9fa5]+$/;
    return this.checkReg(reg,str)
  }
  checkEn(str){
    let reg = /^[a-zA-Z]+$/;
    return this.checkReg(reg,str)
  }
  checkInt(str){
    let reg = /^[0-9]+$/;
    return this.checkReg(reg,str)
  }

  checkEmail(str){
    let reg = /^(([^()[\]\\.,;:\s@"]+(\.[^()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return this.checkReg(reg, str)
  }
  checkNumberAndEn(str){
    let reg = /^[0-9a-zA-Z]+$/;
    return this.checkReg(reg, str)
  }

  // 密码规则验证
  checkPassword(str){
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
    return this.checkReg(reg, str)
  }
}
export default new RegUtil()