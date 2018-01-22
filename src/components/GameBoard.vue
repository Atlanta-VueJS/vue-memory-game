<template>
  <div class="game-board">
    <GameTile v-for="tile in tiles" :key="tile" :tileContent="tile" />
  </div>
</template>

<script>
import GameTile from './GameTile2';

export default {
  name: 'GameBoard',
  components: {
    GameTile,
  },
  data() {
    return {
      tiles: [
        1, 2, 3, 4, 5, 6, 7, 8, 9,
        10, 11, 12, 13, 14, 15, 16,
        17, 18, 19, 20, 21, 22, 23,
        24, 25, 26, 27, 28, 29, 30],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.game-board {
  background: grey;
  height: 100%;
  text-align: center;
  margin: 0 auto;
  height: 495px;
  width: 640px;
}

.game-tile {

}

</style>
