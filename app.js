const gitHubForm = document.getElementById('gitHubForm');

gitHubForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let username = document.getElementById('usernameInput').value;
    let repo = document.getElementById('repoInput').value;

    const container = document.getElementById('userRepos');
    container.innerHTML = ''; // limpa resultados anteriores

    const url = `https://api.github.com/repos/${username}/${repo}/commits`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar commits. Verifique usuário ou repositório.");
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                container.innerHTML = `
                    <div class="alert alert-info text-center" role="alert">
                        Nenhum commit encontrado.
                    </div>`;
            } else {
                data.forEach(commit => {
                    const message = commit.commit.message;
                    const author = commit.commit.author.name;
                    const date = new Date(commit.commit.author.date).toLocaleString();

                    const card = document.createElement('div');
                    card.classList.add('card');

                    card.innerHTML = `
                        <div class="card-body">
                            <h5 class="card-title">${message}</h5>
                            <p class="card-text"><strong>Autor:</strong> ${author}</p>
                            <p class="card-text"><strong>Data:</strong> ${date}</p>
                        </div>
                    `;

                    container.appendChild(card);
                });
            }
        })
        .catch(error => {
            container.innerHTML = `
                <div class="alert alert-danger text-center" role="alert">
                    ${error.message}
                </div>`;
        });
});