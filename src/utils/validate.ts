export class Validate {
  static email(mail: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  static Password = (val: string) => {
    return val.length >= 6;
  };
  
  static isURL = (text: string): boolean => {
    const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
    return urlRegex.test(text);
  };
}
