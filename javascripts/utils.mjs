// Manual annotation click handler that mimics Material's behavior
export const initializeAnnotationClickHandlers = (container) => {
  const annotations = container.querySelectorAll('.md-annotation')
  
  annotations.forEach(annotation => {
    const index = annotation.querySelector('.md-annotation__index')
    const tooltip = annotation.querySelector('.md-tooltip')
    
    if (index && tooltip) {
      // Remove existing listeners
      index.replaceWith(index.cloneNode(true))
      const newIndex = annotation.querySelector('.md-annotation__index')
      
      // Add click handler
      newIndex.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        // Toggle visibility
        const isVisible = annotation.hasAttribute('data-md-visible')
        
        // Hide all other annotations first
        container.querySelectorAll('.md-annotation[data-md-visible]').forEach(el => {
          if (el !== annotation) {
            el.removeAttribute('data-md-visible')
            const elTooltip = el.querySelector('.md-tooltip')
            if (elTooltip) {
              elTooltip.classList.remove('md-tooltip--active')
            }
          }
        })
        
        // Toggle current annotation
        if (isVisible) {
          annotation.removeAttribute('data-md-visible')
          tooltip.classList.remove('md-tooltip--active')
        } else {
          annotation.setAttribute('data-md-visible', '')
          tooltip.classList.add('md-tooltip--active')
          
          // Do not Calculate position 
        }
      })
      
      // Add keyboard handler
      newIndex.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          newIndex.click()
        }
      })
    }
  })
  
  //console.log(`Initialized ${annotations.length} annotation click handlers`)
}