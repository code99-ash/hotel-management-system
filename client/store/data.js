export const state = () => ({
    categories: [],
    rooms: [],
})

export const actions = {
    // CATEGORIES
    async fetchCategories({commit}) {
        const response = await this.$axios.$get(`/category`);
        commit('ADD_CATEGORY', response)
    },
    addCategory({commit}, data) {
        data.rooms = [];
        commit('ADD_CATEGORY', data)
    },
    updatecategory({commit}, data) {
        commit('UPDATE_CATEGORY', data)
    },
    removeCategory({commit}, id) {
        commit('REMOVE_CATEGORY', id)
    },

    // ROOMS
    async fetchRooms({commit}) {
        const response = await this.$axios.$get('/room');
        commit('ADD_ROOM', response);
    },
    addRoom({commit}, data) {
        commit('ADD_ROOM', data)
    },
    updateRoom({commit}, data) {
        commit('UPDATE_ROOM', data)
    },
    removeRoom({commit}, id) {
        commit('REMOVE_ROOM', id)
    }
}

export const mutations = {
    // CATEGORIES
    ADD_CATEGORY(state, data) {
        state.categories = (Array.isArray(data))? data : [...state.categories, data]
    },
    REMOVE_CATEGORY(state, id) {
        state.categories = state.categories.filter(categ => categ._id !== id);
    },
    UPDATE_CATEGORY(state, data) {
        state.categories = state.categories.map(categ => 
            (categ._id === data._id)? categ=data : categ=categ
        );
    },

    //ROOMS
    ADD_ROOM(state, data) {
        state.rooms = (Array.isArray(data))? data : [...state.rooms, data];
    },
    REMOVE_ROOM(state, id) {
        state.rooms = state.rooms.filter(room => room._id !== id);
    },
    UPDATE_ROOM(state, data) {
        state.rooms = state.rooms.map(room => (room._id === data._id)? room=data : room=room);
    }
}