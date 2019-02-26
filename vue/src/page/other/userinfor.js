export default {
  getUser: () => {
    let str = localStorage.getItem('userInfor') ? JSON.parse(localStorage.getItem('userInfor')) : '';
    if(str) {
      // let newDate = new Date().getTime();
      // let diff = newDate - str.date;
      // //有效时间30分钟
      // if (diff > 30 * 60 * 1000) {
      //   localStorage.removeItem("userInfor");
      // }
    }
    return localStorage.getItem('userInfor') ? JSON.parse(localStorage.getItem('userInfor')) : '';
  },
  setUser: str => {
    localStorage.setItem('userInfor', str);
  }
}