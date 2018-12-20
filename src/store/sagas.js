/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import firebaseSagas from '../redux/firebase/sagas';

export default function* rootSaga() {
  yield [
    ...firebaseSagas,
  ];
}
