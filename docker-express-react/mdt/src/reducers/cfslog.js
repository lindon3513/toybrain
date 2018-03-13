import { RSAA, getJSON } from 'redux-api-middleware'; // RSAA = '@@redux-api-middleware/RSAA'
import { schema, normalize, denormalize } from 'normalizr';
import * as actionTypes from '../constants/actionTypes';
import * as constants from '../constants';

const cfsLogSchema = new schema.Entity('cfsLog');

const defaultState = {
  logArticles: [{
    id: 99999001,
    type: 1,
    text: 'Dispatching unit 0310 to CFS2017-00123',
    addby: 'System',
    addon: '2017-05-06',
  }, {
    id: 99999002,
    type: 2,
    text: `we surely will come back for more of the same another day soon. Ours is a life of constant reruns.
        We're always circling back to where we'd we started, then starting all
        over again. Even if we don't run extra laps that day', // to be changed to Text`,
    addby: 'Jackson',
    addon: '2017-09-05',
  }, {
    id: 99999003,
    type: 3,
    text: `Send Tone (0115) successfully,
        Tone 0115 = FD01, FD02, EMS South`,
    addby: 'Alison',
    addon: '2017-09-10',
  }],
};

// The followings are reducers
export default (state = defaultState /* [] */, action) => {
  switch (action.type) {
    case actionTypes.REFRESH_SUCCESS:
      return {
        logArticles: [...state.logArticles, ...action.payload],
      };

    case actionTypes.APPEND_SUCCESS:
      return {
        logArticles: [...state.logArticles, action.payload],
      };

    default:
      return state;
  }
};

// The followings are actionCreators, to be separated from reducer file
export const refreshCFSLog = () =>
  (dispatch) => {
    dispatch({
      type: actionTypes.REFRESH_REQUESTED,
    });

    dispatch({
      type: actionTypes.REFRESH_SUCCESS,
    });
  };

export const refreshCFSLogAsyncObsolete = () => (
  (dispatch) => {
    dispatch({
      type: actionTypes.REFRESH_REQUESTED,
    });

    setTimeout(() => {
      dispatch({
        type: actionTypes.REFRESH_SUCCESS,
      });
    }, 2000);
  }
);

export function refreshCFSLogAsync() {
  return {
    [RSAA]: {
      endpoint: constants.webAPIUrl,
      method: 'GET',
      types: [
        actionTypes.REFRESH_REQUESTED,
        {
          type: actionTypes.REFRESH_SUCCESS,
          payload: (action, state, res) =>
            getJSON(res).then((json) => {
              // const sampleItem = [{
              //   _id: '5a9f2074651a131bdc9015d7',
              //   entities: {
              //     cfsLog: {
              //       1520377971854: {
              //         id: 1520377971854,
              //         type: 2,
              //         text: 'fsef',
              //         addby: 'UserName',
              //         addon: '3/6/2018, 6:12:51 PM',
              //       },
              //     },
              //   },
              //   result: 1520377971854,
              // }];
              const denormalizedJsonArray = [];
              json.map(item =>
                denormalizedJsonArray.push(denormalize(item.entities.cfsLog[Object.keys(item.entities.cfsLog)], cfsLogSchema, item)));
              console.log(denormalizedJsonArray);
              return denormalizedJsonArray;
            }),
        },
        actionTypes.REFRESH_FAILURE,
      ],
    },
  };
}

export const appendCFSLog = val =>
  (dispatch) => {
    dispatch({
      type: actionTypes.APPEND_REQUESTED,
    });

    dispatch({
      type: actionTypes.APPEND_SUCCESS,
      payload: val,
    });
  };

export const appendCFSLogAsyncObsolete = val =>
  (dispatch) => {
    dispatch({
      type: actionTypes.APPEND_REQUESTED,
    });

    setTimeout(() => {
      dispatch({
        type: actionTypes.APPEND_SUCCESS,
        payload: val,
      });
    }, 2000);
  };

export function appendCFSLogAsync(val) {
  return {
    [RSAA]: {
      endpoint: constants.webAPIUrl,
      method: 'POST',
      body: JSON.stringify(normalize(val, cfsLogSchema)),
      headers: {
        'Content-Type': 'application/json',
      },
      types: [
        actionTypes.APPEND_REQUESTED,
        {
          type: actionTypes.APPEND_SUCCESS,
          payload: val,
        },
        actionTypes.APPEND_FAILURE,
      ],
    },
  };
}

export const showAllCFSLog = () =>
  (dispatch) => {
    dispatch({
      type: actionTypes.SHOW_ALL,
    });
  };

export const showSystemTextOnlyCFSLog = () =>
  (dispatch) => {
    dispatch({
      type: actionTypes.SHOW_SYSTEMTEXTONLY,
    });
  };

export const showUserTextOnlyCFSLog = () =>
  (dispatch) => {
    dispatch({
      type: actionTypes.SHOW_USERTEXTONLY,
    });
  };

export const showToneOnlyCFSLog = () =>
  (dispatch) => {
    dispatch({
      type: actionTypes.SHOW_TONEONLY,
    });
  };

