let auth0 = null
let isCheckingAuth = false
let isLoggedIn = false

const config = {
  domain: "dev-wzadtpoj5nnk5uj1.us.auth0.com",
  client_id: "zTiHaknYvc17Kj3lz370AbHqtT58KnbF",
  audience: "https://dev-wzadtpoj5nnk5uj1.us.auth0.com/api/v2/",
  redirect_uri: window.location.origin,
  cacheLocation: "localstorage",
  useRefreshTokens: true,
}

const login = async () => {
  await auth0.loginWithRedirect({
    appState: {
      returnTo:
        window.location.pathname +
        window.location.search +
        window.location.hash,
    },
  })
}

const signup = () => {
  window.location.href = "/pricing/"
}

const logout = () => {
  auth0.logout({ returnTo: window.location.origin })
}

const renderContent = (isAuthenticated) => {
  const solutionSection = document.getElementById("solution-section")
  if (!solutionSection) return

  solutionSection.innerHTML = ""

  if (isAuthenticated) {
    const protectedTemplate = document.getElementById(
      "protected-content-template"
    )
    if (protectedTemplate) {
      const protectedContent = protectedTemplate.content.cloneNode(true)
      solutionSection.appendChild(protectedContent)
      // Don't try to reinitialize anything - just show the content
    }
  } else {
    const loginTemplate = document.getElementById("login-prompt-template")
    if (loginTemplate) {
      const loginPrompt = loginTemplate.content.cloneNode(true)
      solutionSection.appendChild(loginPrompt)

      const loginBtn = solutionSection.querySelector("#login-btn-inline")
      const signupBtn = solutionSection.querySelector("#signup-btn-inline")

      if (loginBtn) loginBtn.addEventListener("click", login)
      if (signupBtn) signupBtn.addEventListener("click", signup)
    }
  }
}

const checkAuth = async () => {
  if (isCheckingAuth) return

  try {
    isCheckingAuth = true

    if (!auth0) {
      auth0 = await createAuth0Client(config)
    }

    let isAuthenticated = await auth0.isAuthenticated()

    if (!isAuthenticated) {
      try {
        await auth0.getTokenSilently()
        isAuthenticated = await auth0.isAuthenticated()
      } catch (e) {
        console.warn("Silent authentication failed:", e)
      }
    }

    setAuthenticatedUserState(isAuthenticated)

    const loginBtn = document.getElementById("login-btn")
    const signupBtn = document.getElementById("signup-btn")
    const logoutBtn = document.getElementById("logout-btn")

    if (isAuthenticated) {
      if (loginBtn) loginBtn.style.display = "none"
      if (signupBtn) signupBtn.style.display = "none"
      if (logoutBtn) logoutBtn.style.display = "inline-block"
    } else {
      if (loginBtn) loginBtn.style.display = "inline-block"
      if (signupBtn) signupBtn.style.display = "inline-block"
      if (logoutBtn) logoutBtn.style.display = "none"
    }

    renderContent(isAuthenticated)
  } finally {
    isCheckingAuth = false
  }
}

const handleAuthCallback = async () => {
  if (
    window.location.search.includes("code=") &&
    window.location.search.includes("state=")
  ) {
    const result = await auth0.handleRedirectCallback()
    const returnTo = result.appState?.returnTo || "/"
    window.location.assign(returnTo)
  }
}

const initAuth = async () => {
  try {
    auth0 = await createAuth0Client(config)

    if (
      window.location.search.includes("code=") &&
      window.location.search.includes("state=")
    ) {
      await handleAuthCallback()
      return
    }

    const isAuthenticated = await auth0.isAuthenticated()
    setAuthenticatedUserState(isAuthenticated)

    await checkAuth()

    const loginBtn = document.getElementById("login-btn")
    const signupBtn = document.getElementById("signup-btn")
    const logoutBtn = document.getElementById("logout-btn")

    if (loginBtn) loginBtn.addEventListener("click", login)
    if (signupBtn) signupBtn.addEventListener("click", signup)
    if (logoutBtn) logoutBtn.addEventListener("click", logout)
  } catch (error) {
    console.error("Auth0 error:", error)
  }
}

const getAuthenticatedUserState = () => isLoggedIn
const setAuthenticatedUserState = (value) => (isLoggedIn = value)

initAuth()

document.addEventListener("DOMContentLoaded", () => {
  renderContent(getAuthenticatedUserState())
})

if (typeof document$ !== "undefined") {
  document$.subscribe(() => {
    renderContent(getAuthenticatedUserState())
  })
}
