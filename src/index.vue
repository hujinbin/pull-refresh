<template>
  <div
    class="pull-refresh"
    ref="scrollBox"
    :style="style"
    @touchstart="start"
    @touchmove="move"
    @touchend="end"
    @mousedown="start"
    @mousemove="move"
    @mouseup="end"
  >
    <div class="pull-refreshing-box">
      <div class="pull" v-if="moveState < 2">{{ moveState === 0 ? '下拉即可刷新...' : '释放即可刷新...' }}</div>
      <div v-else>
        <span class="loading"> 加载中...</span>
      </div>
    </div>
    <div class="pull-present-box">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "pull-refresh",
  data() {
    return {
      isPull: false, //是否处于拖动状态
      startY: "", //保存touch时的Y坐标
      moveDistance: 0, //保存向下滑动的距离
      moveState: 0, //开始滑动到结束后状态的变化 0:下拉即可刷新 1:释放即可刷新 2:加载中
      duration: 0 //动画持续时间，0就是没有动画
    };
  },
  computed: {
    style() {
      return {
        transition: `${this.duration}ms`,
        transform: `translate3d(0,${this.moveDistance}px, 0)`
      };
    }
  },
  methods: {
    start(e) {
      this.duration = 0; // 关闭动画
      this.moveDistance = 0; // 滑动距离归0
      this.isPull = true;
      this.startY = e.touches ? e.targetTouches[0].clientY : e.clientY; // 获得开始Y坐标
    },
    move(e) {
      //这里是整个下拉刷新的核心
      if (this.isPull) {
        let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        //首先判断我们有没有滚动条，如果有，我们下拉刷新就不能启用。
        if (scrollTop > 0) return;

        let move =
          (e.touches ? e.targetTouches[0].clientY : e.clientY) - this.startY;
        //判断手指滑动的距离，只有为正数才代表用户下拉了。
        if (move > 0) {
          //阻止默认事件，在微信浏览器中尤为有用，至于为什么，你去试就知道了。
          e.preventDefault();
          //增加滑动阻力的感觉
          this.moveDistance = Math.pow(move, 0.8);
          if (this.moveDistance > 50) {
            //如果滑动距离大于50 那我就告诉你，释放即可刷新
            if (this.moveState === 1) return;
            this.moveState = 1;
          } else {
            //否则 恢复原样
            if (this.moveState === 0) return;
            this.moveState = 0;
          }
        }
      }
    },
    end(e) {
      // 只要手指拿开，我都需要加上结束时的动画，这里为300ms
      this.duration = 300;
      this.isPull = false;
      if (this.moveDistance > 50) {
        //这里逻辑跟touchMove一样，但是需要真的加载数据了，那moveState变为2 所以加载动画在这出现
        this.moveState = 2;
        //因为还没加载完，我得让加载动画显示着，所以这里移动距离为50
        this.moveDistance = 50;
        this.$emit("refresh", () => {
          //这里就是成功后的回调了，如果该函数被调用，那就以为着加载数据完成，所以状态要回到0，当然需要在父组件调用。
          this.moveState = 0;
        });
      } else {
        //否则 给我老老实实恢复原样
        this.moveDistance = 0;
      }
    }
  },
  watch: {
    //这里是给用户操作返回的核心
    moveState(state) {
      //我们监听moveState的状态，
      //0意味着开始也意味着结束，这里是结束，并且只有动画生效我们才能 moveDistance 设为0，
      if (state === 0 && this.duration === 300) {
        this.moveDistance = 0;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.pull-refresh {
  display: flex;
  height: calc(100vh - 50px);
  flex-direction: column;
  margin-top: -50px;
  .pull-refreshing-box {
    line-height: 50px;
    height: 50px;
    font-size: 14px;
    color: rgba(69, 90, 100, 0.6);
    text-align: center;
    margin-bottom: 20px;
  }
  .pull-present-box {
    background-color: lighten(#fff, 10%);
  }
}
</style>