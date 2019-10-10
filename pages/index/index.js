// pages/index/index.js

let { api, imgUrl } = require("../../utils/apis.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    wx_can_user:true,//微信是否已经授权
    canIUse:wx.canIUse('button.open-type.getUserInfo'),//button授权是否可用
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (getApp().globalData.userInfo) {
      this.setData({
        userInfo: getApp().globalData.userInfo,
        wx_can_user: true
      })
      this.onlogin();//获取用户信息
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      getApp().userInfoReadyCallback=res => {
        this.setData({
          userInfo: res.userInfo,
          wx_can_user: true
        })
      }
      this.onlogin();//获取用户信息
    } else { //没有授权
      this.setData({
        wx_can_user: false
      })
   //  this.onlogin();//获取用户信息
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 登录 根据code获取
   */
  onlogin:function(){
    let {wx_can_user,phoneNum} = this.data
    let that = this
    // 登录
    wx.login({
      success: function (res) {
        let code = res.code;
        if (code) {
          // 查看是否授权
          wx.getSetting({
            success: function (res) {
              if (res.authSetting["scope.userInfo"]) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                  success: function (res) {
                    // wx.request({
                    //   url: api + "WeChat/wxLogin",
                    //   method: "POST",
                    //   data: {
                    //     code,
                    //     encryptedData: res.encryptedData,
                    //     iv: res.iv
                    //   },
                    //   header: {
                    //     'content-type': 'application/x-www-form-urlencoded'
                    //   },
                    //   success: function (res) {
                    //     var resjson = res.data
                    //     if(resjson.code==200){
                    //       phoneNum = resjson.data.phone_num
                    //       that.setData({
                    //         phoneNum
                    //       })
                    //       wx.setStorageSync("phoneNum", phoneNum)
                    //       wx.setStorageSync("userInfo", resjson.data);
                    //     } else if (resjson.code==201 ||resjson.code==500 ){
                    //       //跳转到注册页面
                    //       wx.showModal({
                    //         title: '提示',
                    //         content: resjson.error,
                    //         showCancel:false,
                    //         success:res=>{
                    //           wx.navigateTo({
                    //             url: '../login/sign_up/signUp?code='+code,
                    //           })
                    //         }
                    //       })
                         

                    //     }else{
                    //       wx.showModal({
                    //         title: '提示',
                    //         content: resjson.error,
                    //         showCancel:false,
                    //         success:res=>{
                             
                    //         }
                    //       })

                    //     }
                    //   }
                    // });
                    that.setData({
                      wx_can_user:true
                    })
                  }
                });
              } else {
                that.setData({
                  wx_can_user: false
                })
              }
            }
          });
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      }
    });
    this.setData({
      wx_can_user
    })
  },

  /** 是否弹出授权框 */
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      getApp().globalData.userInfo = e.detail.userInfo;
      this.onlogin()

      //得到用户信息
      //如果获取用户信息成功关闭该窗口
      //如果没有获取对应的手机号码信息 跳转到对应的绑定页面
   
      //授权成功后，跳转进入小程序首页
      // this.setData({
      //   wx_can_user:true
      // })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },

})