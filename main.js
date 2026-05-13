// Function to handle tool clicks
function startFeature(featureName) {
    console.log("Starting:", featureName);
    
    switch(featureName) {
        case 'research':
            alert("Opening Deep Research AI...");
            // Link to your AI research page here
            break;
        case 'summary':
            alert("Upload your PDF or Image for summary.");
            // Trigger a file input here
            break;
        case 'cbt':
            alert("Entering JAMB/WAEC CBT Mode...");
            break;
        case 'membership':
            alert("Redirecting to Pro Pass Payment...");
            break;
        default:
            alert("Feature coming soon!");
    }
}

// Logic to dynamically update user name (after they login)
document.addEventListener("DOMContentLoaded", () => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
        document.getElementById("userName").innerText = savedName;
    }
});