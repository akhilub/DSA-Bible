// Store original annotation positions
let originalAnnotationPositions = new Map()

// Function to store original annotation positions
export const storeOriginalAnnotationPositions = () => {
  const annotations = document.querySelectorAll(".md-annotation")

  annotations.forEach((annotation, index) => {
    // ✅ Try getComputedStyle first (more reliable)
    const computedStyle = getComputedStyle(annotation)
    let tooltipX = computedStyle.getPropertyValue("--md-tooltip-x").trim()
    let tooltipY = computedStyle.getPropertyValue("--md-tooltip-y").trim()

    // ✅ Only store if we have valid values (not empty strings)
    if (tooltipX && tooltipY) {
      const annotationId =
        annotation
          .querySelector("[data-md-annotation-id]")
          ?.getAttribute("data-md-annotation-id") || index
      originalAnnotationPositions.set(annotationId, {
        x: tooltipX,
        y: tooltipY,
      })
    }
  })

  console.log(`Stored ${originalAnnotationPositions.size} annotation positions`)
}

// Function to restore original annotation positions
export const restoreOriginalAnnotationPositions = () => {
  const annotations = document.querySelectorAll(".md-annotation")

  annotations.forEach((annotation, index) => {
    const annotationId =
      annotation
        .querySelector("[data-md-annotation-id]")
        ?.getAttribute("data-md-annotation-id") || index
    const originalPosition = originalAnnotationPositions.get(annotationId)

    if (originalPosition && originalPosition.x && originalPosition.y) {
      annotation.style.setProperty("--md-tooltip-x", originalPosition.x)
      annotation.style.setProperty("--md-tooltip-y", originalPosition.y)
    }
  })

  console.log(
    `Restored ${originalAnnotationPositions.size} annotation positions`
  )
}

// Manual annotation click handler that mimics Material's behavior
export const initializeAnnotationClickHandlers = (container) => {
  const annotations = container.querySelectorAll(".md-annotation")

  annotations.forEach((annotation) => {
    const index = annotation.querySelector(".md-annotation__index")
    const tooltip = annotation.querySelector(".md-tooltip")

    if (index && tooltip) {
      // Remove existing listeners
      index.replaceWith(index.cloneNode(true))
      const newIndex = annotation.querySelector(".md-annotation__index")

      // Add click handler
      newIndex.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()

        // Toggle visibility
        const isVisible = annotation.hasAttribute("data-md-visible")

        // Hide all other annotations first
        container
          .querySelectorAll(".md-annotation[data-md-visible]")
          .forEach((el) => {
            if (el !== annotation) {
              el.removeAttribute("data-md-visible")
              const elTooltip = el.querySelector(".md-tooltip")
              if (elTooltip) {
                elTooltip.classList.remove("md-tooltip--active")
              }
            }
          })

        // Toggle current annotation
        if (isVisible) {
          annotation.removeAttribute("data-md-visible")
          tooltip.classList.remove("md-tooltip--active")
        } else {
          annotation.setAttribute("data-md-visible", "")
          tooltip.classList.add("md-tooltip--active")

          // ✅ No need to calculate position - it's already stored in CSS variables
        }
      })

      // Add keyboard handler
      newIndex.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          newIndex.click()
        }
      })
    }
  })

  //console.log(`Initialized ${annotations.length} annotation click handlers`)
}
