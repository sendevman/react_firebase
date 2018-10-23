import firebaseSagas from '../redux/firebase/sagas';

export default function* rootSaga() {
  yield [
    ...firebaseSagas,
  ];
}
