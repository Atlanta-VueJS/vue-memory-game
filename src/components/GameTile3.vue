<template>
  <div class="game-tile-container"
      @click="clickedTile"
      :style="tileStyle"
    >
    <p class="game-tile-content">{{ tileContent }}&nbsp;</p>
  </div>
</template>

<script>
export default {
  name: 'GameTile',
  props: ['tile'],
  data() {
    return {
      isContentHidden: true,
    };
  },
  computed: {
    tileContent() {
      if (this.tile.isVisible) {
        return this.tile.word;
      }

      return '';
    },
    tileStyle() {
      return {
        'border-style': this.tile.matched ? 'solid' : 'dotted',
        'border-color': this.tile.matched ? this.tile.highlightColor : 'black',
      };
    },
  },
  methods: {
    clickedTile() {
      this.$store.dispatch('selectTile', this.tile.id);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.game-tile-content {
  color: #333;
}

.game-tile-hidden {
  display: none;
}

.game-tile-container {
  display: inline-block;
  width: 60px;
  height: 60px;
  margin: 16px;
  background: whitesmoke;
  border-width: 2px;
  border-style: dotted;
  border-color: black;
}
</style>
