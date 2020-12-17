<template>
  <div>
    <Header class="header">
      <router-link to="/" slot="logo">
        <span class="header_logo iconfont icon-hanhan-01-01"></span>
      </router-link>

      <span slot="center" class="header_center">{{ cityMsg.name }}</span>
      <router-link slot="signinUp" to="/">
        <span class="header_login">切换城市</span>
      </router-link>
    </Header>
    <form class="city_form">
      <div>
        <input
          class="city_input input_style"
          type="search"
          name="city"
          placeholder="请输入学校,商务楼,地址"
          required="required"
          v-model="searchCont"
        />
      </div>
      <div>
        <input
          class="city_submit input_style"
          type="submit"
          name="submit"
          value="提交"
          @click="submitForm"
        />
      </div>
    </form>
    <header class="pois_search_history">
      搜索历史
      <ul class="getpois_ul">
        <li v-for="(pois, index) in searchResult" :key="index">
          <h4 class="pois_name ellipsis">{{ pois.name }}</h4>
          <p class="pois_address ellipsis">{{ pois.address }}</p>
        </li>
      </ul>
    </header>
  </div>
</template>

<script>
import Header from "@comps/Header";
import { selectedCityMsg, getPois } from "@api/city";
export default {
  name: "City",
  data() {
    return {
      cityMsg: {}, // 选中城市信息
      searchCont: "", // 搜索的信息
      searchResult: []
    };
  },
  components: {
    Header
  },
  methods: {
    async submitForm() {
      const pois = await getPois(this.cityMsg.id, this.searchCont, "search");
      console.log(pois);
      this.searchResult = pois.data;
    }
  },
  async mounted() {
    // 获取所选城市信息
    const selectedCity = await selectedCityMsg(this.$route.params.id);
    this.cityMsg = selectedCity.data;
  }
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header_logo {
    font-weight: 400;
    font-size: 0.7rem;
    color: #fff;
    width: 2.3rem;
    height: 0.7rem;
  }
  .header_login {
    font-size: 0.65rem;
    color: #fff;
  }
  .header_center {
    font-size: 0.8rem;
    color: #fff;
    font-weight: bold;
  }
}

.city_form {
  margin-top: 2.1rem;
  background-color: #fff;
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  padding-top: 0.4rem;
  div {
    width: 90%;
    margin: 0 auto;
    text-align: center;
    .city_input {
      border: 1px solid #e4e4e4;
      padding: 0 0.3rem;
      font-size: 0.65rem;
      color: #333;
    }
    .city_submit {
      background-color: #3190e8;
      font-size: 0.65rem;
      color: #fff;
      border: none;
    }
    .input_style {
      border-radius: 0.1rem;
      margin-bottom: 0.4rem;
      width: 100%;
      height: 1.4rem;
    }
  }
}
.pois_search_history {
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  padding-left: 0.5rem;
  font: 0.475rem/0.8rem "Microsoft YaHei";
  .getpois_ul {
    li {
      .pois_name {
        margin: 0 auto 0.35rem;
        width: 90%;
        font-size: 0.65rem;
        color: #333;
      }
      .pois_address {
        width: 90%;
        margin: 0 auto 0.55rem;
        font-size: 0.45rem;
        color: #999;
      }
      .ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
