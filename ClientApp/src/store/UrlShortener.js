const setProtocolType = 'SET_PROTOCOL_TYPE';
const setOriginalUrlType = 'SET_ORIGINAL_URL_TYPE';
const setAliasType = 'SET_ALIAS_TYPE';

const initialState = {
  protocol: 'http',
  originalUrl: '',
  alias: '',
  isNew: true
};

export const actionCreators = {
  setProtocol: protocol => ({ type: setProtocolType, payload: protocol }),
  setOriginalUrl: url => ({ type: setOriginalUrlType, payload: url }),
  setAlias: alias => ({ type: setAliasType, payload: alias })
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === setProtocolType) {
    return { ...state, protocol: action.payload };
  }

  if (action.type === setOriginalUrlType) {
    return { ...state, originalUrl: action.payload };
  }

  if (action.type === setAliasType) {
    return { ...state, alias: action.payload };
  }

  return state;
};
