
// API站點、路徑
const url = 'https://vue3-course-api.hexschool.io/v2';
const path = 'zack_p';

const app = {
  data() {
    return {
      remoteData: [],
      tempItems: {},      
    };
  },
  methods: {
    // 檢查是否登入成功
    checkAdmin() {
      axios.post(`${url}/api/user/check`)
        .then(() => {
          this.getRemoteData();
        })
        .catch((err) => {
          alert(err.response.data.message);
          // 若登入失敗，導向login頁面
          window.location = 'login.html';
        })
    },
    // 取得遠端products列表
    getRemoteData() {
      axios.get(`${url}/api/${path}/admin/products`)
        .then((res) => {
          console.log(res.data.products);
          this.remoteData = res.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);          
        })
    },
    openProducts(item) {
      this.tempItems = item;
    },
  },
  mounted() {
    // 登入後將token取出
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)zackPCookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  // console.log(token);
  // 將token存入headers中，參考axios文件搜尋關鍵字author
  // 已下意思，在下次登入時會預設(defaults)將token內容存入headers中
  axios.defaults.headers.common['Authorization'] = token;
    this.checkAdmin();
  },
}

Vue.createApp(app).mount('#app');