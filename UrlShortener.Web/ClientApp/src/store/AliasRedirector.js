const requestRedirectByAliasType = 'REQUEST_REDIRECT_BY_ALIAS_TYPE';
const failRedirectByAliasType = 'FAIL_REDIRECT_BY_ALIAS_TYPE';

const initialState = {
  error: ''
};

const apiAliasesUrl = 'api/urlaliases';

export const actionCreators = {
  redirectByAlias: alias => async dispatch => {
    dispatch({ type: requestRedirectByAliasType });

    const url = `${apiAliasesUrl}/getByAlias/${alias}`;

    try {
      const response = await fetch(url).catch();
      if (!response.ok) throw new Error(response.statusText);

      const foundAlias = await response.json();
      window.location = foundAlias.originalUrl;
    } catch (error) {
      dispatch({ type: failRedirectByAliasType, error: error.message });
    }
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === failRedirectByAliasType) {
    return { ...state, error: action.error };
  }

  return state;
};
