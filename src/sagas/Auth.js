/**
 * Auth Sagas
 */
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
//import getDta from "Components/Monedix/Data/getData";
import {
  auth,
  facebookAuthProvider,
  googleAuthProvider,
  twitterAuthProvider,
  githubAuthProvider
} from "../firebase";
import {
  LOGIN_USER,
  LOGIN_FACEBOOK_USER,
  LOGIN_GOOGLE_USER,
  LOGIN_TWITTER_USER,
  LOGIN_GITHUB_USER,
  LOGOUT_USER,
  SIGNUP_USER,
  API_KEYS_GET_STATUS
} from "../actions/types";

import {
  signinUserSuccess,
  signinUserFailure,
  signUpUserInFirebaseSuccess,
  signUpUserInFirebaseFailure,
  logoutUserFromFirebaseSuccess,
  logoutUserFromFirebaseFailure,
  setApiKeysStatus
} from "../actions/AuthActions";
import API from "../api/api";

/**
 * Sigin User With Email and Password Request
 */
const signInUserWithEmailPasswordRequest = async (email, password) =>
  await auth
    .signInWithEmailAndPassword(email, password)
    .then(authUser => authUser)
    .catch(error => error);

/**
 * Signin User With Facebook Request
 */
const signInUserWithFacebookRequest = async () =>
  await auth
    .signInWithPopup(facebookAuthProvider)
    .then(authUser => authUser)
    .catch(error => error);

/**
 * Signin User With Facebook Request
 */
const signInUserWithGoogleRequest = async () =>
  await auth
    .signInWithPopup(googleAuthProvider)
    .then(authUser => authUser)
    .catch(error => error);

/**
 * Signin User With Twitter Request
 */
const signInUserWithTwitterRequest = async () =>
  await auth
    .signInWithPopup(twitterAuthProvider)
    .then(authUser => authUser)
    .catch(error => error);

/**
 * Signin User With Github Request
 */
const signInUserWithGithubRequest = async () =>
  await auth
    .signInWithPopup(githubAuthProvider)
    .then(authUser => authUser)
    .catch(error => error);

/**
 * Signout Request
 */
const signOutRequest = async () =>
  await auth
    .signOut()
    .then(authUser => authUser)
    .catch(error => error);

/**
 * Create User
 */
const createUserWithEmailPasswordRequest = async (email, password) =>
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then(authUser => authUser)
    .catch(error => error);
/**
 * Get ApiKeys Status
 */
const getUserApiKeysStatusRequest = async (uid) =>
 await API
 .getAKStatus(uid)
 .then(data => data)
 .catch(error => error);

/**
 * Signin User With Email & Password
 */
function* signInUserWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const signInUser = yield call(
      signInUserWithEmailPasswordRequest,
      email,
      password
    );
    if (signInUser.message) {
      yield put(signinUserFailure(signInUser.message));
    } else {
        //register user login
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let tm = date + ' ' + time;

        API.postSuccessLogin(
        {
            uID: signInUser.user.uid,
            dt: tm
        });

        const AK_Data = yield call(getUserApiKeysStatusRequest, signInUser.user.uid);
        console.log(AK_Data);
        if(AK_Data.message)
        {   
          console.log("Error at get AK Status...");
        }
        else
        {
          localStorage.setItem("api_keys_data", JSON.stringify(AK_Data.data));
          yield put(setApiKeysStatus(AK_Data.data));
        }
        /*API.getAKStatus(signInUser.user.uid).then(res =>
        {
            console.log(res.data);
            
        });*/
      localStorage.setItem("user_id", JSON.stringify(signInUser.user.uid));
      //let usrNm = signInUser.user.uid;
      //getDta.fireBaseUsrname = usrNm;
      //getDta.getVerification(usrNm);
      yield put(signinUserSuccess(signInUser));
      history.push("/");
    }
  } catch (error) {
    yield put(signinUserFailure(error));
  }
}

/**
 * Signin User With Facebook Account
 */
function* signinUserWithFacebookAccount({ payload }) {
  try {
    const signUpUser = yield call(signInUserWithFacebookRequest);
    if (signUpUser.message) {
      yield put(signinUserFailure(signUpUser.message));
    } else {
      localStorage.setItem("user_id", JSON.stringify(signUpUser.user.uid));
      var getData = JSON.parse(localStorage.getItem("user_id"));
      //let usrNm = signUpUser.user.uid;
      //getDta.fireBaseUsrname = usrNm;
      //getDta.getVerification(usrNm);
      yield put(signinUserSuccess(getData));
      payload.push("/");
    }
  } catch (error) {
    yield put(signinUserFailure(error));
  }
}

/**
 * Signin User With Google Account
 */
function* signinUserWithGoogleAccount({ payload }) {
  try {
    const signUpUser = yield call(signInUserWithGoogleRequest);
    if (signUpUser.message) {
      yield put(signinUserFailure(signUpUser.message));
    } else {
      localStorage.setItem("user_id", JSON.stringify(signUpUser.user.uid));

      var getData = JSON.parse(localStorage.getItem("user_id"));

      //let usrNm = signUpUser.user.uid;
      //getDta.fireBaseUsrname = usrNm;
      //getDta.getVerification(usrNm);
      //let uidVar=getDta.fireBaseUsrName
      yield put(signinUserSuccess(getData));
      payload.push("/");
    }
  } catch (error) {
    yield put(signinUserFailure(error));
  }
}

/**
 * Signin User With Twitter Account
 */
function* signinUserWithTwitterAccount({ payload }) {
  try {
    const signUpUser = yield call(signInUserWithTwitterRequest);
    if (signUpUser.message) {
      yield put(signinUserFailure(signUpUser.message));
    } else {
      localStorage.setItem("user_id", JSON.stringify(signUpUser.user.uid));
      var getData = JSON.parse(localStorage.getItem("user_id"));
      //let usrNm = signUpUser.user.uid;
      //getDta.fireBaseUsrname = usrNm;
      //getDta.getVerification(usrNm);
      yield put(signinUserSuccess(getData));
      payload.push("/");
    }
  } catch (error) {
    yield put(signinUserFailure(error));
  }
}

/**
 * Signin User With Github Account
 */
function* signinUserWithGithubAccount({ payload }) {
  try {
    const signUpUser = yield call(signInUserWithGithubRequest);
    if (signUpUser.message) {
      yield put(signinUserFailure(signUpUser.message));
    } else {
      localStorage.setItem("user_id", JSON.stringify(signUpUser.user.uid));
      var getData = JSON.parse(localStorage.getItem("user_id"));
      //let usrNm = signUpUser.user.uid;
      //getDta.fireBaseUsrname = usrNm;
      //getDta.getVerification(usrNm);
      yield put(signinUserSuccess(getData));
      payload.push("/");
    }
  } catch (error) {
    yield put(signinUserFailure(error));
  }
}

/**
 * Signout User
 */
function* signOut() {
  try {
    yield call(signOutRequest);
    localStorage.removeItem("user_id");
    yield put(logoutUserFromFirebaseSuccess());
  } catch (error) {
    yield put(logoutUserFromFirebaseFailure());
  }
}

/**
 * Create User In Firebase
 */

function* createUserWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const signUpUser = yield call(
      createUserWithEmailPasswordRequest,
      email,
      password
    );
    if (signUpUser.message) {
      yield put(signUpUserInFirebaseFailure(signUpUser.message));
    } else {
      localStorage.setItem("user_id", signUpUser.uid);
      //let usrNm = signUpUser.user.uid;
      //getDta.fireBaseUsrname = usrNm;
      //getDta.getVerification(usrNm);
      yield put(signUpUserInFirebaseSuccess(signUpUser));
      history.push("/");
    }
  } catch (error) {
    yield put(signUpUserInFirebaseFailure(error));
  }
}

/**
 * Get User ApiKeys Status
 */
export function* getUsersApiKeysStatus({payload}) {
  try {
    console.log(payload);
    const AK_Data = yield call(getUserApiKeysStatusRequest);
    console.log(AK_Data);
  }
  catch(e) {
    console.log(e);
  }
}


/**
 * Signin User In Firebase
 */
export function* signinUserInFirebase() {
  yield takeEvery(LOGIN_USER, signInUserWithEmailPassword);
}

/**
 * Signin User With Facebook
 */
export function* signInWithFacebook() {
  yield takeEvery(LOGIN_FACEBOOK_USER, signinUserWithFacebookAccount);
}

/**
 * Signin User With Google
 */
export function* signInWithGoogle() {
  yield takeEvery(LOGIN_GOOGLE_USER, signinUserWithGoogleAccount);
}

/**
 * Signin User With Twitter
 */
export function* signInWithTwitter() {
  yield takeEvery(LOGIN_TWITTER_USER, signinUserWithTwitterAccount);
}

/**
 * Signin User With Github
 */
export function* signInWithGithub() {
  yield takeEvery(LOGIN_GITHUB_USER, signinUserWithGithubAccount);
}

/**
 * Signout User From Firebase
 */
export function* signOutUser() {
  yield takeEvery(LOGOUT_USER, signOut);
}

/**
 * Create User
 */
export function* createUserAccount() {
  yield takeEvery(SIGNUP_USER, createUserWithEmailPassword);
}

/**
 * Get ApiKeys Status
 */
export function* getApiKeyStatus() {
  yield takeEvery(API_KEYS_GET_STATUS, getUsersApiKeysStatus);
}

/**
 * Auth Root Saga
 */
export default function* rootSaga() {
  yield all([
    fork(signinUserInFirebase),
    fork(signInWithFacebook),
    fork(signInWithGoogle),
    fork(signInWithTwitter),
    fork(signInWithGithub),
    fork(signOutUser),
    fork(createUserAccount),
    fork(getApiKeyStatus)
  ]);
}
