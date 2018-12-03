export const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return action.user;

    default:
      return state;
  }
};

export const viewReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_CURRENT_VIEW':
      return action.view;

    default:
      return state;
  }
};
