const setOriginalUrlType = 'SET_ORIGINAL_URL_TYPE';
const setAliasType = 'SET_ALIAS_TYPE';

const requestCreateAliasType = 'REQUEST_CREATE_ALIAS_TYPE';
const receiveCreateAliasType = 'RECEIVE_CREATE_ALIAS_TYPE';

const initialState = {
  originalUrl: '',
  alias: '',
  id: 0,
  isNew: true
};

export const actionCreators = {
  setOriginalUrl: url => ({ type: setOriginalUrlType, payload: url }),
  setAlias: alias => ({ type: setAliasType, payload: alias }),

  createAlias: urlAlias => async (dispatch, getState) => {
    dispatch({ type: requestCreateAliasType });

    const url = 'api/urlaliases/';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(urlAlias)
    });

    const createdAlias = await response.json();

    dispatch({ type: receiveCreateAliasType, createdAlias });
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === setOriginalUrlType) {
    return { ...state, originalUrl: action.payload };
  }

  if (action.type === setAliasType) {
    return { ...state, alias: action.payload };
  }

  if (action.type === receiveCreateAliasType) {
    return { ...state, id: action.createdAlias.id };
  }

  return state;
};
