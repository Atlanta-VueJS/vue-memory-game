<template>
  <div id="app">
    <GameBoard/>
  </div>
</template>

<script>
import GameBoard from './components/GameBoard2-state';

export default {
  name: 'App',
  components: {
    GameBoard,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
}
</style>
