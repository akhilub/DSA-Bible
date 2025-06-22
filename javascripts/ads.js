//But the ads may still render in pages that don’t trigger this renderContent (non-solution pages?).

// If you want to ensure ads removal universally across all pages (even /pricing/ or /index/ etc.)

document.addEventListener("DOMContentLoaded", async () => {
  if (!auth0) return

  const isAuthenticated = await auth0.isAuthenticated()
  if (!isAuthenticated) return

  // Check subscription status for authenticated users
  const hasSubscription = await checkSubscriptionStatus()

  if (isAuthenticated && hasSubscription) {
    const adContainer = document.getElementById("ads-slot")
    if (adContainer) adContainer.remove()
  }
})
