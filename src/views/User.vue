<template>
  <div id="User">
    <SideBar size="big"></SideBar>
  </div>
</template>

<script>
import SideBar from '../components/SideBar'
export default {
  name: 'User',
  data() {
    return {
     
    };
  },
  components: {SideBar}
};
</script>

<style scoped>
#User > #SideBar{
  min-width: 1000px;
  margin: 0 auto;
  padding-top: 10px;
}
.loading {
  background: #e1e1e1;
}
</style>
