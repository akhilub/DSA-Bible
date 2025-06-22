//But the ads may still render in pages that don’t trigger this renderContent (non-solution pages?).

// If you want to ensure ads removal universally across all pages (even /pricing/ or /index/ etc.)

// Function to wait for Auth0 to be ready
const waitForAuth0 = () => {
  return new Promise((resolve) => {
    const check = () => {
      if (auth0) resolve()
      else setTimeout(check, 100) // Check every 100ms
    }
    check()
  })
}

const controlAdsDisplay = async () => {
  await waitForAuth0() // Wait until Auth0 is fully initialized

  const isAuthenticated = await auth0.isAuthenticated()
  if (!isAuthenticated) return

  const hasSubscription = await checkSubscriptionStatus()
  if (hasSubscription) {
    console.log(
      "Ad check: isAuthenticated=",
      isAuthenticated,
      "hasSubscription=",
      hasSubscription
    )
    const adContainer = document.getElementById("ads-slot")
    if (adContainer) {
      adContainer.remove() // Remove ads for authenticated paid users
    }
  }
}

if (
  typeof document$ !== "undefined" &&
  typeof document$.subscribe === "function"
) {
  document$.subscribe(function () {
    // Remove ads for paid users before rendering new content
    setTimeout(() => {
      controlAdsDisplay
    }, 100)
  })
}
