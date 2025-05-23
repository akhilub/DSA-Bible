document$.subscribe(() => {
  let auth0 = null
  let isCheckingAuth = false // Flag to prevent concurrent auth checks

  const config = {
    domain: "dev-wzadtpoj5nnk5uj1.us.auth0.com",
    client_id: "zTiHaknYvc17Kj3lz370AbHqtT58KnbF",
    audience: "https://dev-wzadtpoj5nnk5uj1.us.auth0.com/api/v2/",
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

  // Function to render the appropriate content based on authentication
  const renderContent = (isAuthenticated) => {
    const solutionSection = document.getElementById("solution-section")

    // Clear any existing content
    if (solutionSection) {
      solutionSection.innerHTML = ""

      if (isAuthenticated) {
        // User is authenticated - show protected content
        const protectedTemplate = document.getElementById(
          "protected-content-template"
        )

        if (protectedTemplate) {
          // Clone the template content and append it to the solution section
          const protectedContent = protectedTemplate.content.cloneNode(true)
          solutionSection.appendChild(protectedContent)

          // Reprocess MathJax
          if (typeof MathJax !== "undefined") {
            MathJax.typesetPromise([solutionSection]).catch((err) => {
              console.error("Error typesetting math:", err)
            })
          }

          // Reinitialize Material for MkDocs components
          /* Comment out this section which might be causing issues
          if (typeof document$.subscribe === "function") {
            // This will trigger the document$ observable which should reinitialize components
            document$.next(document)
          }
          */
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
    }
  }

  const checkAuth = async () => {
    // Prevent concurrent auth checks
    if (isCheckingAuth) return

    try {
      isCheckingAuth = true

      if (!auth0) {
        console.log("Auth0 not initialized yet, initializing...")
        auth0 = await createAuth0Client(config)
      }

      const isAuthenticated = await auth0.isAuthenticated()
      console.log("isAuthenticated", isAuthenticated)

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
      await auth0.handleRedirectCallback()
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }

  const initAuth = async () => {
    try {
      // Initialize Auth0 if not already initialized
      if (!auth0) {
        auth0 = await createAuth0Client(config)
      }

      // Handle redirect callback if needed
      await handleAuthCallback()

      // Check authentication state and update UI
      await checkAuth()

      // Add event listeners to main navigation buttons
      const loginBtn = document.getElementById("login-btn")
      const signupBtn = document.getElementById("signup-btn")
      const logoutBtn = document.getElementById("logout-btn")

      if (loginBtn) loginBtn.addEventListener("click", login)
      if (signupBtn) signupBtn.addEventListener("click", signup)
      if (logoutBtn) logoutBtn.addEventListener("click", logout)
    } catch (error) {
      console.error("Error initializing Auth0:", error)
    }
  }

  // Initialize on first load
  initAuth()

  // Material for MkDocs navigation event
  // This is the key event that fires when navigation occurs in Material for MkDocs
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded event fired")
    initAuth()
  })

  // For Material for MkDocs instant loading feature
  document.addEventListener("mdx-component-ready", () => {
    console.log("mdx-component-ready event fired")
    initAuth()
  })

  // Listen for Material for MkDocs navigation events
  // This is a custom event that Material for MkDocs fires when navigation occurs
  document.addEventListener("navigation", () => {
    console.log("navigation event fired")
    initAuth()
  })

  // Additional event for Material for MkDocs content changes
  document.addEventListener("content-update", () => {
    console.log("content-update event fired")
    initAuth()
  })
})
