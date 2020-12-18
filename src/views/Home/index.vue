<template>
  <div>
    <Header>
      <span slot="logo" class="header_logo">ele.me</span>
      <router-link to="/login" slot="signinUp" v-if="!user_id">
        <span class="header_login">登录|注册</span>
      </router-link>
      <router-link else to="/profile" slot="signinUp">
        <!-- <span class="header_login">{{ username }}</span> -->
        <van-icon
          name="https://b.yzcdn.cn/vant/icon-demo-1126.png"
          class="header_login"
        />
      </router-link>
    </Header>
    <nav class="city_nav">
      <div class="city_tip">
        <span>当前定位城市:</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>

      <router-link :to="'/city/' + cityGuess.id" class="guss_city">
        <span>{{ cityGuess.name }}</span>
        <span class="iconfont icon-hanhan-01-011"></span>
      </router-link>
    </nav>
    <section id="hot_city_container">
      <h4 class="city_title">热门城市</h4>
      <ul class="citylistul">
        <router-link
          :to="'/city/' + hot.id"
          v-for="hot in hotCity"
          :key="hot.id"
        >
          <li>{{ hot.name }}</li>
        </router-link>
      </ul>
    </section>
    <section class="group_city_container">
      <div
        class="letter_classify"
        v-for="(value, key, index) in sortGroupCity"
        :key="key"
      >
        <h4 class="city_title">
          {{ key }} <span v-if="index === 0">(按字母排序)</span>
        </h4>
        <div>
          <router-link
            class="ellipsis"
            :to="'/city/' + item.id"
            v-for="item in value"
            :key="item.id"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from "@comps/Header";
import { cityGuess } from "@api/city";
import { getUserMsg } from "@api/login";
export default {
  name: "Home",
  data() {
    return {
      cityGuess: {}, // 当前城市
      hotCity: [], // 热门城市
      groupCity: {}, // 所有城市
      user_id: window.localStorage.getItem("user_id"),
      username: ""
    };
  },
  watch: {
    user_id: {
      async handler(val) {
        if (val) {
          const res = await getUserMsg(this.user_id);
          this.username = res.username;
        }
      },
      immediate: true
    }
  },
  computed: {
    sortGroupCity() {
      let sortObj = {};
      for (let i = 65; i <= 90; i++) {
        if (this.groupCity[String.fromCharCode(i)]) {
          sortObj[String.fromCharCode(i)] = this.groupCity[
            String.fromCharCode(i)
          ];
        }
      }
      return sortObj;
    }
  },
  components: {
    Header
  },
  async mounted() {
    // 当前城市定位
    const city_Guess = await cityGuess("guess");
    this.cityGuess = {
      ...city_Guess.data
    };
    // 所有的热门城市
    const hotCity = await cityGuess("hot");
    this.hotCity = hotCity.data;
    // 所有的城市
    const groupCity = await cityGuess("group");
    this.groupCity = groupCity.data;
  }
};
</script>

<style lang="less" scoped>
.header_logo {
  left: 0.4rem;
  font-weight: 400;
  font-size: 0.7rem;
  color: #fff;
  width: 2.3rem;
  height: 0.7rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.header_login {
  right: 0.55rem;
  font-size: 1rem;
  color: #fff;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.city_nav {
  padding-top: 2.35rem;
  border-top: 1px solid #e4e4e4;
  background-color: #fff;
  margin-bottom: 0.4rem;
  .city_tip {
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    line-height: 1.45rem;
    padding: 0 0.45rem;
    span:nth-of-type(1) {
      font-size: 0.55rem;
      color: #666;
    }
    span:nth-of-type(2) {
      font-weight: 900;
      font-size: 0.475rem;
      color: #9f9f9f;
    }
  }
  .guss_city {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.8rem;
    padding: 0 0.45rem;
    border-top: 1px solid #e4e4e4;
    border-bottom: 2px solid #e4e4e4;
    font: 0.75rem/1.8rem "Microsoft YaHei";
  }
}
#hot_city_container {
  background-color: #fff;
  margin-bottom: 5.4rem;
  .city_title {
    color: #666;
    font-weight: 400;
    text-indent: 0.45rem;
    border-top: 2px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    font: 0.55rem/1.45rem "Helvetica Neue";
  }
  .citylistul {
    li {
      background-color: #fff;
      float: left;
      text-align: center;
      color: #3190e8;
      border-bottom: 0.025rem solid #e4e4e4;
      border-right: 0.025rem solid #e4e4e4;
      width: 33%;
      height: 1.75rem;
      font: 0.6rem/1.75rem "Microsoft YaHei";
    }
  }
}
.group_city_container {
  .letter_classify {
    background-color: #fff;
    margin-bottom: 1.4rem;
    .city_title {
      color: #666;
      font-weight: 400;
      text-indent: 0.45rem;
      border-top: 2px solid #e4e4e4;
      border-bottom: 1px solid #e4e4e4;
      font: 0.55rem/1.45rem "Helvetica Neue";
      span {
        font-size: 0.475rem;
        color: #999;
      }
    }
    div {
      /*   */
      display: flex;
      // align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      .ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        color: #3190e8;
        background-color: #fff;
        border-bottom: 0.025rem solid #e4e4e4;
        border-right: 0.025rem solid #e4e4e4;
        width: 33%;
        height: 1.75rem;
        font: 0.6rem/1.75rem "Microsoft YaHei";
      }
    }
  }
}
</style>
