const app = getApp()

Page({
  data: {
    status: 0,
    index: 0,
    sort: ['词语', '单字', '拼音', '文章'],
    history: [],
    key: '',
    characters: [],
    pronunciation: [],
    words: [],
    articles: []
  },

  onLoad(option) {
    if (option.index) {
      this.setData({
        index: option.index
      })
    }
    var history = wx.getStorageSync('history')
    if (history) {
      this.setData({
        history: history
      })
    }
  },

  sort(e) {
    this.setData({
      index: e.detail.value
    })
  },

  key(e) {
    this.setData({
      key: e.detail.value
    })
  },

  search() {
    if (this.data.key == '') {
      wx.showModal({
        content: '搜索内容为空！',
        showCancel: false,
        success(res) {
          console.log(res.confirm)
        }
      })
      return;
    }
    this.setData({
      status: 1
    })
    this.data.history.push(this.data.key)
    wx.setStorageSync('history', this.data.history)
    wx.showLoading()
    var key = this.data.key
    var index = this.data.index
    if (index == 0) {
      // 词语
      this.searchWord(key)
    } else if (index == 1) {
      // 单字 多字
      this.searchCharacter(key)
    } else if (index == 2) {
      // 拼音
      this.searchPinyin(key)
    } else if (index == 3) {
      // 文章
      this.searchArticle(key)
    }
  },

  searchPinyin(key) {
    let shengmu = key.substring(0, 1)
    let yunmu = key.substring(1, key.length - 1)
    let shengdiao = key.substring(key.length - 1)
    let that = this
    wx.request({
      url: app.globalData.server + 'characters?shengmu=' + shengmu + '&yunmu=' + yunmu + '&shengdiao=' + shengdiao,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json',
      },
      success(res) {
        if (res.statusCode == 200) {
          var arr = res.data.characters
          wx.request({
            url: app.globalData.server + 'characters',
            method: 'PUT',
            data: {
              characters: arr
            },
            header: {
              'content-type': 'application/json',
            },
            success(res) {
              if (res.statusCode == 200) {
                wx.hideLoading()
                if (res.data.characters.length === 0) {
                  wx.showToast({
                    title: '搜索结果为空',
                    icon: 'none'
                  })
                } else {
                  that.setData({
                    characters: res.data.characters
                  })
                }
              }
            }
          })
        } else {
          wx.showToast({
            title: '服务器错误',
          })
        }
      }
    })
  },

  searchCharacter(key) {
    let that = this
    wx.request({
      url: app.globalData.server + 'characters/words?search=' + key,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json',
      },
      success(res) {
        if (res.statusCode == 200) {
          wx.hideLoading()
          console.log(res.data.characters)
          if (res.data.characters[0].characters.length === 0) {
            wx.showToast({
              title: '搜索结果为空',
              icon: 'none'
            })
          } else {
            that.setData({
              pronunciation: res.data.characters
            })
          }
        }
      }
    })
  },

  searchWord(key) {
    var that = this
    wx.request({
      url: app.globalData.server + 'words?search=' + key,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json',
      },
      success(res) {
        if (res.statusCode == 200) {
          var arr = res.data.words
          wx.request({
            url: app.globalData.server + 'words',
            method: 'PUT',
            data: {
              words: arr
            },
            header: {
              'content-type': 'application/json',
            },
            success(res) {
              if (res.statusCode == 200) {
                wx.hideLoading()
                if (res.data.words.length === 0) {
                  wx.showToast({
                    title: '搜索结果为空',
                    icon: 'none'
                  })
                } else {
                  that.setData({
                    words: res.data.words
                  })
                }
              }
            }
          })
        } else {
          wx.showToast({
            title: '服务器错误',
          })
        }
      },
      fail(err) {
        wx.showToast({
          title: '网络异常',
        })
      }
    })
  },

  searchArticle(key) {
    var that = this
    wx.request({
      url: app.globalData.server + 'articles?search=' + key,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json',
      },
      success(res) {
        if (res.statusCode == 200) {
          var arr = res.data.articles
          wx.request({
            url: app.globalData.server + 'articles',
            method: 'PUT',
            data: {
              articles: arr
            },
            header: {
              'content-type': 'application/json',
            },
            success(res) {
              if (res.statusCode == 200) {
                wx.hideLoading()
                that.setData({
                  articles: res.data.articles
                })
              }
            }
          })
        } else {
          wx.showToast({
            title: '服务器错误',
          })
        }
      },
      fail(err) {
        wx.showToast({
          title: '网络异常',
        })
      }
    })
  },

  deleteHistory() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否清空历史记录？',
      success(res) {
        wx.setStorageSync('history', null)
        that.setData({
          history: []
        })
      }
    })
  },

  character(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/basics/characters/characters?id=' + id
    })
  },

  word(e) {
    let index = e.currentTarget.dataset.index
    let id = this.data.words[index].word.id
    wx.navigateTo({
      url: '/pages/basics/words/words?id=' + id
    })
  },

  toArticle(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/plugin/article/article?id=' + id,
    })
  }
})