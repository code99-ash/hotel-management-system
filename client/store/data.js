export const state = () => ({
    categories: []
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
    }
}