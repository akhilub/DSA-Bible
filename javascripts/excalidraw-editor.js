// // Custom Excalidraw editor integration
// document.addEventListener('DOMContentLoaded', function() {
//     // Find all excalidraw images
//     const excalidrawImages = document.querySelectorAll('img[src*=".excalidraw"]');

//     excalidrawImages.forEach(function(img) {
//         // Create edit button
//         const editBtn = document.createElement('button');
//         editBtn.textContent = 'Edit Drawing';
//         editBtn.className = 'excalidraw-edit-btn';
//         editBtn.style.cssText = `
//             margin: 10px 0;
//             padding: 8px 16px;
//             background: #6366f1;
//             color: white;
//             border: none;
//             border-radius: 4px;
//             cursor: pointer;
//             font-size: 14px;
//         `;

//         // Insert edit button after the image
//         img.parentNode.insertBefore(editBtn, img.nextSibling);

//         editBtn.addEventListener('click', function() {
//             // Open Excalidraw in new window
//             const excalidrawUrl = 'https://excalidraw.com/';
//             window.open(excalidrawUrl, '_blank', 'width=1200,height=800');
//         });
//     });
// });
