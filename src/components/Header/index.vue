<template>
  <header id="header_top">
    <!-- 左侧 -->
    <slot name="logo"></slot>
    <slot name="search"></slot>

    <!-- 中间 -->
    <slot name="center"></slot>

    <!-- 右侧 -->
    <slot name="signinUp"></slot>
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style lang="less" scoped>
#header_top {
  background-color: #3190e8;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 1.95rem;
}
</style>
