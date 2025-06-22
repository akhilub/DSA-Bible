//But the ads may still render in pages that don’t trigger this renderContent (non-solution pages?).

// If you want to ensure ads removal universally across all pages (even /pricing/ or /index/ etc.)

// Function to wait for Auth0 to be ready
const waitForAuth0 = () => {
  return new Promise((resolve) => {
    const check = () => {
      if (auth0) resolve()
      else setTimeout(check, 100)
    }
    check()
  })
}

const controlAdsDisplay = async () => {
  await waitForAuth0()

  const isAuthenticated = await auth0.isAuthenticated()
  if (!isAuthenticated) return

  const hasSubscription = await checkSubscriptionStatus()
  console.log(
    "Ad check: isAuthenticated=",
    isAuthenticated,
    "hasSubscription=",
    hasSubscription
  )
  if (hasSubscription) {
    const adContainer = document.getElementById("ads-slot")
    if (adContainer) adContainer.remove()
  }
}

// run once per page
document.addEventListener("DOMContentLoaded", () => {
  controlAdsDisplay()
})
