# BRANCH_STRUCTURE

> **Projeto:** RPG Steampunk Wiki
> **Versão:** 0.0
> **Documento:** Estrutura de Branches

---

# Objetivo

Este documento define a estratégia de branches utilizada durante o desenvolvimento do RPG Steampunk Wiki.

O objetivo é manter um fluxo de trabalho organizado, facilitar o desenvolvimento de novas funcionalidades e garantir a estabilidade da versão principal do projeto.

---

# Estratégia

O projeto utiliza um modelo simplificado inspirado no Git Flow.

Cada tipo de atividade possui uma branch específica.

```text
main
│
├── develop
│
├── feature/*
├── docs/*
├── fix/*
├── hotfix/*
├── release/*
└── experimental/*
```

---

# Branch Principal

## main

Representa a versão estável do projeto.

Características:

* Sempre funcional.
* Contém apenas código aprovado.
* Utilizada para publicação das versões oficiais.
* Não recebe alterações diretamente.

---

# Branch de Desenvolvimento

## develop

Responsável pela integração das funcionalidades em desenvolvimento.

Características:

* Base para novas branches.
* Recebe features concluídas.
* Utilizada durante o desenvolvimento diário.

---

# Branches de Funcionalidade

## feature/*

Utilizadas para implementar novas funcionalidades.

Exemplos:

```text
feature/world
feature/characters
feature/navigation
feature/search
feature/homepage
```

Após a conclusão, devem ser mescladas na branch `develop`.

---

# Branches de Documentação

## docs/*

Reservadas para alterações na documentação do projeto.

Exemplos:

```text
docs/readme
docs/architecture
docs/backlog
docs/world
docs/characters
```

---

# Branches de Correção

## fix/*

Utilizadas para correções que não são críticas.

Exemplos:

```text
fix/navigation
fix/sidebar
fix/layout
```

---

# Branches de Correção Urgente

## hotfix/*

Destinadas à correção imediata de problemas encontrados na versão publicada.

Exemplos:

```text
hotfix/home
hotfix/security
hotfix/navigation
```

Essas branches são criadas a partir da `main` e retornam para `main` e `develop` após a correção.

---

# Branches de Release

## release/*

Preparação de uma nova versão oficial.

Exemplos:

```text
release/v1.0
release/v1.1
release/v2.0
```

Utilizadas para testes finais, ajustes e correções antes da publicação.

---

# Branches Experimentais

## experimental/*

Utilizadas para testes e protótipos.

Não há garantia de estabilidade.

Exemplos:

```text
experimental/json-engine
experimental/new-layout
experimental/search-engine
```

---

# Fluxo de Trabalho

```text
main
│
└── develop
     │
     ├── feature/world
     ├── feature/history
     ├── feature/characters
     ├── docs/readme
     ├── docs/architecture
     └── fix/sidebar
```

Após revisão:

```text
feature/*  ──► develop

develop ──► release/v1.0

release/v1.0 ──► main
```

---

# Convenções

* Utilizar apenas letras minúsculas.
* Utilizar hífen (`-`) para separar palavras.
* Utilizar nomes curtos e descritivos.
* Cada branch deve possuir apenas um objetivo.

Exemplos:

```text
feature/world-map
feature/technology
feature/character-profile

docs/readme
docs/folder-structure

fix/mobile-menu

hotfix/security

release/v1.0
```

---

# Política de Merge

* `feature/*` → `develop`
* `docs/*` → `develop`
* `fix/*` → `develop`
* `release/*` → `main`
* `hotfix/*` → `main` e `develop`

Alterações não devem ser enviadas diretamente para a branch `main`.

---

# Versionamento

As versões seguirão o padrão SemVer (Semantic Versioning):

```text
MAJOR.MINOR.PATCH
```

Exemplos:

```text
0.1.0
0.5.2
1.0.0
1.2.1
2.0.0
```

---
---

# Padrão de Commits

Todos os commits do projeto devem seguir um padrão de nomenclatura e descrição para manter o histórico organizado, facilitar revisões de código e permitir a identificação rápida das alterações realizadas.

Cada commit deve representar **uma única alteração lógica** do projeto, possuindo um título objetivo e uma descrição clara das modificações.

---

## Título do Commit

O título deve seguir o padrão:

```text
<tipo>: <nome da alteração> [vX.Y.Z]
```

### Tipos de Commit

| Tipo | Descrição |
|------|-----------|
| `feat` | Nova funcionalidade |
| `content` | Novo ou Mudança de conteúdo da wiki |
| `fix` | Correção de bugs |
| `docs` | Alterações na documentação |
| `style` | Ajustes de formatação ou estilo |
| `refactor` | Reestruturação de código sem alterar comportamento |
| `perf` | Melhorias de desempenho |
| `test` | Criação ou alteração de testes |
| `build` | Alterações de build ou dependências |
| `ci` | Configuração de integração contínua |
| `chore` | Tarefas de manutenção |
| `hotfix` | Correção crítica em produção |

### Exemplos

```text
feat: Sistema de Personagens [v0.2.0]

docs: Estrutura de Branches [v0.1.0]

fix: Correção do Menu Lateral [v0.2.1]

refactor: Organização dos Componentes [v0.3.0]
```

---

## Descrição do Commit

Todo commit deve possuir obrigatoriamente uma descrição em **Português (Brasil)** e **Inglês**.

A descrição deve resumir de forma objetiva as alterações realizadas no commit.

Utilize obrigatoriamente o seguinte modelo:

```text
Pt-br:
<Descrição da alteração em português>

En:
<Description of the changes in English>
```

### Exemplo

```text
Pt-br:
Adicionado o sistema inicial de personagens, incluindo a estrutura HTML, estilos CSS e navegação entre páginas.

En:
Added the initial character system, including the HTML structure, CSS styles and page navigation.
```

---

## Convenções

- Utilizar títulos curtos e objetivos.
- Cada commit deve representar apenas uma alteração lógica.
- Utilizar o tipo de commit correspondente à alteração realizada.
- Informar a versão entre colchetes (`[vX.Y.Z]`) quando aplicável.
- Todo commit deve possuir obrigatoriamente uma descrição.
- A descrição deve conter obrigatoriamente os campos:

```text
Pt-br:

En:
```

- O conteúdo em **Pt-br** deve descrever a alteração em português.
- O conteúdo em **En** deve conter a tradução equivalente em inglês.
- As descrições devem ser claras, objetivas e representar fielmente as alterações realizadas.
- Não realizar commits diretamente na branch `main`.

---

# Considerações Finais

A estratégia de branches foi definida para manter o desenvolvimento organizado e escalável, permitindo que diferentes funcionalidades, correções e documentos evoluam de forma independente antes de serem integrados à versão principal do projeto.
