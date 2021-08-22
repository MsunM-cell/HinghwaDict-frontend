Component({
  options: {
    addGlobalClass: true,
  },

  data: {
    list: [{
        title: 'e音乐',
        img: 'https://wx4.sinaimg.cn/mw690/0084vph8ly1gswr6ns9r2j30go0b4jtl.jpg',
        url: '/music/music'
      },
      {
        title: 'e字典',
        img: 'https://wx3.sinaimg.cn/mw690/0084vph8ly1gswr6nm9taj60go0b4dhz02.jpg',
        url: '/animation/animation'
      },
      {
        title: 'e学习',
        img: 'https://wx3.sinaimg.cn/mw690/0084vph8ly1gswr6nf50lj30go0b4jtm.jpg',
        url: '/drawer/drawer'
      },
      {
        title: 'e翻译',
        img: 'https://wx3.sinaimg.cn/mw690/0084vph8ly1gswr6n6niuj30go0b4q5h.jpg',
        url: '/verticalnav/verticalnav'
      },
      {
        title: 'e词典',
        img: 'https://wx2.sinaimg.cn/mw690/0084vph8ly1gswr6my4xsj30go0b4771.jpg',
        url: ''
      }
    ]
  },

  methods: {
    getTools(e) {
      wx.navigateTo({
        url: '/pages/component' + e.currentTarget.dataset.url
      })
    }
  }
})