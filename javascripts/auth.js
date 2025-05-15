let auth0 = null

const config = {
  domain: "dev-wzadtpoj5nnk5uj1.us.auth0.com",
  client_id: "zTiHaknYvc17Kj3lz370AbHqtT58KnbF",
  audience: "https://zTiHaknYvc17Kj3lz370AbHqtT58KnbF/userinfo",
  redirect_uri: window.location.origin,
}

// Login function - direct Auth0 login
const login = async () => {
  await auth0.loginWithRedirect()
}

// Signup function - redirect to pricing page
const signup = () => {
  window.location.href = "/pricing/"
}

// Logout function
const logout = () => {
  auth0.logout({
    returnTo: window.location.origin,
  })
}

const checkAuth = async () => {
  const isAuthenticated = await auth0.isAuthenticated()
  const loginBtn = document.getElementById("login-btn")
  const signupBtn = document.getElementById("signup-btn")
  const logoutBtn = document.getElementById("logout-btn")
  const protectedElements = document.querySelectorAll(".protected")
  const adminElements = document.querySelectorAll(".admin-only")

  if (isAuthenticated) {
    const user = await auth0.getUser()
    loginBtn.style.display = "none"
    signupBtn.style.display = "none"
    logoutBtn.style.display = "inline-block"
    protectedElements.forEach((el) => (el.style.display = "block"))

    const tokenClaims = await auth0.getIdTokenClaims()
    const roles = tokenClaims["https://dsa-bible.netlify.app/roles"] || []

    if (roles.includes("admin")) {
      adminElements.forEach((el) => (el.style.display = "block"))
    }
  } else {
    loginBtn.style.display = "inline-block"
    signupBtn.style.display = "inline-block"
    logoutBtn.style.display = "none"
    protectedElements.forEach((el) => (el.style.display = "none"))
    adminElements.forEach((el) => (el.style.display = "none"))
  }
}

window.onload = async () => {
  auth0 = await createAuth0Client(config)

  if (
    window.location.search.includes("code=") &&
    window.location.search.includes("state=")
  ) {
    await auth0.handleRedirectCallback()
    window.history.replaceState({}, document.title, "/")
  }

  checkAuth()

  document.getElementById("login-btn").addEventListener("click", login)
  document.getElementById("signup-btn").addEventListener("click", signup)
  document.getElementById("logout-btn").addEventListener("click", logout)
}
