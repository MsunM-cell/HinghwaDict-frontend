const app = getApp()

Component({
  options: {
    addGlobalClass: true
  },

  data: {
    articlesList: []
  },

  lifetimes: {
    attached() {
      wx.showLoading({
        title: '加载中',
      })
      let that = this
      wx.request({
        url: app.globalData.server + 'articles',
        // url: 'http://127.0.0.1:4523/mock/404238/articles',
        method: 'GET',
        data: {},
        header: {
          'content-type': 'application/json',
        },
        success(res) {
          if (res.statusCode == 200) {
            // 获取文章id数组
            let arr = res.data.articles
            // 获取文章数组
            wx.request({
              url: app.globalData.server + 'articles',
              // url: 'http://127.0.0.1:4523/mock/404238/articles',
              method: 'PUT',
              data: {
                articles: arr
              },
              header: {
                'content-type': 'application/json',
              },
              success(res) {
                if (res.statusCode == 200) {
                  that.setData({
                    articlesList: res.data.articles
                  })
                  wx.hideLoading()
                }
              }
            })
          }
        }
      })
    }
  },

  methods: {
    article(e) {
      let index = e.currentTarget.dataset.index
      let id = this.data.articlesList[index].article.id
      wx.navigateTo({
        url: '/pages/plugin/article/article?id=' + id
      })
    },

    writeArticle() {
      wx.navigateTo({
        url: '/pages/plugin/write/write',
      })
    }
  }
})