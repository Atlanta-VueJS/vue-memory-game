# vue-memory-game

> Classic memory matching game in Vue.js

## Build Setup - Just run the final code.

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn dev

# build for production with minification
yarn build

# build for production and view the bundle analyzer report
yarn build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

---

## Workshop Instructions

Simple Vue.js application for the ATL Vue.js meetup.  In this workshop we are going to build a "memory" game.

### Install all workshop prerequisites.

Please be sure that all of these prerequisites are installed before continuing.

#### Install NodeJS
**NodeJS**
Please be sure you have NodeJS v8+ installed.

**MAC OSX**

If you need to install NodeJS please install nvm here:
[https://github.com/creationix/nvm#install-script](https://github.com/creationix/nvm#install-script)

Then install NodeJS with the command:

```
nvm install v8
nvm alias default v8
```

**Windows users please install from here:**

[https://nodejs.org/en/download](https://nodejs.org/en/download)

#### Install required NodeJS packages.

**Install yarn package manager & Vue CLI**

```
npm i yarn vue-cli -g
```

--


### Game Logic

The board will contain 30 tiles and will be laid out on a 640 x 496 pixel game board.  The player can click a tile to reveal a word on the tile. The player needs to match pairs of words.  If a player clicks two tiles and they do not match the tiles must stay visible for 1 second and then disappear.  When a match is made, the words stay visible and the pair is given a unique colored border.

![Completed Game Board](https://raw.githubusercontent.com/dsandor/vue-memory-game/master/docs/img/example-game-board.png)


### Create the project using the vue command line.

For the purposes of this documentation I am going to assume the project will be created in a folder `/Projects` we are going to use the Vue command line utility in order to bootstrap a webpack based vue template that we will work from.  We will name this project `vue-memory-game` so the files for this project will be in `~/Project/vue-memory-game`.


```
cd ~/Projects
vue init webpack vue-memory-game
```

The Vue CLI will ask you a few questions.  Please choose the same answers for the purposes of this documentation so that we are all on the same page.

|Question|Answer|
|---|---|
Project name|`vue-memory-game`
Project description|`Classic memory matching game in Vue.js`
Author|`your email address`
Vue build|`standalone`
Install vue-router?|`No`
Use ESLint to lint your code?|`Yes`
Pick an ESLint preset|`Airbnb`
Set up unit tests|`No`
Setup e2e tests with Nightwatch?|`No`
Should we run `npm install` for you after the project has been created?|`yarn`

Now change into the project directory and start the dev server:

```
cd vue-memory-game
yarn dev
```

If all goes well you will have a basic VueJS template up and running and you can navigate to this web page here: [http://localhost:8080](http://localhost:8080)

## Coding Steps

Here is a quick cheat for creating a vue component.  Below is the absolute minimum we will start with, you can copy and paste this code snippet in when creating a new vue component and then just start filling in the sections you need.

**Empty.vue**

```
<template>
  <div class="">
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
```

**GameTile.vue**

We are going to start with our most basic component, the GameTile.  This is going to be a little square on the game board that displays a word or a number to the user.  There will be 30 of these on the game board.

Create a new file under `src/Components` and name it `GameTile.vue`.  Copy and paste that empty template above to make this easier.

Fill out the style section with the style we want to use for the tile.

```
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
```

Next, we will fill out the script.  Here we name the component `GameTile` and tell the component that we are going to take a property named `tileConten`. We are using local state to store the visibility of the tile.  Finally, when the tile is clicked we will display an alert to the user telling them what tile they clicked on.


```
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
```

Finally, we will create the HTML for the tile.  This is quite simple as you can see below.

```
<template>
  <p class="game-tile-content" @click="clickedTile">{{ tileContent }}</p>
</template>
```

**GameBoard.vue**

This will be our main game board component.  It will be the page that contains the game board and the board will contain all the tiles.

Start by creating a template.  Here we just need a boart containter div and enumerate all of our tiles.

```
<template>
  <div class="game-board">
    <GameTile v-for="tile in tiles" :key="tile" :tileContent="tile" />
  </div>
</template>
```

Next, we need some code to create those tiles we referenced above.  This script will reference a GameTile component that will actually represent the game tile.  We name our component and create some tiles that we will display.

```
<script>
import GameTile from './GameTile';

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
```

Finally, we are going to style the game board so it does not look so dull.

```
<style scoped>
.game-board {
  background: grey;
  height: 100%;
  text-align: center;
  margin: 0 auto;
  height: 495px;
  width: 640px;
}
</style>
```

Before we test our game board we must first tell Vue that we want to display our GameBoard instead of the HelloWorld component.

Do this by modifying the `App.vue` file to look like this (leave the style tag alone):

```
<template>
  <div id="app">
    <GameBoard/>
  </div>
</template>

<script>
import GameBoard from './components/GameBoard';

export default {
  name: 'App',
  components: {
    GameBoard,
  },
};
</script>
```

Now if you start your dev server with `yarn dev` or just refresh your browser you should see a game board with ugly magenta tiles each with a number.

![Game board, first stab.](https://raw.githubusercontent.com/dsandor/vue-memory-game/master/docs/img/game-board-01.png)

Lets upgrade our tiles a bit to make them initially hide and have some kind of border.

Edit the **GameTile.vue** template to look like the template below.  Here we are adding a container div that itself is clickable.  We are going to also conditionally add a CSS class to the `<p>` element based on the local data state.

```
<template>
  <div class="game-tile-container" @click="clickedTile">
    <p class="game-tile-content"
      :class="{ 'game-tile-hidden': isContentHidden }">{{ tileContent }}</p>&nbsp;
  </div>
</template>

```

Lets add the isContentHidden data element and actually modify it when a user clicks.

```
<script>
export default {
  name: 'GameTile',
  props: ['tileContent'],
  data() {
    return {
      isContentHidden: true,
    };
  },
  methods: {
    clickedTile() {
      this.isContentHidden = !this.isContentHidden;
    },
  },
};
</script>
```

Also, add some CSS classes to handle the new states.

```
<style scoped>

.game-tile-content {
  color: white;
}

.game-tile-hidden {
  display: none;
  
}

.game-tile-container {
  display: inline-block;
  width: 60px;
  height: 60px;
  margin: 16px;
  background: magenta;
  border-width: 2px;
  border-style: dotted;
  border-color: black;
}
</style>
```

Now when you look at our game board the initial state is better but there is a little wonkiness when you click a tile! Oh my!  We will fix that :)

![Game board, first stab.](https://raw.githubusercontent.com/dsandor/vue-memory-game/master/docs/img/game-board-02.png)

## Store - Vuex 

Why do we need a state store for our little game?  Think about this board.  Each tile needs just deals with it's own visibility.  How does the game know if there is a match?  Do the tiles need to know about each other?

We are introducing a state store to be the single place to manage the state of the application.  This will use one way binding so that the `GameTile` components are blissfully unaware of each other.  All they care about in life is to display their word (or not) and tell the game when a user has clicked themselves.

So now we will start creating our store.

First, we will need some colors for later.

Create a directory under `./src` named `store` and add a new file `colors.js`.

**colors.js**

```
const Colors = [
  '#e6194b',
  '#3cb44b',
  '#ffe119',
  '#0082c8',
  '#f58231',
  '#911eb4',
  '#46f0f0',
  '#d2f53c',
  '#000080',
  '#808000',
  '#fabebe',
  '#008080',
  '#aaffc3',
  '#aa6e28',
  '#808080',
];

export default Colors;
```

Also under `./src/store` create a file `index.js`

**src/store/index.js**

```
/* eslint-disable no-param-reassign */

import Vue from 'vue';
import Vuex from 'vuex';
import Colors from './colors';

Vue.use(Vuex);

/*
  tiles object schema
  {
    id: Int,                // Used to identify a tile.
    isVisible: Boolean,     // If true the content (word) of the tile is visible.
    word: String            // The word on the tile.
    matched: Boolean,       // True if this tile has been matched with another tile.
    highlightColor: String, // The color to highlight the tile when it is matched.
    selected: Boolean,      // If the user clicked a hidden tile it becomes selected.
  }
*/

// milliseconds, time before we hide the bad match pair.
const timeoutBeforeClearingBadMatch = 1000;

const appState = {
  tiles: [],
  matchCount: 0,
};

const mutations = {
  setTiles(state, tiles) {
    state.tiles = tiles;
  },

  updateTile(state, { tileId, newTile }) {
    const index = state.tiles.findIndex(tile => tile.id === tileId);

    if (index >= 0) {
      Vue.set(state.tiles, index, Object.assign({}, state.tiles[index], newTile));
      /*
        This code will not trigger re-render so we use the code about.

        state.tiles[index] = Object.assign({}, state.tiles[index], newValue);
      */
    }
  },

  incrementMatchCount(state) {
    state.matchCount += 1;
  },

  markTileSelected(state, tileId) {
    const index = state.tiles.findIndex(tile => tile.id === tileId);

    if (index >= 0) {
      Vue.set(state.tiles, index, Object.assign({}, state.tiles[index],
        { selected: true, isVisible: true }));

      /*
      state.tiles[index] = Object.assign({}, state.tiles[index],
        { selected: true, isVisible: true });
      */
    }
  },

  clearSelected(state) {
    const newList = state.tiles.map((tile) => {
      tile.isVisible = tile.matched;
      tile.selected = false;

      return tile;
    });

    state.tiles = newList;
  },
};

const actions = {
  setAllTiles({ commit }, tiles) {
    commit('setTiles', tiles);
  },

  setTilesMatch({ commit, state }, tileIds) {
    commit('incrementMatchCount');

    const colorIndex = state.matchCount - 1;

    while (tileIds.length > 0) {
      const tileId = tileIds.splice(0, 1).pop();
      const tileIndex = state.tiles.findIndex(t => t.id === tileId);

      const newTile = Object.assign({}, state.tiles[tileIndex],
        {
          matched: true,
          highlightColor: Colors[colorIndex],
          selected: false,
          isVisible: true,
        });

      commit('updateTile', { tileId, newTile });
    }
  },

  selectTile(context, tileId) {
    const { commit, state, dispatch } = context;

    // selectedTiles will contain all the tiles the user PREVIOUSLY clicked on.
    const selectedTiles = state.tiles.filter(t => t.selected);
    // clickedTile is the tile the user actually clicked this time.
    const clickedTile = state.tiles.find(t => t.id === tileId);

    if (selectedTiles.length === 1) {
      // one selected, test to see if this tile matches that tile.
      const selectedTile = selectedTiles.pop();

      // eslint-disable-next-line
      if (selectedTile.id === tileId) {
        // user is pulling a fast one and is selecting the same tile twice!
        // eslint-disable-next-line
        return;
      } else if (selectedTile.word === clickedTile.word) {
        // It's a match!
        dispatch('setTilesMatch', [selectedTile.id, clickedTile.id]);
        // eslint-disable-next-line
        return;
      }

      // not a match.. mark selected and make visible,
      // then after a timeout unselect and make not visible.
      commit('markTileSelected', tileId);

      setTimeout(() => {
        commit('clearSelected');
      }, timeoutBeforeClearingBadMatch);
    } else if (selectedTiles.length === 0) {
      commit('markTileSelected', tileId);
    }
  },
};

export default new Vuex.Store({
  state: appState,
  mutations,
  actions,
});
```

We will go over this code in the workshop but this is the guts of the state management of our game.

Now we need to update the `src/main.js` file to tell Vue to use our new store.

**src/main.js**

```
import Vue from 'vue';
import App from './App';

import store from './store';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  store,
});
```

Now we need to update our game board to use the store for the tiles and add some game logic like what the names of the tiles are, shuffle them, etc.  This logic can also be placed in our store so that the view logic is separate from our game logic.  You can do that on your own and call an action to create the tiles and shuffle them.

Edit the `src/components/GameBoard.vue` to use the store.

**src/components/GameBoard.vue**

```
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

```

Finally, we edit our `GameTile.vue` componenet to also use the store.

**src/components/GameTile.vue**

```
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

```

Now, when you refresh (and you probably have to restart the dev server with `yarn dev` if the dev server blew up with any of our updates), you will see the final game board.

![Completed Game Board](https://raw.githubusercontent.com/dsandor/vue-memory-game/master/docs/img/example-game-board.png)

## Questions?  Improvements?

*  How can we improve on our state store?
*  Can we move the game logic to a server?
*  How hard would it be to change the tiles from using words to using images?
*  Where in the lifecycle can we initialize the tiles so the user does not need to click the `Create Tiles` button?
*  How hard would it be to animate the tiles when they flip?

