const adminModule = {

    store: () => ({
        staffData: {},
        roleData: {},
    }),

    actions: {
        setStaffData({commit}, data) {
            commit(SET_STAFF_DATA, data)
        },
        setRoleData({commit}, data) {
            commit(SET_ROLE_DATA, data)
        }
    },

    mutations: {
        SET_STAFF_DATA: (state, data) => {
            state.staffData = data;
        },
        SET_ROLE_DATA: (state, data) => {
            state.roleData = data;
        }
    }

}


export default adminModule;