//index.js
//获取应用实例
const app = getApp()
const date = new Date();
const startDate = date.getFullYear() + "-" + (date.getMonth()+1) + '-' + date.getDate()
const week = (i) => {
  switch (i) {
    case 0:
      return "周天"
      break;
    case 1:
      return "周一"
      break;
    case 2:
      return "周二"
      break;
    case 3:
      return "周三"
      break;
    case 4:
      return "周四"
      break;
    case 5:
      return "周五"
      break;
    case 6:
      return "周六"
      break;
  }
}

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    navH:null,
    active:true,
    returnDateStatus:true,
    popupTipStatus:false,
    addPassengersStatus:false,
    adultNum:0,
    childrenNum:0,
    babyNum:0,
    outTime:null,
    returnTime:null
  },
  onPageScroll: function (e) {
    if(e.scrollTop>5){
      this.setData({
        bgColor:"rgba(0,0,0,1)"
      })
    }else{
      this.setData({
        bgColor:"transparent"
      })
    }
  },
  onLoad: function () {
    //设置自定义导航栏距离顶部的距离
    this.setData({
      navH: app.globalData.navHeight
    })
    //设置默认日期为当前时间
    this.setData({
      startDate:startDate,
      date: (date.getMonth() + 1) + '月' + date.getDate() + "日" + "   " + week(date.getDay()),
      outTime:date.getTime()
    })
    //获取用户的信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  // 获取用户信息并设置
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  clickBack:function(){
    this.setData({msg:"测试小程序的事件点击"})
  },
  //点击切换
  clickTab1:function(e){
    this.setData({
      active: true
    })
  },
  clickTab2: function (e) {
    this.setData({
      active:false
    })
  },
  //日期选择
  bindDateChange: function (e) {
    if(e.currentTarget.dataset.time==0){
      let selectDate = new Date(e.detail.value)
      let dateValue = (selectDate.getMonth() + 1) + '月' + selectDate.getDate() + "日" + "   " + week(selectDate.getDay())        
      this.setData({
        date:dateValue,
        outTime:selectDate.getTime()
      })
    }else{
      let selectDate = new Date(e.detail.value)
      let dateValue = (selectDate.getMonth() + 1) + '月' + selectDate.getDate() + "日" + "   " + week(selectDate.getDay())
      this.setData({
        returnTime:selectDate.getTime()
      })
      if(this.data.outTime>=this.data.returnTime){
        wx.showToast({
          title: '返程日期错误！',
          icon:"none"
        })
        return false
      }
      this.setData({
        returnDateStatus: false,
        date1: dateValue,
      })
    }
    console.log('picker发送选择改变，携带值为', e.detail.value)
  },
  //返程状态的改变
  changeReturnStatus:function(){
    this.setData({
      returnDateStatus:true
    })
  },
  //弹出说明弹窗
  openPopupTip:function(){
    this.setData({
      popupTipStatus:true,
      isPopupShow:true
    })    
  },
  //关闭说明弹窗
  closePopupTip: function () {
    this.setData({
      popupTipStatus: false,
      isPopupShow:false
    })
  },
  //阻止page滑动
  preventTouchMove:function(){},
  // 增加和减少乘机人数
  minusNum:function(e){
    switch (e.currentTarget.dataset.num) {
      case "0":
        if(this.data.adultNum <=0) return false
        let n1 = this.data.adultNum;
        n1--;
        this.setData({
          adultNum: n1
        })
        break;
      case "1":
        if (this.data.childrenNum <= 0) return false
        let n2 = this.data.childrenNum;
        n2--;
        this.setData({
          childrenNum: n2
        })
        break;
      case "2":
        if (this.data.babyNum <= 0) return false
        let n3 = this.data.babyNum;
        n3--;
        this.setData({
          babyNum: n3
        })
        break;
    }
  },
  addNum: function (e) {
    switch (e.currentTarget.dataset.num){
      case "0":
        let n1 = this.data.adultNum;
        n1++;
        this.setData({
          adultNum:n1
        })
        break;
      case "1":
        let n2 = this.data.childrenNum;
        n2++;
        this.setData({
          childrenNum: n2
        })
        break;
      case "2":
        let n3 = this.data.babyNum;
        n3++;
        this.setData({
          babyNum: n3
        })
        break;
    }
  },
  //关闭打开选择乘机人弹窗
  openAddPassengersPopup:function(){
    this.setData({
      addPassengersStatus:true
    })
  },
  closeAddPassengersPopup: function () {
    this.setData({
      addPassengersStatus: false
    })
  },
})



