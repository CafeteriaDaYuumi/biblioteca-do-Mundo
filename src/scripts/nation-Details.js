/* =========================================================
   INICIALIZAÇÃO DA PÁGINA
   ========================================================= */

document.addEventListener("DOMContentLoaded", iniciarPagina);

async function iniciarPagina() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        mostrarErro("Nenhuma nação foi informada na URL. Use ?id=urid.");
        return;
    }

    // Impede que o parâmetro seja usado para navegar por pastas.
    if (!/^[a-zA-Z0-9_-]+$/.test(id)) {
        mostrarErro("O identificador da nação contém caracteres inválidos.");
        return;
    }

    try {
        const caminhoJSON =
            `../../../src/data/world/nation/${encodeURIComponent(id)}.json`;

        const resposta = await fetch(caminhoJSON, {
            cache: "no-cache"
        });

        if (!resposta.ok) {
            throw new Error(
                `Não foi possível carregar ${caminhoJSON} (HTTP ${resposta.status}).`
            );
        }

        const nacao = await resposta.json();

        if (!nacao || !nacao.identificacao || !nacao.identificacao.nome) {
            throw new Error(
                "O JSON não possui a estrutura esperada para uma ficha de nação."
            );
        }

        renderizarPagina(nacao);

    } catch (erro) {
        mostrarErro(
            "Não foi possível carregar a ficha da nação. " +
            "Verifique o caminho do JSON e execute o site por um servidor local."
        );

        console.error("Erro ao carregar a ficha da nação:", erro);
    }
}


/* =========================================================
   RENDERIZAÇÃO PRINCIPAL
   ========================================================= */

function renderizarPagina(nacao) {
    document.title = `${nacao.identificacao.nome} | Biblioteca do Mundo`;

    renderizarMidiaTopo(nacao.midiaTopo);
    renderizarIdentificacao(nacao);
    renderizarFontes(nacao);
    renderizarResumo(nacao.resumo);
    renderizarEstatisticas(nacao.estatisticas);
    renderizarIndice(nacao.secoes);
    renderizarCronologia(nacao.cronologia);
    renderizarCitacoes(nacao.citacoes);
    renderizarSecoes(nacao.secoes);
    renderizarVideoFinal(nacao.videoAntesDasConexoes);
    renderizarRelacionados(nacao.relacionados);
    renderizarGaleria(nacao.galeria);
}


/* =========================================================
   MÍDIA DE TOPO
   ========================================================= */

function renderizarMidiaTopo(midia) {
    const container = document.getElementById("midiaTopo");

    if (!container) return;

    if (!midia) return;

    if (midia.youtube) {
        container.innerHTML = `
            <iframe
                src="${formatarYoutube(midia.youtube)}"
                title="Vídeo da nação"
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen>
            </iframe>
            <div class="sombra-hero"></div>
        `;
        return;
    }

    if (midia.videoLocal) {
        container.innerHTML = `
            <video autoplay muted loop playsinline>
                <source src="${midia.videoLocal}" type="video/mp4">
            </video>
            <div class="sombra-hero"></div>
        `;
        return;
    }

    if (midia.imagemCapa) {
        container.innerHTML = `
            <img src="${midia.imagemCapa}" alt="">
            <div class="sombra-hero"></div>
        `;
        return;
    }

    container.innerHTML = `<div class="sombra-hero"></div>`;
}


/* =========================================================
   IDENTIFICAÇÃO
   ========================================================= */

function renderizarIdentificacao(nacao) {
    const container = document.getElementById("identificacao");

    if (!container) return;

    const info = nacao.identificacao;

    container.innerHTML = `
        <span class="categoria-registro">${info.categoria || ""}</span>

        <div class="codigo-registro">${info.codigo || ""}</div>

        <h1>${info.nome || ""}</h1>

        <p>${info.subtitulo || ""}</p>

        <div class="tags-registro">
            ${(nacao.tags || []).map(tag => `<span>${tag}</span>`).join("")}
        </div>
    `;
}


/* =========================================================
   FONTES E VERSÃO
   ========================================================= */

function renderizarFontes(nacao) {
    const container = document.getElementById("fontes");

    if (!container) return;

    const fontes = nacao.fontes || [];
    const versao = nacao.versao || {};

    container.innerHTML = `
        <div class="cabecalho-secao">
            <span>Origem do Registro</span>
            <h2>Fontes e Integridade</h2>
        </div>

        <div class="grade-fontes">
            ${fontes.map(fonte => `
                <article class="cartao-fonte">
                    <h3>${fonte.tipo || ""}</h3>
                    <p><strong>Integridade:</strong> ${fonte.integridade || ""}</p>
                    <p><strong>Origem:</strong> ${fonte.origem || ""}</p>
                </article>
            `).join("")}

            <article class="cartao-fonte">
                <h3>Versão</h3>
                <p><strong>Criado:</strong> ${versao.criado || ""}</p>
                <p><strong>Atualizado:</strong> ${versao.atualizado || ""}</p>
                <p><strong>Versão:</strong> ${versao.versao || ""}</p>
            </article>
        </div>
    `;
}


/* =========================================================
   RESUMO
   ========================================================= */

function renderizarResumo(resumo) {
    const container = document.getElementById("resumo");

    if (!container || !resumo) return;

    const midia = resumo.midia || {};
    const campos = resumo.campos || [];

    container.innerHTML = `
        <div class="imagem-resumo">
            ${midia.src
            ? `<img src="${midia.src}" alt="${midia.alt || ""}">`
            : ""}
        </div>

        <aside class="painel-resumo">
            <h2>Registro Nacional</h2>

            <ul>
                ${campos.map(campo => `
                    <li>
                        <strong>${campo.rotulo || ""}:</strong>
                        ${campo.valor || ""}
                    </li>
                `).join("")}
            </ul>
        </aside>
    `;
}


/* =========================================================
   ESTATÍSTICAS
   ========================================================= */

function renderizarEstatisticas(estatisticas) {
    const container = document.getElementById("estatisticas");

    if (!container || !estatisticas) return;

    container.innerHTML = `
        <h2>${estatisticas.titulo || ""}</h2>

        <div class="grade-estatisticas">
            ${(estatisticas.indicadores || []).map(item => `
                <article class="cartao-estatistica">
                    <span>${item.pontuacao || ""}</span>
                    <h3>${item.indicador || ""}</h3>
                    <p>${item.notas || ""}</p>
                </article>
            `).join("")}
        </div>
    `;
}


/* =========================================================
   ÍNDICE DE SEÇÕES
   ========================================================= */

function renderizarIndice(secoes) {
    const container = document.getElementById("indice");

    if (!container) return;

    if (!secoes || secoes.length === 0) {
        container.remove();
        return;
    }

    container.innerHTML = secoes.map(secao => `
        <a href="#${secao.id}">
            ${secao.icone || ""} ${secao.titulo || ""}
        </a>
    `).join("");
}


/* =========================================================
   CRONOLOGIA
   ========================================================= */

function renderizarCronologia(cronologia) {
    const container = document.getElementById("cronologia");

    if (!container) return;

    // Ignora strings vazias e itens sem ano ou evento.
    const itens = (Array.isArray(cronologia) ? cronologia : [])
        .filter(item =>
            item &&
            typeof item === "object" &&
            (item.ano || item.evento)
        );

    if (itens.length === 0) {
        container.remove();
        return;
    }

    container.innerHTML = `
        <div class="cabecalho-secao">
            <span>Linha Temporal</span>
            <h2>Cronologia</h2>
        </div>

        <div class="linha-tempo">
            ${itens.map(item => `
                <article class="item-cronologia">
                    <span>${item.ano || ""}</span>
                    <p>${item.evento || ""}</p>
                </article>
            `).join("")}
        </div>
    `;
}


/* =========================================================
   CITAÇÕES
   ========================================================= */

function renderizarCitacoes(citacoes) {
    const container = document.getElementById("citacoes");

    if (!container) return;

    if (!citacoes || citacoes.length === 0) {
        container.remove();
        return;
    }

    container.innerHTML = `
        <div class="cabecalho-secao">
            <span>Memória Preservada</span>
            <h2>Citações</h2>
        </div>

        <div class="grade-citacoes">
            ${citacoes.map(citacao => `
                <blockquote class="cartao-citacao">
                    <p>“${citacao.texto || ""}”</p>
                    <cite>${citacao.autor || ""}</cite>
                </blockquote>
            `).join("")}
        </div>
    `;
}



/* =========================================================
   RENDERIZAÇÃO DE SEÇÕES E PERÍODOS HISTÓRICOS
   ========================================================= */

function renderizarSecoes(secoes) {
    const container = document.getElementById("secoes");

    if (!container) return;

    container.innerHTML = (secoes || []).map(secao => {
        let conteudoSecao = "";

        /*
         * PERÍODOS HISTÓRICOS
         * Estrutura esperada:
         * secao.periodos[]
         * - tipo
         * - periodo
         * - conteudo
         * - eventos[]
         */

        if (Array.isArray(secao.periodos) && secao.periodos.length > 0) {
            conteudoSecao += `
                <div class="lista-periodos">
                    ${secao.periodos.map(periodo => `
                        <article class="cartao-periodo">
                            <header class="cabecalho-periodo">
                                <h3>${periodo.tipo || "Período histórico"}</h3>
                                <span class="data-periodo">
                                    ${periodo.periodo || ""}
                                </span>
                            </header>

                            <div class="conteudo-periodo">
                                ${periodo.conteudo
                    ? formatarTexto(periodo.conteudo)
                    : ""}
                            </div>

                            ${Array.isArray(periodo.eventos) &&
                    periodo.eventos.length > 0
                    ? `
                                    <div class="eventos-periodo">
                                        <h4>Eventos históricos</h4>

                                        <div class="linha-tempo">
                                            ${periodo.eventos.map(evento => `
                                                <article class="item-cronologia">
                                                    <span>${evento.data || ""}</span>
                                                    <h5>${evento.titulo || ""}</h5>
                                                    <p>${evento.descricao || ""}</p>
                                                </article>
                                            `).join("")}
                                        </div>
                                    </div>
                                `
                    : ""
                }
                        </article>
                    `).join("")}
                </div>
            `;
        }

        /*
         * SUBSEÇÕES TRADICIONAIS
         */

        const subsecoes = (secao.subsecoes || []).map(subsecao => {
            let conteudoHTML = "";

            if (subsecao.blocos && subsecao.blocos.length > 0) {
                if (subsecao.id === "resumo-historico") {
                    conteudoHTML += `
            <div class="resumo-historico">
                ${subsecao.blocos.map(bloco => `
                    <div class="item-historico">
                        ${bloco.tipo
                            ? `<h4>${bloco.tipo}</h4>`
                            : ""}
                        ${formatarTexto(bloco.conteudo || "")}
                    </div>
                `).join("")}
            </div>
        `;
                } else {
                    conteudoHTML += renderizarBlocos(subsecao.blocos);
                }
            }
            if (subsecao.texto && subsecao.texto.trim() !== "") {
                conteudoHTML += `
                    <div class="bloco-texto">
                        ${formatarTexto(subsecao.texto)}
                    </div>
                `;
            }

            if (subsecao.conteudo && subsecao.conteudo.trim() !== "") {
                conteudoHTML += `
                    <div class="bloco-texto">
                        ${formatarTexto(subsecao.conteudo)}
                    </div>
                `;
            }

            if (subsecao.faccoes && subsecao.faccoes.length > 0) {
                conteudoHTML += `
                    <div class="lista-faccoes">
                        ${subsecao.faccoes.map(faccao => `
                            <div class="cartao-faccao">
                                ${faccao.titulo
                        ? `<h4>${faccao.titulo}</h4>`
                        : ""}

                                ${faccao.descricao
                        ? `<p>${faccao.descricao}</p>`
                        : ""}
                            </div>
                        `).join("")}
                    </div>
                `;
            }

            /*
             * Algumas subseções também podem conter períodos.
             */
            if (Array.isArray(subsecao.periodos) && subsecao.periodos.length > 0) {
                conteudoHTML += `
                    <div class="lista-periodos">
                        ${subsecao.periodos.map(periodo => `
                            <article class="cartao-periodo">
                                <h4>${periodo.tipo || "Período histórico"}</h4>
                                <span class="data-periodo">${periodo.periodo || ""}</span>

                                ${periodo.conteudo
                        ? formatarTexto(periodo.conteudo)
                        : ""}

                                ${Array.isArray(periodo.eventos) &&
                        periodo.eventos.length > 0
                        ? `
                                        <div class="eventos-periodo">
                                            ${periodo.eventos.map(evento => `
                                                <article class="item-cronologia">
                                                    <span>${evento.data || ""}</span>
                                                    <h5>${evento.titulo || ""}</h5>
                                                    <p>${evento.descricao || ""}</p>
                                                </article>
                                            `).join("")}
                                        </div>
                                    `
                        : ""
                    }
                            </article>
                        `).join("")}
                    </div>
                `;
            }

            if (!conteudoHTML) {
                conteudoHTML = `
                    <p class="sem-conteudo">
                        Nenhuma informação registrada.
                    </p>
                `;
            }

            return `
                <section class="subsecao-nacao" id="${subsecao.id || ""}">
                    <h3>${subsecao.titulo || ""}</h3>
                    ${conteudoHTML}
                </section>
            `;
        }).join("");

        return `
            <article class="secao-nacao" id="${secao.id || ""}">
                <header class="titulo-secao-nacao">
                    <span>${secao.icone || ""} Registro</span>
                    <h2>${secao.titulo || ""}</h2>
                </header>

                ${conteudoSecao}
                ${subsecoes}
            </article>
        `;
    }).join("");
}




/* =========================================================
   BLOCOS INTERNOS
   ========================================================= */

function renderizarBlocos(blocos) {
    return blocos.map(bloco => {
        const tipo = bloco.tipo || "";

        if (tipo === "texto" || tipo === "Resumo") {
            return `
                <div class="bloco-texto">
                    ${formatarTexto(bloco.conteudo || "")}
                </div>
            `;
        }

        if (tipo === "lista") {
            return `
                <ul class="bloco-lista">
                    ${(bloco.itens || []).map(item => `<li>${item}</li>`).join("")}
                </ul>
            `;
        }

        if (tipo === "citacao") {
            return `
                <blockquote class="bloco-citacao">
                    <p>${bloco.texto || ""}</p>
                    <cite>${bloco.autor || ""}</cite>
                </blockquote>
            `;
        }

        if (tipo === "imagem") {
            return `
                <figure class="bloco-imagem">
                    <img src="${bloco.src || ""}" alt="${bloco.alt || ""}">
                    ${bloco.legenda
                    ? `<figcaption>${bloco.legenda}</figcaption>`
                    : ""}
                </figure>
            `;
        }

        if (tipo === "tabela") {
            return renderizarTabela(bloco);
        }

        if (tipo === "comparacao") {
            return renderizarComparacao(bloco);
        }

        if (bloco.titulo || bloco.descricao || bloco.conteudo) {
            const descricao = bloco.descricao || bloco.conteudo || "";

            return `
                <div class="bloco-cartao">
                    ${bloco.titulo ? `<h4>${bloco.titulo}</h4>` : ""}
                    ${descricao
                    ? `<p>${formatarTexto(descricao)}</p>`
                    : ""}
                </div>
            `;
        }

        return "";
    }).join("");
}


/* =========================================================
   TABELAS
   ========================================================= */

function renderizarTabela(bloco) {
    const colunas = bloco.colunas || [];
    const linhas = bloco.linhas || [];

    if (colunas.length === 0) return "";

    const cabecalho = `
        <thead>
            <tr>
                ${colunas.map(col => `<th>${col}</th>`).join("")}
            </tr>
        </thead>
    `;

    const corpo = linhas.length > 0
        ? `
            <tbody>
                ${linhas.map(linha => {
            const celulas = Array.isArray(linha)
                ? linha
                : Object.values(linha);

            return `
                        <tr>
                            ${celulas.map(cel => `<td>${cel}</td>`).join("")}
                        </tr>
                    `;
        }).join("")}
            </tbody>
        `
        : "";

    return `
        <div class="bloco-tabela">
            ${bloco.titulo ? `<h4>${bloco.titulo}</h4>` : ""}

            <table>
                ${cabecalho}
                ${corpo}
            </table>
        </div>
    `;
}


/* =========================================================
   COMPARAÇÕES
   ========================================================= */

function renderizarComparacao(bloco) {
    const ladoA = bloco.ladoA || {};
    const ladoB = bloco.ladoB || {};

    return `
        <div class="bloco-comparacao">
            ${bloco.titulo ? `<h4>${bloco.titulo}</h4>` : ""}

            <div class="comparacao-lados">
                <div class="lado-a">
                    <h5>${ladoA.titulo || "Lado A"}</h5>

                    ${ladoA.descricao
            ? `<p>${ladoA.descricao}</p>`
            : ""}

                    ${ladoA.itens
            ? `<ul>${ladoA.itens.map(i => `<li>${i}</li>`).join("")}</ul>`
            : ""}
                </div>

                <div class="lado-b">
                    <h5>${ladoB.titulo || "Lado B"}</h5>

                    ${ladoB.descricao
            ? `<p>${ladoB.descricao}</p>`
            : ""}

                    ${ladoB.itens
            ? `<ul>${ladoB.itens.map(i => `<li>${i}</li>`).join("")}</ul>`
            : ""}
                </div>
            </div>
        </div>
    `;
}


/* =========================================================
   VÍDEO FINAL
   ========================================================= */

function renderizarVideoFinal(video) {
    const container = document.getElementById("videoAntesDasConexoes");

    if (!container) return;

    if (!video || (!video.youtube && !video.videoLocal)) {
        container.remove();
        return;
    }

    container.innerHTML = `
        <div class="cabecalho-secao">
            <span>Registro Visual</span>
            <h2>${video.titulo || ""}</h2>
            <p>${video.descricao || ""}</p>
        </div>

        <div class="player-video">
            ${video.youtube
            ? `<iframe src="${formatarYoutube(video.youtube)}" frameborder="0" allowfullscreen></iframe>`
            : `
                    <video controls poster="${video.imagemCapa || ""}">
                        <source src="${video.videoLocal}" type="video/mp4">
                    </video>
                `
        }
        </div>
    `;
}


/* =========================================================
   RELACIONADOS / CONEXÕES
   ========================================================= */

function renderizarRelacionados(relacionados) {
    const container = document.getElementById("relacionados");

    if (!container) return;

    if (!relacionados) {
        container.remove();
        return;
    }

    const grupos = Object.entries(relacionados).filter(
        ([, itens]) => Array.isArray(itens) && itens.length > 0
    );

    if (grupos.length === 0) {
        container.remove();
        return;
    }

    container.innerHTML = `
        <div class="cabecalho-secao">
            <span>Conexões</span>
            <h2>Notas e Conexões</h2>
        </div>

        ${grupos.map(([tipo, itens]) => `
            <div class="grupo-relacionados">
                <h3>${formatarTitulo(tipo)}</h3>

                <div class="lista-relacionados ${itens.length > 4 ? "carrossel" : ""}">
                    ${itens.map(item => criarCardRelacionado(tipo, item)).join("")}
                </div>
            </div>
        `).join("")}
    `;
}


function criarCardRelacionado(tipo, item) {
    const id = typeof item === "string" ? item : item.id;

    const nome = typeof item === "string"
        ? formatarTitulo(item)
        : item.nome;

    const url = typeof item === "object" && item.url
        ? item.url
        : gerarLinkRelacionado(tipo, id);

    return `
        <a href="${url}" class="cartao-relacionado">
            <div>
                <span>${formatarTitulo(tipo)}</span>
                <h4>${nome}</h4>
            </div>
        </a>
    `;
}


/* Gera o link correto para cada tipo de entidade relacionada. */
function gerarLinkRelacionado(tipo, id) {
    const rotas = {
        personagens: "../characters/character-detail.html",
        organizacoes: "../characters/organization-detail.html",
        localizacoes: "location-detail.html",
        equipamentos: "../equipment/equipment-detail.html",
        eventos: "../narratives/event-detail.html",
        documentos: "../archives/document-detail.html",
        tecnologias: "../archives/technology-detail.html",
        historias: "../narratives/story-detail.html",
        contos: "../narratives/tale-detail.html"
    };

    const pagina = rotas[tipo] || "#";

    return `${pagina}?id=${encodeURIComponent(id)}`;
}


/* =========================================================
   GALERIA
   ========================================================= */

function renderizarGaleria(galeria) {
    const container = document.getElementById("galeria");

    if (!container) return;

    if (!galeria || !galeria.imagens || galeria.imagens.length === 0) {
        container.remove();
        return;
    }

    container.innerHTML = `
        <div class="cabecalho-secao">
            <span>Galeria</span>
            <h2>${galeria.titulo || ""}</h2>
            <p>${galeria.descricao || ""}</p>
        </div>

        <div class="grade-galeria">
            ${galeria.imagens.map(imagem => `
                <figure class="item-galeria">
                    ${imagem.src
            ? `<img src="${imagem.src}" alt="${imagem.alt || ""}">`
            : ""}

                    ${imagem.legenda
            ? `<figcaption>${imagem.legenda}</figcaption>`
            : ""}
                </figure>
            `).join("")}
        </div>
    `;
}


/* =========================================================
   FORMATAÇÃO DE TEXTO
   ========================================================= */

function formatarTexto(texto) {
    if (!texto) return "";

    let limpo = texto
        .replace(/\u2018/g, "'")
        .replace(/\u2019/g, "'")
        .replace(/\u201C/g, '"')
        .replace(/\u201D/g, '"')
        .replace(/\u2013/g, "-")
        .replace(/\u2014/g, "-");

    let convertido = limpo
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>");

    const paragrafos = convertido.split(/\n{2,}/);

    return paragrafos
        .map(p => p.replace(/\r\n/g, "\n")
            .replace(/\n/g, "<br>")
            .trim())
        .filter(p => p !== "")
        .map(p => `<p>${p}</p>`)
        .join("");
}


/* =========================================================
   FORMATAÇÃO DE TÍTULOS
   ========================================================= */

function formatarTitulo(texto) {
    return texto
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, letra => letra.toUpperCase());
}


/* =========================================================
   FORMATAÇÃO DE URL DO YOUTUBE
   ========================================================= */

function formatarYoutube(url) {
    if (!url) return "";

    try {
        const endereco = new URL(url, window.location.href);

        if (endereco.pathname.includes("/embed/")) {
            return url;
        }

        let id = endereco.searchParams.get("v");

        if (endereco.hostname === "youtu.be") {
            id = endereco.pathname.replace(/^\//, "");
        } else if (!id) {
            const trecho = endereco.pathname.match(/\/(?:shorts|live)\/([^/]+)/);

            if (trecho) {
                id = trecho[1];
            }
        }

        return id
            ? `https://www.youtube.com/embed/${id}`
            : url;

    } catch {
        return url;
    }
}


/* =========================================================
   EXIBIÇÃO DE ERROS
   ========================================================= */

function mostrarErro(mensagem) {
    const container = document.getElementById("paginaFichaNacao");

    if (!container) {
        console.error(mensagem);
        return;
    }

    container.innerHTML = `
        <section class="erro-registro">
            <h1>${mensagem}</h1>
            <a href="../../index.html">Voltar para Biblioteca</a>
        </section>
    `;
}