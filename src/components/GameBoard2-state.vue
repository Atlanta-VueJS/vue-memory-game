<template>
  <div class="game-board-container">
    <button class="btn" @click="createTiles">Create Tiles</button>
    <div class="game-board">
      <GameTile v-for="tile in $store.state.tiles" :key="tile.id" :tile="tile" />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import GameTile from './GameTile3';

/*
  Fisher-Yates shuffle.
  https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
  https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
*/
const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default {
  name: 'GameBoard',
  components: {
    GameTile,
  },
  methods: {
    createTiles() {
      const tiles = [];

      const words = [
        'duck', 'cat', 'mouse', 'aardvark',
        'mole', 'lizard', 'goat', 'dog', 'fish',
        'lion', 'tiger', 'hawk', 'owl', 'hamster', 'snake',
        'duck', 'cat', 'mouse', 'aardvark',
        'mole', 'lizard', 'goat', 'dog', 'fish',
        'lion', 'tiger', 'hawk', 'owl', 'hamster', 'snake',
      ];

      words.forEach((word, ordinal) => {
        tiles.push({ id: ordinal, word, selected: false, isVisible: false, matched: false });
      });

      shuffle(tiles);

      this.$store.dispatch('setAllTiles', tiles);
    },
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

.game-board-container {

}

.btn {
  background: #3498db;
  background-image: -webkit-linear-gradient(top, #3498db, #2980b9);
  background-image: -moz-linear-gradient(top, #3498db, #2980b9);
  background-image: -ms-linear-gradient(top, #3498db, #2980b9);
  background-image: -o-linear-gradient(top, #3498db, #2980b9);
  background-image: linear-gradient(to bottom, #3498db, #2980b9);
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0px;
  text-shadow: 1px 1px 3px #666666;
  font-family: Arial;
  color: #ffffff;
  font-size: 20px;
  padding: 10px 20px 10px 20px;
  text-decoration: none;
  margin-bottom: 10px;
}

.btn:hover {
  background: #3cb0fd;
  background-image: -webkit-linear-gradient(top, #3cb0fd, #3498db);
  background-image: -moz-linear-gradient(top, #3cb0fd, #3498db);
  background-image: -ms-linear-gradient(top, #3cb0fd, #3498db);
  background-image: -o-linear-gradient(top, #3cb0fd, #3498db);
  background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
  text-decoration: none;
}
</style>
