---
title: "Como criar um CMS sem backend usando GitHub Pages"
slug: "criando-cms-usando-github-pages"
date: "2026-06-23"
readingTime: "7 min de leitura"
summary: "Descubra como transformar um portfólio estático em um CMS sem backend usando React, Markdown, GitHub API e GitHub Pages. Veja como criar artigos, versionar conteúdo automaticamente e publicar tudo sem banco de dados, servidor ou infraestrutura complexa."
---

Durante muito tempo eu pensei que, para ter um painel administrativo, era obrigatório criar um backend completo.

Isso normalmente significava:

-   Node.js;
    
-   Banco de dados;
    
-   Sistema de autenticação;
    
-   Infraestrutura e deploy.
    

Mas aí surgiu uma pergunta:

> Será que eu consigo fazer tudo isso usando apenas GitHub Pages?

A resposta me surpreendeu: **Sim.**

## A ideia

Quando você para para pensar, o GitHub já oferece praticamente tudo o que um CMS precisa:

-   Armazenamento de arquivos;
    
-   Histórico completo de versões;
    
-   Sistema de autenticação;
    
-   API para leitura e escrita;
    
-   Hospedagem estática gratuita.
    

Então veio o estalo:

> Por que não usar o próprio repositório como banco de dados?

Em vez de armazenar dados em uma base tradicional, eu poderia salvar todo o conteúdo em arquivos **Markdown** dentro do repositório.

Cada alteração se transformaria em um **commit**, criando automaticamente um histórico completo das mudanças.

O que antes parecia uma gambiarra começou a parecer uma solução extremamente elegante.

## O fluxo

A arquitetura acabou ficando assim:

Painel administrativo em React → API do GitHub → Criação automática de arquivos Markdown → Versionamento com commits → Publicação automática no GitHub Pages
