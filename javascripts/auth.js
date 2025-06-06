let auth0 = null
let isCheckingAuth = false // Flag to prevent concurrent auth checks
let isLoggedIn = false // to declare global user state
const config = {
  domain: "dev-wzadtpoj5nnk5uj1.us.auth0.com",
  client_id: "zTiHaknYvc17Kj3lz370AbHqtT58KnbF",
  //No audience should be passed for ID token custom claims
  redirect_uri: window.location.origin,
  cacheLocation: "localstorage", // Persist session after reload
  useRefreshTokens: true, // Use refresh tokens for session renewal
  scope: "openid profile email",
}

// === Auth0 Actions ===
// Login function - direct Auth0 login
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

// Signup function - direct to Auth0 signup screen
const signup = async () => {
  await auth0.loginWithRedirect({
    screen_hint: "signup",
    prompt: "login",
    appState: {
      returnTo: "/pricing/",
    },
  })
}

// Logout function
const logout = () => {
  auth0.logout({
    returnTo: window.location.origin,
  })
}

// show/hide the lock icon
const updateLock = async () => {
  const lockIcon = document.getElementById("lock-icon")
  if (lockIcon) {
    if (getAuthenticatedUserState()) {
      lockIcon.style.display = "none"
    } else {
      lockIcon.style.display = "inline"
    }
  }
}

//Function to check subscription status
const checkSubscriptionStatus = async (user) => {
  try {
    // First check Auth0 app_metadata (primary method)
    const tokenClaims = await auth0.getIdTokenClaims({ ignoreCache: true })
    const appMetadata = tokenClaims["https://dsabible.com/app_metadata"] || {}

    if (appMetadata.is_paid && appMetadata.payment_status === "active") {
      return true
    }

    // Fallback: Check directly with Stripe
    const stripeCustomerId =
      tokenClaims["https://dsabible.com/stripe_customer_id"]
    if (stripeCustomerId) {
      const baseUrl =
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname === "localhost"
          ? "http://localhost:8787"
          : "https://service-workers.akhilsin.workers.dev"

      const response = await fetch(`${baseUrl}/subscription-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: stripeCustomerId,
        }),
      })

      const data = await response.json()
      return data.hasAccess || false
    }

    return false
  } catch (error) {
    console.error("Error checking subscription status:", error)
    return false
  }
}

// Add a flag to prevent multiple simultaneous renders
let isRenderingContent = false

// === Content Renderer ===
// Function to render the appropriate content based on authentication
const renderContent = async (isAuthenticated) => {
  // Prevent concurrent rendering
  if (isRenderingContent) {
    console.log("Content rendering already in progress, skipping...")
    return
  }

  const solutionSection = document.getElementById("solution-section")

  if (!solutionSection) {
    console.log("Solution section not found, skipping render")
    return
  }

  try {
    isRenderingContent = true

    // Always clear the container first
    solutionSection.innerHTML = ""

    if (isAuthenticated) {
      // Check if user has paid subscription
      const hasSubscription = await checkSubscriptionStatus()

      if (hasSubscription) {
        // User is authenticated AND has active subscription - show protected content
        const protectedTemplate = document.getElementById(
          "protected-content-template"
        )
        if (protectedTemplate) {
          console.log("Template found:", protectedTemplate)

          // Step 1: Get the content from the template tag
          // ✅ FIX: Get only the innerHTML (content inside the script tag)
          const protectedContent = protectedTemplate.innerHTML

          // Step 2: Inject it into the desired container
          // ✅ FIX: Set innerHTML directly (no need for textContent)
          solutionSection.innerHTML = protectedContent

          // Clone the template content and append it to the solution section
          // const protectedContent = protectedTemplate.content.cloneNode(true)
          // solutionSection.appendChild(protectedContent)

          // ✅ Properly reinitialize MkDocs Material components
          await reinitializeMaterialComponents(solutionSection)
        }
      } else {
        // User is authenticated but no active subscription
        showSubscriptionPrompt(solutionSection)
      }
    } else {
      // User is not authenticated - show login prompt
      const loginTemplate = document.getElementById("login-prompt-template")
      if (loginTemplate) {
        // Clone the login prompt and append it to the solution section
        const loginPrompt = loginTemplate.content.cloneNode(true)
        solutionSection.appendChild(loginPrompt)

        // Add event listeners to the login/signup buttons
        const loginBtn = solutionSection.querySelector("#login-btn-inline")
        const signupBtn = solutionSection.querySelector("#signup-btn-inline")

        if (loginBtn) loginBtn.addEventListener("click", login)
        if (signupBtn) signupBtn.addEventListener("click", signup)
      }
    }
  } finally {
    isRenderingContent = false
  }
}

// ✅ New function to properly reinitialize MkDocs Material components
const reinitializeMaterialComponents = async (container) => {
  // Wait for DOM to settle
  // await new Promise((resolve) => setTimeout(resolve, 50))

  // Update lock-icon based on auth state
  await updateLock()

  // ✅ This Reinitialize MkDocs Material components
  if (typeof document$ !== "undefined" && document$.next) {
    document$.next(document)
    console.log("Triggered Material document stream")
  }

  // Reprocess MathJax - use the passed container or find solutionSection
  if (typeof MathJax !== "undefined") {
    MathJax.typesetPromise([container]).catch((err) => {
      console.error("Error typesetting math:", err)
    })
  }
}

// Function to show subscription prompt
const showSubscriptionPrompt = (container) => {
  const subscriptionTemplate = document.getElementById(
    "subscription-prompt-template"
  )
  if (subscriptionTemplate) {
    container.innerHTML = subscriptionTemplate.innerHTML
  }
}

// Check authentication and render UI
// === Auth Check ===
const checkAuth = async () => {
  // Prevent concurrent auth checks
  if (isCheckingAuth) return

  try {
    isCheckingAuth = true

    if (!auth0) {
      console.log("Auth0 not initialized yet, initializing...")
      auth0 = await createAuth0Client(config)
    }

    let isAuthenticated = await auth0.isAuthenticated()

    // Try to silently refresh session if not authenticated
    if (!isAuthenticated) {
      try {
        await auth0.getTokenSilently()
        isAuthenticated = await auth0.isAuthenticated()
        console.log("Silent authentication successful")
      } catch (e) {
        console.warn("Silent authentication failed:", e)
      }
    }

    console.log("Final isAuthenticated status:", isAuthenticated)
    setAuthenticatedUserState(isAuthenticated)

    // Get navigation UI elements
    const loginBtn = document.getElementById("login-btn")
    const signupBtn = document.getElementById("signup-btn")
    const logoutBtn = document.getElementById("logout-btn")
    const adminElements = document.querySelectorAll(".admin-only")

    if (isAuthenticated) {
      // User is logged in
      const user = await auth0.getUser()
      console.log("user", user)

      // Update navigation UI for logged-in state
      if (loginBtn) loginBtn.style.display = "none"
      if (signupBtn) signupBtn.style.display = "none"
      if (logoutBtn) logoutBtn.style.display = "inline-block"

      // Check for admin role
      const tokenClaims = await auth0.getIdTokenClaims()
      const roles = tokenClaims["https://dsabible.com/roles"] || []

      if (roles.includes("admin")) {
        adminElements.forEach((el) => (el.style.display = "block"))
      }
    } else {
      // User is not logged in
      if (loginBtn) loginBtn.style.display = "inline-block"
      if (signupBtn) signupBtn.style.display = "inline-block"
      if (logoutBtn) logoutBtn.style.display = "none"

      // Hide admin content
      adminElements.forEach((el) => (el.style.display = "none"))
    }

    // Render the appropriate content based on authentication
    // renderContent call to be async
    await renderContent(isAuthenticated)
  } finally {
    isCheckingAuth = false
  }
}

// === Auth Callback Handler ===
// Handle Auth0 callback
const handleAuthCallback = async () => {
  if (
    window.location.search.includes("code=") &&
    window.location.search.includes("state=")
  ) {
    const result = await auth0.handleRedirectCallback()
    const returnTo = result.appState?.returnTo || "/"
    window.location.assign(returnTo) // Force navigation to the desired path
  }
}

// === Auth Initialization ===
// Initialize Auth
const initAuth = async () => {
  try {
    auth0 = await createAuth0Client(config)

    if (
      window.location.search.includes("code=") &&
      window.location.search.includes("state=")
    ) {
      await handleAuthCallback()
    }

    // Wait for the browser to finish processing session cookies
    const isAuthenticated = await auth0.isAuthenticated()
    setAuthenticatedUserState(isAuthenticated)

    // Now render UI accordingly
    await checkAuth()

    // Set up UI event listeners
    const loginBtn = document.getElementById("login-btn")
    const signupBtn = document.getElementById("signup-btn")
    const logoutBtn = document.getElementById("logout-btn")

    if (loginBtn) loginBtn.addEventListener("click", login)
    if (signupBtn) signupBtn.addEventListener("click", signup)
    if (logoutBtn) logoutBtn.addEventListener("click", logout)
  } catch (error) {
    console.error("Auth0 init error:", error)
  }
}

// === Initialize on first Load on Page ===
initAuth()

// Auth state helpers
const getAuthenticatedUserState = () => isLoggedIn
const setAuthenticatedUserState = (value) => (isLoggedIn = value)

// // Debounced version of renderContent to prevent rapid successive calls
// let renderTimeout = null
// const debouncedRenderContent = (isAuthenticated) => {
//   clearTimeout(renderTimeout)
//   renderTimeout = setTimeout(() => {
//     renderContent(isAuthenticated)
//   }, 100) // 100ms debounce
// }

// === Hook into MkDocs Material Events ===
// Material for MkDocs navigation event
// This is the key event that fires when navigation occurs in Material for MkDocs
// document.addEventListener("DOMContentLoaded", () => {
//   console.log("DOMContentLoaded event fired")
//   renderContent(getAuthenticatedUserState())
// })

// For Material for MkDocs instant loading feature
// document.addEventListener("mdx-component-ready", () => {
//   console.log("mdx-component-ready event fired")
//   renderContent(getAuthenticatedUserState())
// })

// Listen for Material for MkDocs navigation events
// This is a custom event that Material for MkDocs fires when navigation occurs
// document.addEventListener("navigation", () => {
//   console.log("navigation event fired")
//   renderContent(getAuthenticatedUserState())
// })

// Additional event for Material for MkDocs content changes
// document.addEventListener("content-update", () => {
//   console.log("content-update event fired")
//   renderContent(getAuthenticatedUserState())
// })

if (
  typeof document$ !== "undefined" &&
  typeof document$.subscribe === "function"
) {
  document$.subscribe(function () {
    renderContent(getAuthenticatedUserState())
  })
}
