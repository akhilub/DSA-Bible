document$.subscribe(() => {
  let auth0 = null
  let isInitialized = false

  const config = {
    domain: "dev-wzadtpoj5nnk5uj1.us.auth0.com",
    client_id: "zTiHaknYvc17Kj3lz370AbHqtT58KnbF",
    audience: "https://dev-wzadtpoj5nnk5uj1.us.auth0.com/api/v2/",
    redirect_uri: window.location.origin,
  }

  // Login function - direct Auth0 login
  const login = async () => {
    if (!auth0) await initAuth()
    await auth0.loginWithRedirect()
  }

  // Signup function - redirect to pricing page
  const signup = () => {
    window.location.href = "/pricing/"
  }

  // Logout function
  const logout = () => {
    if (!auth0) return
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
          if (typeof document$.subscribe === "function") {
            // This will trigger the document$ observable which should reinitialize components
            document$.next(document)
          }
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

          if (loginBtn)
            loginBtn.addEventListener("click", login, { passive: true })
          if (signupBtn)
            signupBtn.addEventListener("click", signup, { passive: true })
        }
      }
    }
  }

  const checkAuth = async () => {
    try {
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

      return isAuthenticated
    } catch (error) {
      console.error("Error checking authentication:", error)
      return false
    }
  }

  const handleAuthCallback = async () => {
    if (
      window.location.search.includes("code=") &&
      window.location.search.includes("state=")
    ) {
      try {
        await auth0.handleRedirectCallback()
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        )
        return true
      } catch (error) {
        console.error("Error handling redirect callback:", error)
        return false
      }
    }
    return false
  }

  const initAuth = async () => {
    if (isInitialized) return

    try {
      // Initialize Auth0 if not already initialized
      if (!auth0) {
        auth0 = await createAuth0Client(config)
      }

      // Handle redirect callback if needed
      const isCallbackHandled = await handleAuthCallback()

      // Check authentication state and update UI
      const isAuthenticated = await checkAuth()

      // Add event listeners to main navigation buttons
      const loginBtn = document.getElementById("login-btn")
      const signupBtn = document.getElementById("signup-btn")
      const logoutBtn = document.getElementById("logout-btn")

      // Remove existing event listeners to prevent duplicates
      if (loginBtn) {
        loginBtn.replaceWith(loginBtn.cloneNode(true))
        document
          .getElementById("login-btn")
          .addEventListener("click", login, { passive: true })
      }

      if (signupBtn) {
        signupBtn.replaceWith(signupBtn.cloneNode(true))
        document
          .getElementById("signup-btn")
          .addEventListener("click", signup, { passive: true })
      }

      if (logoutBtn) {
        logoutBtn.replaceWith(logoutBtn.cloneNode(true))
        document
          .getElementById("logout-btn")
          .addEventListener("click", logout, { passive: true })
      }

      isInitialized = true
      return isAuthenticated
    } catch (error) {
      console.error("Error initializing Auth0:", error)
      return false
    }
  }

  // Initialize on first load
  initAuth()

  // Use a debounce function to prevent multiple rapid calls
  let authDebounceTimer = null
  const debouncedInitAuth = () => {
    if (authDebounceTimer) clearTimeout(authDebounceTimer)
    authDebounceTimer = setTimeout(() => {
      initAuth()
    }, 300)
  }

  // Material for MkDocs navigation event
  document.addEventListener("DOMContentLoaded", debouncedInitAuth, {
    passive: true,
  })

  // For Material for MkDocs instant loading feature
  document.addEventListener("mdx-component-ready", debouncedInitAuth, {
    passive: true,
  })

  // Listen for Material for MkDocs navigation events
  document.addEventListener("navigation", debouncedInitAuth, { passive: true })

  // Additional event for Material for MkDocs content changes
  document.addEventListener("content-update", debouncedInitAuth, {
    passive: true,
  })
})
