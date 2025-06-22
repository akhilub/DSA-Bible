let adsInitialized = false // Flag to track if ads have been initialized

// === Ad Management Functions ===
// Function to show ads for non-authenticated or authenticated but non-paid users
const showAds = async () => {
  try {
    console.log("Showing ads...")

    // Show ad containers
    const adContainers = document.querySelectorAll(".ad-container")
    adContainers.forEach((container) => {
      container.style.display = "block"
    })

    // Initialize AdSense if not already done and script is loaded
    if (!adsInitialized && typeof adsbygoogle !== "undefined") {
      // Wait a bit for containers to be visible
      setTimeout(() => {
        const adElements = document.querySelectorAll(
          ".adsbygoogle:not([data-adsbygoogle-status])"
        )
        console.log(`Found ${adElements.length} uninitialized ad elements`)

        adElements.forEach((ad, index) => {
          try {
            console.log(`Initializing ad ${index + 1}`)
            ;(adsbygoogle = window.adsbygoogle || []).push({})
          } catch (e) {
            console.error(`Error initializing ad ${index + 1}:`, e)
          }
        })

        if (adElements.length > 0) {
          adsInitialized = true
        }
      }, 100)
    }
  } catch (error) {
    console.error("Error showing ads:", error)
  }
}

// Function to hide ads for authenticated and paid users
const hideAds = () => {
  console.log("Hiding ads...")

  // Hide all ad containers
  const adContainers = document.querySelectorAll(".ad-container")
  adContainers.forEach((container) => {
    container.style.display = "none"
  })
}

// Function to manage ad display based on authentication and subscription status
const manageAdDisplay = async (isAuthenticated) => {
  try {
    if (!isAuthenticated) {
      // User is not authenticated - show ads
      console.log("User not authenticated - showing ads")
      await showAds()
      return
    }

    // User is authenticated - check subscription status
    const hasSubscription = await checkSubscriptionStatus()

    if (hasSubscription) {
      // User is authenticated AND has active subscription - hide ads
      console.log("User has subscription - hiding ads")
      hideAds()
    } else {
      // User is authenticated but no active subscription - show ads
      console.log("User authenticated but no subscription - showing ads")
      await showAds()
    }
  } catch (error) {
    console.error("Error managing ad display:", error)
    // Default to showing ads on error
    await showAds()
  }
}
