import * as firebase from "firebase/app"
import { history } from "../../../history"
// import "firebase/auth"
// import "firebase/database"
import axios from "axios"
// import { config } from "../../../authServices/firebase/firebaseConfig"
import { api_query } from "../../../api/ApiConstant"

// Init firebase if not already initialized
// if (!firebase.apps.length) {
//   firebase.initializeApp(config)
// }

// let firebaseAuth = firebase.auth()

// const initAuth0 = new auth0.WebAuth(configAuth)

// export const submitLoginWithFireBase = (email, password, remember) => {
//   return dispatch => {
//     let userEmail = null,
//       loggedIn = false
//     firebaseAuth
//       .signInWithEmailAndPassword(email, password)
//       .then(result => {
//         firebaseAuth.onAuthStateChanged(user => {
//           result.user.updateProfile({
//             displayName: "Admin"
//           })
//           let name = result.user.displayName
//           if (user) {
//             userEmail = user.email
//             loggedIn = true
//             dispatch({
//               type: "LOGIN_WITH_EMAIL",
//               payload: {
//                 email: userEmail,
//                 name,
//                 isSignedIn: loggedIn,
//                 loggedInWith: "firebase"
//               }
//             })
//           }
//           if (user && remember) {
//             firebase
//               .auth()
//               .setPersistence(firebase.auth.Auth.Persistence.SESSION)
//               .then(() => {
//                 dispatch({
//                   type: "LOGIN_WITH_EMAIL",
//                   payload: {
//                     email: userEmail,
//                     name,
//                     isSignedIn: loggedIn,
//                     remember: true,
//                     loggedInWith: "firebase"
//                   }
//                 })
//               })
//           }
//           history.push("/")
//         })
//       })
//       .catch(error => {
//         console.log(error)
//       })
//   }
// }

// export const loginWithFB = () => {
//   return dispatch => {
//     let provider = new firebase.auth.FacebookAuthProvider()
//     provider.setCustomParameters({
//       display: "popup"
//     })
//     firebaseAuth
//       .signInWithPopup(provider)
//       .then(result => {
//         // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//         let token = result.credential.accessToken,
//           // The signed-in user info.
//           user = result.user.email
//         dispatch({
//           type: "LOGIN_WITH_FB",
//           payload: {
//             user,
//             token,
//             loggedInWith: "firebase"
//           }
//         })
//         if (user) history.push("/")
//       })
//       .catch(error => {
//         console.log(error)
//       })
//   }
// }

// export const loginWithTwitter = () => {
//   return dispatch => {
//     let provider = new firebase.auth.TwitterAuthProvider()
//     firebaseAuth
//       .signInWithPopup(provider)
//       .then(function(result) {
//         let token = result.credential.accessToken,
//           user = result.user.email,
//           name = result.user.displayName,
//           photoUrl = result.user.photoURL
//         dispatch({
//           type: "LOGIN_WITH_TWITTER",
//           payload: {
//             user,
//             name,
//             photoUrl,
//             token,
//             loggedInWith: "firebase"
//           }
//         })
//         history.push("/")
//       })
//       .catch(function(error) {
//         console.log(error)
//       })
//   }
// }

// export const loginWithGoogle = () => {
//   return dispatch => {
//     let provider = new firebase.auth.GoogleAuthProvider()
//     firebaseAuth
//       .signInWithPopup(provider)
//       .then(function(result) {
//         let token = result.credential.accessToken,
//           user = result.user.email,
//           name = result.user.displayName,
//           photoUrl = result.user.photoURL
//         dispatch({
//           type: "LOGIN_WITH_GOOGLE",
//           payload: {
//             email: user,
//             name: name,
//             photoUrl,
//             token,
//             loggedInWith: "firebase"
//           }
//         })
//         history.push("/")
//       })
//       .catch(function(error) {
//         console.log(error)
//       })
//   }
// }

// export const loginWithGithub = () => {
//   return dispatch => {
//     let provider = new firebase.auth.GithubAuthProvider()
//     firebaseAuth
//       .signInWithPopup(provider)
//       .then(function(result) {
//         let token = result.credential.accessToken,
//           user = result.user.email,
//           name = result.additionalUserInfo.username,
//           photoUrl = result.user.photoURL

//         dispatch({
//           type: "LOGIN_WITH_GITHUB",
//           payload: {
//             user,
//             name,
//             photoUrl,
//             token,
//             loggedInWith: "firebase"
//           }
//         })
//         history.push("/")
//       })
//       .catch(function(error) {
//         console.log(error)
//       })
//   }
// }

// export const loginWithJWT = user => {
//   // ngambil dari loginJWT, dia ngirim params semua statenya
//   return dispatch => {
//     axios
//       .post("/api/authenticate/login/user", {
//         email: user.email,
//         password: user.password
//       })
//       .then(response => {
//         var loggedInUser

//         if (response.data) {
//           loggedInUser = response.data.user

//           dispatch({
//             type: "LOGIN_WITH_JWT",
//             payload: { loggedInUser, loggedInWith: "jwt" }
//           })

//           history.push("/")
//         }
//       })
//       .catch(err => console.log(err))
//   }
// }

// export const logoutWithJWT = () => {
//   return dispatch => {
//     dispatch({ type: "LOGOUT_WITH_JWT", payload: {} })
//     history.push("/pages/login")
//   }
// }

// export const logoutWithFirebase = user => {
//   return dispatch => {
//     dispatch({ type: "LOGOUT_WITH_FIREBASE", payload: {} })
//     history.push("/pages/login")
//   }
// }

export const logoutWithCustom = user => {
  return dispatch => {
    dispatch({ type: "LOGOUT_WITH_CUSTOM", payload: {} })
    window.localStorage.clear();
    localStorage.removeItem('account');
    sessionStorage.clear();
    // window.localStorage.setItem('account', null)
    // window.location.reload();
    // console.log('mylocal ', localStorage.getItem('account'))
    history.push("/pages/login")

    // window.location.reload();
  }
}

// export const changeRole = role => {
//   return dispatch => dispatch({ type: "CHANGE_ROLE", userRole: role })
// }

export const loginWithCustom = user => {
  // ngambil dari loginJWT, dia ngirim params semua statenya

  console.log('custom log: ', user)

  return dispatch => {

    let sql = `
        select
          dmu.id,
          dmu.nik,
          dmu.name,
          convert_from(df_decrypt(password), 'UTF8') as "password" ,
          role,
          job_level,
          departement_id,
          active,
          dmu.create_by,
          dmu.create_date,
          dmu.update_by,
          dmu.update_date,
          dmd.nama_departemen
      from df_master_user dmu
      left join df_master_departement dmd
      on dmd.id = dmu.departement_id
      where dmu.nik = '`+user.nik+`'
    `

    // let sql = `
    //   select id,
    //         nik,
    //         name,
    //         convert_from(df_decrypt(password), 'UTF8') as "password" ,
    //         role,
    //         job_level,
    //         departement_id,
    //         active,
    //         create_by,
    //         create_date,
    //         update_by,
    //         update_date
    //   from df_master_user dmu
    //   join df_master_departement dmd
    //   on
    //   where nik = '`+user.nik+`'
    // `

    // let sql = `
  	// 	select id, name, email, convert_from(df_decrypt(password), 'UTF8') as "password" , role from df_master_user dmu where email = '`+user.email+`'
    // `

    axios
      .post(api_query, {
        query : sql
      })
      .then(response => {
        var loggedInUser
        // var _tempUser = response.data.response[0]
        var _tempUser = response.data.response.rows[0]
        console.log('response login custom : ', response.data.response.rows[0])
        // console.log('response login custom : ', response.data.response[0])

        if (_tempUser != undefined) {
          if(_tempUser.password == user.password){
            if(_tempUser.active == 'Y'){
              // loggedInUser = response.data.response[0]
              loggedInUser = response.data.response.rows[0]


              dispatch({
                type: "LOGIN_WITH_CUSTOM",
                payload: {
                  id: _tempUser.id,
                  nik : _tempUser.nik,
                  name: _tempUser.name,
                  role: _tempUser.role,
                  job_level: _tempUser.job_level,
                  departement_id: _tempUser.departement_id,
                  nama_departemen: _tempUser.nama_departemen,
                  loggedInWith: "custom"
                }
              })

              history.push("/home")

              window.location.reload(false);
            }else{
              history.push("/pages/login/?status=user_not_active")
              window.location.reload(false);
            }
          }else{
            console.log('Password salah')
            history.push("/pages/login/?status=wrong_password")
            window.location.reload(false);
            // dispatch({
            //   type: "default",
            //   payload: {
            //     status: "Password Salah",
            //   }
            // })
          }
        }else{
          console.log('User tidak ada')
          history.push("/pages/login/?status=user_not_found")
          window.location.reload(false);
        }

        // if (response.data) {
        //   loggedInUser = response.data.user

        //   dispatch({
        //     type: "LOGIN_WITH_CUSTOM",
        //     payload: { loggedInUser, loggedInWith: "custom" }
        //   })

        //   history.push("/")
        // }
      })
      .catch(err => console.log(err))
  }
}
