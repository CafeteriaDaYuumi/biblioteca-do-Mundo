# FOLDER_STRUCTURE

> **Projeto:** RPG Steampunk Wiki
> **Versão:** 0.0
> **Documento:** Estrutura de Diretórios

---

# Objetivo

Este documento define a organização física do projeto, estabelecendo a finalidade de cada diretório, as convenções de nomenclatura e os padrões utilizados para manter a estrutura consistente durante o desenvolvimento.

A organização foi planejada para facilitar a manutenção, permitir escalabilidade e manter uma separação clara entre documentação, código, recursos estáticos e conteúdo da Wiki.

---

# Estrutura Geral

```text
/
├── assets/
├── data/
├── pages/
├── src/
├── documentation/
│
├── index.html
├── README.md
└── CHANGELOG.md
```

---

# Diretórios

## assets/

Armazena todos os recursos estáticos utilizados pela aplicação.

Exemplos:

```text
assets/
├── css/
├── fonts/
├── icons/
├── images/
├── js/
└── videos/
```

### Responsabilidades

* Folhas de estilo (CSS)
* Fontes
* Ícones
* Imagens
* Scripts públicos
* Arquivos multimídia

---

## pages/

Contém todas as páginas da Wiki.

Cada diretório representa um módulo independente do universo.

Exemplo:

```text
pages/
├── archives/
├── equipment/
├── humanity/
├── narratives/
└── world/
```

Cada módulo possui sua própria página inicial (`index.html`) e poderá conter páginas internas conforme sua necessidade.

Exemplo:

```text
world/
├── index.html
├── nations/
├── civilizations/
├── locations/
├── nature/
└── maps/
```

---

## src/

Reservado para a lógica da aplicação.

Inicialmente permanecerá praticamente vazio, sendo expandido conforme a evolução do projeto.

Exemplo futuro:

```text
src/
├── components/
├── layouts/
├── modules/
├── services/
├── utils/
└── scripts/
```

### Responsabilidades

* Componentes reutilizáveis
* Manipulação da interface
* Navegação
* Busca
* Utilitários
* Lógica da aplicação

---

## data/

Responsável pelo armazenamento dos dados estruturados da Wiki.

Embora a primeira versão utilize páginas estáticas, esta pasta foi planejada para permitir uma futura migração para conteúdo dinâmico.

Exemplo:

```text
data/
├── world/
├── characters/
├── factions/
├── history/
├── locations/
├── technology/
└── equipment/
```

Cada registro poderá ser armazenado em arquivos JSON, facilitando a manutenção e a reutilização das informações.

---

## 00_documentation/

Contém toda a documentação técnica do projeto.

Esta pasta não faz parte da aplicação publicada.

Exemplo:

```text
00_documentation/
├── README.md
├── ARCHITECTURE.md
├── BACKLOG.md
├── ROADMAP.md
├── FOLDER_STRUCTURE.md
└── modules/
```

---

# Arquivos Raiz

## README.md

Apresentação geral do projeto.

---

## CHANGELOG.md

Histórico de alterações por versão.

---

## index.html

Página inicial da aplicação.

Durante a versão 0 funciona apenas como estrutura base, sendo implementada nas próximas versões.

---

# Convenções de Nomenclatura

Todos os diretórios devem seguir o mesmo padrão.

## Idioma

Todo o código-fonte e a estrutura do projeto utilizam nomes em inglês.

O conteúdo da Wiki será inicialmente produzido em português.

---

## Letras

Utilizar apenas letras minúsculas.

**Correto**

```text
characters
```

**Incorreto**

```text
Characters
```

---

## Separação

Utilizar hífen (`-`) quando houver mais de uma palavra.

**Correto**

```text
game-system
steam-engines
air-ships
```

**Incorreto**

```text
game_system
GameSystem
gam
eSystem
```

---

## Plural

Sempre utilizar substantivos no plural para diretórios que representam coleções.

Exemplos:

```text
characters
cities
nations
weapons
vehicles
creatures
organizations
```

---

# Organização dos Módulos

Cada módulo deverá possuir sua própria estrutura.

Exemplo:

```text
pages/
└── world/
    ├── index.html
    ├── nations/
    ├── cities/
    ├── regions/
    ├── continents/
    ├── oceans/
    └── maps/
```

A estrutura interna poderá crescer sem impactar os demais módulos.

---

# Expansão

Novos módulos poderão ser adicionados seguindo o mesmo padrão.

Exemplo:

```text
pages/
├── religions/
├── economy/
├── diplomacy/
├── transportation/
└── sciences/
```

Nenhuma alteração estrutural será necessária para suportar novos conteúdos.

---

# Boas Práticas

* Cada módulo deve possuir uma responsabilidade bem definida.
* Evitar diretórios genéricos.
* Evitar duplicação de recursos.
* Centralizar arquivos reutilizáveis.
* Manter a nomenclatura consistente em todo o projeto.
* Não misturar documentação com arquivos da aplicação.

---

# Estrutura Esperada

```text
/
├── assets/
│   ├── css/
│   ├── fonts/
│   ├── icons/
│   ├── images/
│   ├── js/
│   └── videos/
│
├── data/
│
├── pages/
│   ├── world/
│   ├── characters/
│   ├── factions/
│   ├── history/
│   ├── locations/
│   ├── technology/
│   ├── equipment/
│   ├── creatures/
│   ├── system/
│   └── archives/
│
├── src/
│
├── 00_documentation/
│
├── CHANGELOG.md
├── README.md
└── index.html
```

---

# Considerações Finais

A estrutura de diretórios foi projetada para acompanhar a evolução da Wiki desde sua fase inicial até versões futuras com centenas de páginas e milhares de registros.

A padronização definida neste documento deve ser seguida durante todo o desenvolvimento para garantir organização, facilidade de manutenção e escalabilidade do projeto.
