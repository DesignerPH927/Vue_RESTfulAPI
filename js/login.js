

const login = {
  data() {
    return {
      user: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    fieldEmpty() {
      if (this.user.username === '' || this.user.password === ''){
        alert('請不要空白');
        return;
      }
    },
    login() {
      this.fieldEmpty();
      // API站點
      const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
      // 登入SOP: 1. 登入 2. 將token、expired取出存入cookie            
      axios.post(api, this.user)
        .then((res) => {
          console.log(res);
          // 取出token、expired，使用解構的方式
          const { token, expired } = res.data;
          console.log(token, expired);
          // 將token、expired存入cookie中，參考MDN文件cookie
          document.cookie = `zackPCookie=${token}; expires=${new Date(expired)}`;
          // 導向目標頁面
          window.location = 'products.html';
        })
        .catch((err) => {
          alert(err.response.data.message);
        })

    }
  },
  mounted() {
  
  }
}

Vue.createApp(login).mount('#app');
