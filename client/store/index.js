export const actions =  {
    async nuxtServerInit({ dispatch }) {
        await dispatch('data/fetchCategories');
        await dispatch('data/fetchRooms');
    }
}