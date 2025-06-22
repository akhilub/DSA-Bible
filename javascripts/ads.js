// Google AdSense Code Start - Will be controlled by JavaScript
document.addEventListener("DOMContentLoaded", () => {
  const loadAds = async () => {
    await waitForAuth0()
    const isAuthenticated = await auth0.isAuthenticated()
    if (!isAuthenticated) {
      const script = document.createElement("script")
      script.id = "adsense-script"
      script.async = true
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9017821190135650"
      script.crossOrigin = "anonymous"
      document.head.appendChild(script)
    } else {
      const hasSubscription = await checkSubscriptionStatus()
      if (!hasSubscription) {
        const script = document.createElement("script")
        script.id = "adsense-script"
        script.async = true
        script.src =
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9017821190135650"
        script.crossOrigin = "anonymous"
        document.head.appendChild(script)
      }
    }
  }
  loadAds()
})
// End Google AdSense Code
