export const state = () => ({
    authUser: {},
})

export const mutations = {
    RESET_STORE: (state) => {
        state.authUser = null
        // Object.assign(state, initialState())
    },

    SET_AUTH_USER: (state, authUser) => {
        let provider = ''
        // console.log(authUser)
        authUser.providerData.forEach(element => {
            if (element.providerId === 'password') {
                provider = 'Correo electrónico'
            } else {
                provider = element.providerId
            }
        });
        state.authUser = {
            uid: authUser.uid,
            email: authUser.email,
            name: authUser.displayName,
            provider: provider
        }
    },
    logOut(state) {
        this.$fire.auth.signOut();
        state.authUser = ''
    },
    setProvider(state, payload) {
        state.provider = payload
    },
}

export const actions = {
    // async nuxtServerInit({ dispatch }, ctx) {
    //     if (this.$fire.auth === null) {
    //         throw 'nuxtServerInit Example not working - this.$fire.auth cannot be accessed.'
    //     }

    //     if (ctx.$fire.auth === null) {
    //         throw 'nuxtServerInit Example not working - ctx.$fire.auth cannot be accessed.'
    //     }

    //     if (ctx.app.$fire.auth === null) {
    //         throw 'nuxtServerInit Example not working - ctx.$fire.auth cannot be accessed.'
    //     }

    //     // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'

    //     /** Get the VERIFIED authUser from the server */
    //     if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
    //         const { allClaims: claims, ...authUser } = ctx.res.locals.user

    //         console.info(
    //             'Auth User verified on server-side. User: ',
    //             authUser,
    //             'Claims:',
    //             claims
    //         )

    //         await dispatch('onAuthStateChanged', {
    //             authUser,
    //             claims,
    //         })
    //     }
    // },

    onAuthStateChanged({ commit }, { authUser, claims }) {
        if (!authUser) {
            commit('RESET_STORE')
            return
        }
        commit('SET_AUTH_USER', authUser)
    },
}

export const getters = {
    isLoggedIn: (state) => {
        try {
            return state.authUser.id !== null
        } catch {
            return false
        }
    }
}
