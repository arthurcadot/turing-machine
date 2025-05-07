document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".col-9 span").forEach(span => {
        span.addEventListener("click", () => {
            if (span.classList.contains("croix")) {
                span.classList.remove("croix");
                span.classList.add("valide");
                span.textContent = "✔";
            } else if (span.classList.contains("valide")) {
                span.classList.remove("valide");
                span.textContent = "";
            } else {
                span.classList.add("croix");
            }
        });
    });
    
    document.querySelectorAll(".row:not(:first-child) .col-3").forEach(col => {
        col.addEventListener("click", () => {
            if (col.classList.contains("barre")) {
                col.classList.remove("barre");
                col.classList.add("circle");
            } else if (col.classList.contains("circle")) {
                col.classList.remove("circle");
            } else {
                col.classList.add("barre");
            }
        });
    });

    let selectedCell = null;
    const fenetre = document.querySelector(".fenetre");

    document.querySelectorAll(".row-case .col-9:nth-child(-n+3)").forEach(cell => {
        cell.addEventListener("click", function () {
            selectedCell = this;
            fenetre.classList.add("visible");
        });
    });

    document.querySelectorAll(".fenetre span[id]").forEach(span => {
        span.addEventListener("click", function () {
            if (!selectedCell) return;

            if (this.id === "zero") {
                selectedCell.textContent = "";
            } else if (this.id !== "croix") {
                selectedCell.textContent = this.id;
            }

            fenetre.classList.remove("visible");
            selectedCell = null;
        });
    });

    document.getElementById("croix").addEventListener("click", function () {
        fenetre.classList.remove("visible");
    });

    document.querySelectorAll("textarea").forEach(textarea => {
        textarea.addEventListener("input", function () {
            this.value = this.value
                .replace(/\[/g, "▲")
                .replace(/\|/g, "🟣")
                .replace(/"/g, "🟨");
        });
    });
});