const setOriginalUrlType = 'SET_ORIGINAL_URL_TYPE';
const setAliasType = 'SET_ALIAS_TYPE';

const requestCreateAliasType = 'REQUEST_CREATE_ALIAS_TYPE';
const receiveCreateAliasType = 'RECEIVE_CREATE_ALIAS_TYPE';

const requestUpdateAliasType = 'REQUEST_UPDATE_ALIAS_TYPE';
const receiveUpdateAliasType = 'RECEIVE_UPDATE_ALIAS_TYPE';

const requestDeleteAliasType = 'REQUEST_DELETE_ALIAS_TYPE';
const receiveDeleteAliasType = 'RECEIVE_DELETE_ALIAS_TYPE';

const requestFindByAliasType = 'REQUEST_FIND_BY_ALIAS_TYPE';
const receiveFindByAliasType = 'RECEIVE_FIND_BY_ALIAS_TYPE';
const failFindByAliasType = 'FAIL_FIND_BY_ALIAS_TYPE';

const initialState = {
  originalUrl: '',
  alias: '',
  id: 0
};

const apiAliasesUrl = 'api/urlaliases';

export const actionCreators = {
  setOriginalUrl: url => ({ type: setOriginalUrlType, payload: url }),
  setAlias: alias => ({ type: setAliasType, payload: alias }),

  createAlias: urlAlias => async dispatch => {
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

    await fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(urlAlias)
    });

    dispatch({ type: receiveUpdateAliasType });
  },

  deleteAlias: id => async dispatch => {
    dispatch({ type: requestDeleteAliasType });

    const url = `${apiAliasesUrl}/${id}`;

    await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json'
      }
    });

    dispatch({ type: receiveDeleteAliasType });
  },

  findByAlias: alias => async dispatch => {
    dispatch({ type: requestFindByAliasType });

    const url = `${apiAliasesUrl}/getByAlias/${alias}`;

    try {
      const response = await fetch(url).catch();
      if (!response.ok) throw new Error();

      const foundAlias = await response.json();
      dispatch({ type: receiveFindByAliasType, foundAlias });
    } catch (error) {
      dispatch({ type: failFindByAliasType });
    }
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

  if (action.type === receiveDeleteAliasType) {
    return { ...state, id: 0, alias: '', originalUrl: '' };
  }

  if (action.type === receiveFindByAliasType) {
    return { ...state, ...action.foundAlias };
  }

  if (action.type === failFindByAliasType) {
    return { ...state, id: 0, originalUrl: '' };
  }

  return state;
};
