const loading = {
  state: {
    // for loading or downloading
    isLoading: false,
    // for uploading
    upload: {
      isUploading: false,
      handleCanel: () => {}
    }
  },

  mutations: {
    LOADING: (state, isLoading) => {
      state.isLoading = isLoading;
      state.upload = {
        isUploading: false,
        handleCanel: () => {}
      };
    },
    UPLOADING: (state, upload) => {
      state.upload = upload;
      state.isLoading = false;
    }
  },

  actions: {
    LOADING: ({ commit }, isLoading) => {
      commit('LOADING', isLoading);
    },
    UPLOADING: ({ commit }, upload) => {
      commit('UPLOADING', upload);
    }
  }
};

export default loading;
