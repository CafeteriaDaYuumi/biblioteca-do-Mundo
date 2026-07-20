# ARCHITECTURE

> **Projeto:** RPG Steampunk Wiki
> **Versão:** 0.0
> **Documento:** Arquitetura do Sistema

---

# Objetivo

Este documento define a arquitetura da Wiki do RPG Steampunk.

Seu propósito é padronizar a organização do projeto, estabelecer responsabilidades para cada módulo e servir como referência durante todo o desenvolvimento da aplicação.

Nesta fase (Versão 0), o foco está exclusivamente na arquitetura da plataforma e não na implementação das funcionalidades.

---

# Princípios da Arquitetura

A Wiki foi projetada para atender quatro princípios fundamentais:

## Organização

O conteúdo será dividido em módulos independentes, evitando grandes páginas com informações misturadas.

Cada módulo será responsável por uma única área do universo.

---

## Escalabilidade

Toda a estrutura foi planejada para suportar centenas ou milhares de páginas sem necessidade de reorganização futura.

Novos módulos poderão ser adicionados sem alterar a arquitetura existente.

---

## Modularidade

Cada módulo poderá evoluir de forma independente.

Isso permite desenvolver, revisar e expandir partes específicas da Wiki sem impactar o restante do projeto.

---

## Padronização

Todas as páginas seguirão a mesma estrutura visual e organizacional.

Isso garante consistência durante toda a navegação.

---

# Estrutura Geral

A Wiki é organizada em módulos temáticos.

Cada módulo representa uma grande categoria do universo.

```text
Wiki
│
├── Mundo
├── Narativa
├── Equipamentos
├── Humanidade
└── Arquivos
```

Cada módulo possui sua própria página principal e um conjunto de subpáginas relacionadas.

---

# Hierarquia das Páginas

A navegação seguirá uma estrutura hierárquica.

```text
Home
│
├── Mundo
│   ├── Nações
│   ├── Localização
│   ├── Natureza
│   ├── Civilização
│   └── Mapas
│
├── Personagens
│   ├── Personagens
│   ├── Famílias
│   └── Organizações
│
├── História
│   ├── Contos
│   ├── Maiores eventos
│   └── Linha do Tempo
│
└── ...
```

A navegação sempre partirá de uma página principal para páginas mais específicas.

---

# Arquitetura dos Módulos

Todos os módulos seguirão a mesma organização.

```text
Módulo
│
├── Página Inicial
└── Pagina de detalhe
```

Essa padronização facilita a navegação e reduz a curva de aprendizado do usuário.

---

# Estrutura Física do Projeto

```text
/
├── assets/
│
├── pages/
│   ├── archives/
│   ├── equipment/
│   ├── humanity/
│   ├── narratives/
│   └── world/
│
├── src/
│
├── data/
│
└── documentation/
```

---

# Responsabilidade das Pastas

## assets

Armazena todos os recursos estáticos da aplicação.

Exemplos:

* imagens
* ícones
* fontes
* estilos
* scripts públicos

---

## pages

Contém todas as páginas da Wiki.

Cada pasta representa um módulo do universo.

---

## src

Contém o código responsável pela lógica da aplicação.

Nesta fase permanece reservado para futuras implementações.

---

## data

Reservado para armazenar os dados estruturados da Wiki.

No futuro poderá conter arquivos JSON responsáveis por alimentar automaticamente as páginas do sistema.

---

## 00_documentation

Contém toda a documentação técnica do projeto.

Não faz parte da aplicação publicada.

---

# Arquitetura das Páginas

Todas as páginas seguirão um layout padronizado.

```text
Página

├── Cabeçalho
├── Navegação Principal
├── Breadcrumb
├── Conteúdo
├── Navegação Relacionada
└── Rodapé
```

Cada módulo utilizará exatamente essa estrutura.

---

# Organização do Conteúdo

A Wiki utilizará uma organização baseada em categorias.

Exemplo:

```text
Mundo

├── Geografia
├── Política
├── Economia
├── Clima
├── Recursos
└── Infraestrutura
```

Essa divisão evita páginas excessivamente grandes.

---

# Navegação

A navegação será construída em três níveis.

## Navegação Principal

Responsável pelos grandes módulos.

Exemplo:

* Mundo
* Personagens
* História
* Sistema

---

## Navegação Secundária

Responsável pelas categorias internas de cada módulo.

Exemplo:

Mundo

* Nações
* Cidades
* Continentes
* Oceanos

---

## Navegação Contextual

Apresentará páginas relacionadas ao conteúdo atual.

Exemplo:

Astroford

Relacionados:

* URID
* Sirius
* Veias de Ferro
* Night Blood

---

# Escalabilidade

Toda a arquitetura foi desenvolvida para permitir crescimento contínuo.

Características previstas:

* novos módulos sem alterações estruturais;
* novas categorias independentes;
* expansão do conteúdo sem reorganização do projeto;
* suporte a milhares de registros.

---

# Internacionalização

A arquitetura prevê suporte a múltiplos idiomas.

O desenvolvimento seguirá duas etapas:

1. Documentação completa em português.
2. Tradução para inglês após estabilização do conteúdo.

A estrutura da aplicação permanecerá a mesma para ambos os idiomas.

---

# Evolução da Arquitetura

## Versão 0

Arquitetura e documentação.

---

## Versão 1

Implementação da estrutura HTML.

---

## Versão 2

Implementação dos componentes reutilizáveis.

---

## Versão 3

Implementação dos dados dinâmicos.

---

## Versão 4

Internacionalização.

---

# Considerações Finais

A arquitetura foi planejada priorizando organização, modularidade, padronização e escalabilidade.

O objetivo é garantir que o projeto possa crescer continuamente, tornando-se uma Wiki completa para o universo do RPG Steampunk sem exigir mudanças significativas na estrutura original.
