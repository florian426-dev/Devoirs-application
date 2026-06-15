
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#commentForm");
    const nameInput = document.querySelector("#name");
    const commentInput = document.querySelector("#comment");

    const commentsContainer = document.querySelector("#comments");
    const errorBox = document.querySelector("#error");

    let comments = [
        {
            id: 1,
            author: "Téo",
            message: "Superbe recette !"
        },
        {
            id: 2,
            author: "Léa",
            message: "Test de commentaire"
        }
    ];

    function showError(message) {
        errorBox.textContent = message;
        errorBox.style.display = "block";
    }

    function hideError() {
        errorBox.style.display = "none";
    }

    function renderComments() {
        commentsContainer.innerHTML = "";

        comments.forEach(comment => {
            const card = document.createElement("div");
            card.classList.add("comment");

            card.innerHTML = `
                <h4>${comment.author}</h4>
                <p>${comment.message}</p>
                <button class="delete-btn" data-id="${comment.id}">
                    🗑️ Supprimer
                </button>
            `;

            commentsContainer.appendChild(card);
        });

        addDeleteEvents();
    }

    function addDeleteEvents() {
        const buttons = document.querySelectorAll(".delete-btn");

        buttons.forEach(button => {
            button.addEventListener("click", () => {
                const id = Number(button.dataset.id);

                comments = comments.filter(
                    comment => comment.id !== id
                );

                renderComments();
            });
        });
    }

    function validateForm(name, message) {
        if (name.trim().length < 2) {
            showError(
                "Le nom doit contenir au moins 2 caractères."
            );
            return false;
        }

        if (message.trim().length < 10) {
            showError(
                "Le commentaire doit contenir au moins 10 caractères."
            );
            return false;
        }

        hideError();
        return true;
    }

    form.addEventListener("submit", event => {
        event.preventDefault();

        const name = nameInput.value;
        const message = commentInput.value;

        const isValid = validateForm(name, message);

        if (!isValid) return;

        const newComment = {
            id: Date.now(),
            author: name.trim(),
            message: message.trim()
        };

        comments.unshift(newComment);

        renderComments();

        form.reset();
    });

    renderComments();
});