// console.log('Smart highlight script loaded (deferred)');

const processSmartHighlights = () => {
  //console.log('Processing smart highlights...');

  const smartHighlights = document.querySelectorAll(".smart-highlight")
  //console.log('Found smart-highlight elements:', smartHighlights.length);

  if (smartHighlights.length === 0) {
    //console.log('No smart-highlight elements found yet');
    return false
  }

  smartHighlights.forEach((element, elementIndex) => {
    //console.log(`Processing element ${elementIndex}:`, element)

    const classes = element.className.split(" ")
    const groupMappings = []

    // Parse group-line mappings from class names
    classes.forEach((cls) => {
      const match = cls.match(/^g(\d+)-(\d+)-(\d+)$/)
      if (match) {
        const groupNum = parseInt(match[1])
        const startLine = parseInt(match[2])
        const endLine = parseInt(match[3])
        groupMappings.push({
          group: groupNum,
          start: startLine,
          end: endLine,
        })
        //console.log(`Found group mapping: g${groupNum} lines ${startLine}-${endLine}`)
      }
    })

    // Create a mapping of all group ranges to get the highlighted line numbers
    let allHighlightedLines = []
    groupMappings.forEach((mapping) => {
      for (let i = mapping.start; i <= mapping.end; i++) {
        allHighlightedLines.push(i)
      }
    })

    // Sort the line numbers
    allHighlightedLines.sort((a, b) => a - b)
    //console.log("All highlighted line numbers from groups:",allHighlightedLines)

    const highlightedLines = element.querySelectorAll(".highlight .hll")
    //console.log("Found highlighted lines:", highlightedLines.length)

    highlightedLines.forEach((line, index) => {
      const actualLineNumber = allHighlightedLines[index]
      //console.log(`Processing DOM line ${index + 1}, actual line number: ${actualLineNumber}`, line)

      // Check which group this actual line number belongs to
      groupMappings.forEach((mapping) => {
        if (
          actualLineNumber >= mapping.start &&
          actualLineNumber <= mapping.end
        ) {
          line.classList.add(`group-${mapping.group}`)
          //console.log(`Added group-${mapping.group} to actual line ${actualLineNumber} (DOM index ${index + 1})`)
        }
      })
    })
  })

  return true
}

// Debugging: Since script is deferred, try processing immediately
// if (processSmartHighlights()) {
//   //console.log("Smart highlights processed successfully")
// } else {
//   // If not found immediately, try a few more times
//   let attempts = 0
//   const maxAttempts = 5

//   const interval = setInterval(() => {
//     attempts++
//     //console.log(`Retry attempt ${attempts}`)

//     if (processSmartHighlights() || attempts >= maxAttempts) {
//       clearInterval(interval)
//       if (attempts >= maxAttempts) {
//         //console.log("Max attempts reached, smart highlights may not be present")
//       } else {
//         //console.log("Smart highlights processed successfully on retry")
//       }
//     }
//   }, 200)
// }

// Initialize on page load (script is deferred, so DOM is ready)
processSmartHighlights()

// Subscribe to MkDocs Material navigation events
if (
  typeof document$ !== "undefined" &&
  typeof document$.subscribe === "function"
) {
  document$.subscribe(() => {
    // Add small delay to ensure content is rendered
    setTimeout(() => {
      processSmartHighlights()
    }, 100)
  })
}
