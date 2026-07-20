# Especificação de Padrão para Comentários em CSS

**Versão:** 1.0.0  
**Status:** Vigente  
**Aplica-se a:** Arquivos `.css` e pré-processadores (Sass, Less, Stylus) que utilizem sintaxe CSS nativa para comentários.  
**Objetivo:** Estabelecer uma hierarquia visual clara, facilitar a navegação em arquivos extensos e documentar decisões de design de forma padronizada.

---

## 1. Propósito

Os comentários em CSS devem responder a três perguntas fundamentais:

1. **Onde estou?** (Navegação visual rápida)
2. **O que faz?** (Finalidade do agrupamento de regras)
3. **Por que está aqui?** (Justificativa técnica, fallbacks, acessibilidade ou hacks)

Todo comentário deve ser escrito em **Português** (ou no idioma acordado pela equipe) e mantido **sempre atualizado** com o código que descreve.

---

## 2. Hierarquia Visual

| Nível | Nome | Formatação | Uso |
| :---: | :--- | :--- | :--- |
| **1** | **Título (Seção)** | `/* =========================================================` <br> `NOME DA SEÇÃO` <br> `Descrição...` <br>`========================================================= */` | Divide grandes áreas do layout (ex: Cabeçalho, Rodapé, Páginas específicas). |
| **2** | **Bloco (Subseção)** | `/* ===== NOME DO BLOCO ===== */` | Agrupa componentes ou partes menores (ex: Menu, Cards, Tabela, Formulário). |
| **3** | **Descrição (In-line / Acima)** | `propriedade: valor; /* descrição curta */` <br> ou <br> `/* Descrição detalhada ocupando` <br> `   múltiplas linhas. */` | Explica uma propriedade específica, um cálculo ou uma decisão de design não óbvia. |

---

## 3. Especificação Detalhada

### 3.1. Títulos de Seção (Nível 1)

- **Início e Fim:** Utilize exatamente **14 sinais de igual (`=`)** ladeados por espaços entre os asteriscos.
- **Texto:** Deve estar em **CAIXA ALTA** e centralizado visualmente.
- **Descrição:** Obrigatória. Deve resumir o conteúdo da seção em até 3 linhas.

**Sintaxe:**
```css
/* =========================================================
   NOME DA SEÇÃO
   Descrição concisa do que esta seção controla.
   ========================================================= */