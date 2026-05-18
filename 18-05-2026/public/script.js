const caixaTexto = document.getElementById('caixa-texto');
const btnSalvar = document.getElementById('btn-salvar');
const statusTexto = document.getElementById('status');
const listaNotas = document.getElementById('lista-notas');

// Variável para guardar o ID da nota se estivermos editando
let idNotaEditando = null;

// Carrega as notas assim que a página abre
window.addEventListener('DOMContentLoaded', carregarNotas);

async function carregarNotas() {
    try {
        const resposta = await fetch('/api/notas');
        const notas = await resposta.json();
        renderizarNotas(notas);
    } catch (erro) {
        console.error('Erro ao carregar notas:', erro);
    }
}

function renderizarNotas(notas) {
    listaNotas.innerHTML = ''; // Limpa a lista atual

    if (notas.length === 0) {
        listaNotas.innerHTML = '<p style="color: #999;">Nenhuma nota salva ainda.</p>';
        return;
    }

    notas.forEach(nota => {
        const divNota = document.createElement('div');
        divNota.className = 'nota-item';
        
        divNota.innerHTML = `
            <div class="nota-texto">${nota.texto}</div>
            <div class="nota-acoes">
                <button class="btn-editar" onclick="prepararEdicao('${nota.id}', \`${nota.texto.replace(/`/g, '\\`')}\`)">Editar</button>
                <button class="btn-excluir" onclick="excluirNota('${nota.id}')"> Excluir</button>
            </div>
        `;
        listaNotas.appendChild(divNota);
    });
}

// Salva ou Atualiza uma nota
btnSalvar.addEventListener('click', async () => {
    const texto = caixaTexto.value.trim();
    if (!texto) {
        statusTexto.textContent = "⚠️ Digite algo antes de salvar.";
        return;
    }

    statusTexto.textContent = "Salvando...";

    try {
        let url = '/api/notas';
        let method = 'POST'; // Padrão é criar (POST)

        // Se tivermos um ID salvo, significa que estamos editando (PUT)
        if (idNotaEditando) {
            url = `/api/notas/${idNotaEditando}`;
            method = 'PUT';
        }

        const resposta = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ texto })
        });

        if (resposta.ok) {
            caixaTexto.value = ''; // Limpa a caixa
            idNotaEditando = null; // Reseta o estado de edição
            btnSalvar.textContent = "Adicionar Nota"; // Volta o botão ao normal
            statusTexto.textContent = "✅ Salvo com sucesso!";
            setTimeout(() => statusTexto.textContent = "", 2000);
            
            carregarNotas(); // Recarrega a lista
        }
    } catch (erro) {
        statusTexto.textContent = "❌ Erro ao salvar.";
        console.error(erro);
    }
});

// Joga o texto da nota para a caixa de texto para ser modificado
window.prepararEdicao = (id, texto) => {
    caixaTexto.value = texto;
    idNotaEditando = id;
    btnSalvar.textContent = "Atualizar Nota"; // Muda o texto do botão para fazer sentido
    caixaTexto.focus();
};

// Deleta a nota
window.excluirNota = async (id) => {
    if (!confirm("Tem certeza que deseja excluir esta nota?")) return;

    try {
        const resposta = await fetch(`/api/notas/${id}`, {
            method: 'DELETE'
        });

        if (resposta.ok) {
            carregarNotas(); // Recarrega a lista após excluir
        }
    } catch (erro) {
        console.error('Erro ao excluir nota:', erro);
    }
};