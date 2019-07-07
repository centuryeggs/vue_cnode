<template>
  <div class="Pagination">
    <button @click="prev">
      <i class="el-icon-arrow-left"></i>
    </button>
    <button @click="changePage(1)" :class="{selectedButton: 1 ==selectedPage}">1</button>
    <button v-if="selectedPage > 4" class="omitButton" @click="jumpPrev">
      <span class="omit">···</span>
      <span class="icon">
        <i class="el-icon-d-arrow-left"></i>
      </span>
    </button>
    <button
      v-for="pageNum in showPages"
      :key="pageNum"
      :class="{selectedButton: pageNum ==selectedPage}"
      @click="changePage(pageNum)"
    >{{pageNum}}</button>
    <button class="omitButton" @click="jumpNest">
      <span class="omit">···</span>
      <span class="icon">
        <i class="el-icon-d-arrow-right"></i>
      </span>
    </button>
    <button @click="next">
      <i class="el-icon-arrow-right"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      showPages: [2, 3, 4, 5, 6]
    };
  },
  computed: {
    selectedPage(){
      return this.$store.state.pageNum
    }
  },
  methods: {
    changePage(pageNum) {
      this.$store.state.pageNum = pageNum
      if (this.$store.state.pageNum > 4) {
        this.showPages = this.showPages.map(num => {
          return pageNum - this.showPages[2] + num;
        });
      } else {
        this.showPages = [2, 3, 4, 5, 6];
      }

    },
    prev() {
      if (this.$store.state.pageNum == 1) {
        return;
      }
      if (this.$store.state.pageNum > 4) {
        this.showPages = this.showPages.map(num => {
          return num - 1;
        });
      }
      this.$store.commit('prevPage');
    },
    next() {
      this.$store.commit('nextPage');
      if (this.$store.state.pageNum > 4) {
        this.showPages = this.showPages.map(num => {
          return num + 1;
        });
      }
    },
    jumpPrev() {
      if (this.$store.state.pageNum < 7) {
        this.$store.commit('toFirstPage')
        this.showPages = [2, 3, 4, 5, 6]
      } else if (this.$store.state.pageNum < 10) {
        this.$store.commit('prevFivePages')
        this.showPages = [2, 3, 4, 5, 6];
      } else {
        this.$store.commit('prevFivePages')
        this.showPages = this.showPages.map(num => {
          return num - 5;
        });
      }
    },
    jumpNest() {
      if (this.$store.state.pageNum < 5) {
        this.$store.commit('nextFivePages')
        this.showPages = this.showPages.map(num => {
          return num + this.$store.state.pageNum - 4;
        });
      } else {
        this.$store.commit('nextFivePages')
        this.showPages = this.showPages.map(num => {
          return num + 5;
        });
      }
    }
  }
};
</script>

<style scoped>
.Pagination {
  margin: 10px 0;
}
button {
  width: 50px;
  height: 35px;
  padding: 0;
  border: 1px solid #e5e5e5;
  border-left: none;
  background: #fff;
  outline: none;
  cursor: pointer;
}
button:first-child {
  border-radius: 4px 0 0 4px;
  border-left: 1px solid #e5e5e5;
}
button:last-child {
  border-radius: 0 4px 4px 0;
}
.Pagination button:hover {
  background: #f2f8e6;
  border: 1px solid #d9ebb3;
  color: #80bd01;
  font-weight: bold;
}
.selectedButton {
  background: #f2f8e6;
  border: 1px solid #d9ebb3;
  color: #80bd01;
  font-weight: bold;
}
.omitButton {
  position: relative;
}
.omitButton .icon {
  visibility: hidden;
  position: absolute;
  right: 20px;
}
.omitButton:hover .icon {
  visibility: visible;
}
.omitButton:hover .omit {
  visibility: hidden;
}
</style>
