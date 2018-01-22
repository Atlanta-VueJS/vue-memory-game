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
