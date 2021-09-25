import React from "react"
import { Navbar } from "reactstrap"
import { connect } from "react-redux"
import classnames from "classnames"
// import { useAuth0 } from "../../../authServices/auth0/auth0Service"
import {
  // logoutWithJWT,
  // logoutWithFirebase,
  logoutWithCustom
} from "../../../redux/actions/auth/loginActions"
import NavbarBookmarks from "./NavbarBookmarks"
import NavbarUser from "./NavbarUser"
// import userImg from "../../../assets/img/portrait/small/avatar-s-11.jpg"
import userImg from "../../../assets/img/portrait/small/person-icon-3.png"

const UserName = props => {
  console.log('User navbar : ', props)
  let username = ""
  // if (props.userdata !== undefined) {
  //   username = props.userdata.name
  // } else if (props.user.login.values !== undefined) {
  //   username = props.user.login.values.name
  //   if (
  //     props.user.login.values.loggedInWith !== undefined &&
  //     props.user.login.values.loggedInWith === "jwt"
  //   ) {
  //     username = props.user.login.values.loggedInUser.name
  //   }

  // } else {
  //   username = "John Doe"
  // }
  if (localStorage.getItem('account') !== undefined && localStorage.getItem('account') !== null) {
    var myProfile = localStorage.getItem('account')
    myProfile = JSON.parse(myProfile)
    // console.log('my profile', myProfile)
    username = myProfile.name
    var departemen = myProfile.nama_departemen
}

  return username
}

const departemenKu = props => {
  console.log('User navbar : ', props)
  let departemen = ""
  // if (props.userdata !== undefined) {
  //   username = props.userdata.name
  // } else if (props.user.login.values !== undefined) {
  //   username = props.user.login.values.name
  //   if (
  //     props.user.login.values.loggedInWith !== undefined &&
  //     props.user.login.values.loggedInWith === "jwt"
  //   ) {
  //     username = props.user.login.values.loggedInUser.name
  //   }

  // } else {
  //   username = "John Doe"
  // }
  if (localStorage.getItem('account') !== undefined && localStorage.getItem('account') !== null) {
    var myProfile = localStorage.getItem('account')
    myProfile = JSON.parse(myProfile)
    // console.log('my profile', myProfile)
    // username = myProfile.name
    departemen = myProfile.nama_departemen
}

  return departemen
}
const ThemeNavbar = props => {
  // const { user } = useAuth0()
  const colorsArr = [ "primary", "danger", "success", "info", "warning", "dark"]
  const navbarTypes = ["floating" , "static" , "sticky" , "hidden"]
  return (
    <React.Fragment>
      <div className="content-overlay" />
      <div className="header-navbar-shadow" />
      <Navbar
        className={classnames(
          "header-navbar navbar-expand-lg navbar navbar-with-menu navbar-shadow",
          {
            "navbar-light": props.navbarColor === "default" || !colorsArr.includes(props.navbarColor),
            "navbar-dark": colorsArr.includes(props.navbarColor),
            "bg-primary":
              props.navbarColor === "primary" && props.navbarType !== "static",
            "bg-danger":
              props.navbarColor === "danger" && props.navbarType !== "static",
            "bg-success":
              props.navbarColor === "success" && props.navbarType !== "static",
            "bg-info":
              props.navbarColor === "info" && props.navbarType !== "static",
            "bg-warning":
              props.navbarColor === "warning" && props.navbarType !== "static",
            "bg-dark":
              props.navbarColor === "dark" && props.navbarType !== "static",
            "d-none": props.navbarType === "hidden" && !props.horizontal,
            "floating-nav":
              (props.navbarType === "floating" && !props.horizontal) || (!navbarTypes.includes(props.navbarType) && !props.horizontal),
            "navbar-static-top":
              props.navbarType === "static" && !props.horizontal,
            "fixed-top": props.navbarType === "sticky" || props.horizontal,
            "scrolling": props.horizontal && props.scrolling

          }
        )}
      >
        <div className="navbar-wrapper">
          <div className="navbar-container content">
            <div
              className="navbar-collapse d-flex justify-content-between align-items-center"
              id="navbar-mobile"
            >
              <div className="bookmark-wrapper">
                {/* NAVABR BOOKMARK PANDU */}
                <NavbarBookmarks
                  sidebarVisibility={props.sidebarVisibility}
                  handleAppOverlay={props.handleAppOverlay}
                />
              </div>
              {props.horizontal ? (
                <div className="logo d-flex align-items-center">
                  <div className="brand-logo mr-50"></div>
                  <h2 className="text-primary brand-text mb-0">Dankos Farma</h2>
                </div>
              ) : null}
              <NavbarUser
                handleAppOverlay={props.handleAppOverlay}
                changeCurrentLang={props.changeCurrentLang}
                userName={<UserName {...props} />}
                // myDepartement={<departemenKu {...props} />}
                userImg={
                  props.user.login.values !== undefined &&
                  props.user.login.values.loggedInWith !== "jwt" &&
                  props.user.login.values.photoUrl
                    ? props.user.login.values.photoUrl
                    : userImg
                }
                loggedInWith={
                  props.user !== undefined &&
                  props.user.login.values !== undefined
                    ? props.user.login.values.loggedInWith
                    : null
                }
                // logoutWithJWT={props.logoutWithJWT}
                // logoutWithFirebase={props.logoutWithFirebase}
                logoutWithCustom={props.logoutWithCustom}
              />
            </div>
          </div>
        </div>
      </Navbar>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth
  }
}

export default connect(mapStateToProps, {
  // logoutWithJWT,
  // logoutWithFirebase,
  logoutWithCustom,
  // useAuth0
})(ThemeNavbar)
