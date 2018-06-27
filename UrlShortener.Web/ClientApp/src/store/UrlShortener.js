const setOriginalUrlType = 'SET_ORIGINAL_URL_TYPE';
const setAliasType = 'SET_ALIAS_TYPE';

const requestCreateAliasType = 'REQUEST_CREATE_ALIAS_TYPE';
const receiveCreateAliasType = 'RECEIVE_CREATE_ALIAS_TYPE';

const requestUpdateAliasType = 'REQUEST_UPDATE_ALIAS_TYPE';
const receiveUpdateAliasType = 'RECEIVE_UPDATE_ALIAS_TYPE';

const initialState = {
  originalUrl: '',
  alias: '',
  id: 0,
  isNew: true
};

const apiAliasesUrl = 'api/urlaliases';

export const actionCreators = {
  setOriginalUrl: url => ({ type: setOriginalUrlType, payload: url }),
  setAlias: alias => ({ type: setAliasType, payload: alias }),

  createAlias: urlAlias => async (dispatch, getState) => {
    dispatch({ type: requestCreateAliasType });

    const url = apiAliasesUrl;

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
  },

  updateAlias: urlAlias => async dispatch => {
    dispatch({ type: requestUpdateAliasType });

    const url = `${apiAliasesUrl}/${urlAlias.id}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(urlAlias)
    });

    await response.json();

    dispatch({ type: receiveUpdateAliasType });
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
