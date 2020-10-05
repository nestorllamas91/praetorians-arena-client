import { configureStore } from '@reduxjs/toolkit';

import reducerUser from '$root/slices/users';

export default configureStore({
  reducer: {
    user: reducerUser
  },

  preloadedState: {
    user: {
      data: null,
      isAuthenticated: false
    }
  }
});
