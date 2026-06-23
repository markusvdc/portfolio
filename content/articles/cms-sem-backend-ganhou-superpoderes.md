---
title: "Meu CMS sem backend finalmente ganhou superpoderes"
slug: "cms-sem-backend-ganhou-superpoderes"
date: "2026-06-03T18:25"
readingTime: "8 min de leitura"
summary: "Depois de criar um CMS sem backend usando React, GitHub API e Markdown, resolvi ir além. Chegou a hora de testar recursos mais avançados, como links, blocos de código, listas, imagens e callouts, para transformar a experiência de escrita em algo mais rico, flexível e agradável."
---

Depois de algumas horas brincando com React, GitHub API e Markdown, finalmente cheguei a um ponto em que comecei a pensar:

> Será que esse CMS já parece um CMS de verdade?

A resposta começou a ser sim.

## O que já funciona

Hoje o projeto já possui:

-   Autenticação usando GitHub Personal Access Token;
    
-   Comunicação com a GitHub API;
    
-   Criação de artigos Markdown;
    
-   Edição de artigos;
    
-   Listagem automática;
    
-   Renderização no front-end.
    

## Recursos adicionados

Agora o editor possui algumas ferramentas que fazem bastante diferença.

### Links

Você pode criar links externos como: [https://github.com](https://github.com) ou [https://vitejs.dev](https://vitejs.dev)

### Código inline

Se você usa VSCode, provavelmente conhece o arquivo `settings.json`. Também pode mencionar comandos como `npm install` ou `git pull`.

### Bloco de código

```
interface Article {
	title: string
	slug: string
	summary: string
	date: string
	readingTime: string
}
const article: Article = {
	title: 'Meu CMS',
	slug: 'meu-cms',
	summary: 'Exemplo de artigo',
	date: '2026-06-23',
	readingTime: '8 min'
}
```
