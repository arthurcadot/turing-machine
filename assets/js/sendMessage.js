function sendMessage(message, time = 3, color = "red") {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className = `toast-message toast-${color}`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 500);
    }, time * 1000);
}
