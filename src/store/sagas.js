import loginSagas from '../redux/login/sagas';

export default function* rootSaga() {
  yield [
    ...loginSagas,
  ];
}
