<template>
  <p class="game-tile-content" @click="clickedTile">{{ tileContent }}</p>
</template>

<script>
export default {
  name: 'GameTile',
  props: ['tileContent'],
  data() {
    return {
      isContentVisible: false,
    };
  },
  methods: {
    clickedTile() {
      // eslint-disable-next-line
      alert(`clicked tile: ${this.tileContent}`);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.game-tile-content {
  color: white;
  display: inline-block;
  width: 60px;
  height: 60px;
  margin: 16px;
  background: magenta;
  border-width: 2px;
}
</style>
