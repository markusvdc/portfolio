---
title: "Como criar um CMS sem backend usando GitHub Pages"
slug: "criando-cms-usando-github-pages"
date: "2026-06-23"
readingTime: "7 min de leitura"
summary: "Descubra como transformar um portfólio estático em um CMS sem backend usando React, Markdown, GitHub API e GitHub Pages. Veja como criar artigos, versionar conteúdo automaticamente e publicar tudo sem banco de dados, servidor ou infraestrutura complexa."
---

Durante muito tempo eu pensei que, para ter um painel administrativo, era obrigatório criar um backend.

-   Node.
    
-   Banco de dados.
    
-   Autenticação.
    
-   Deploy.
    

Mas aí surgiu uma pergunta: Será que eu consigo fazer tudo usando apenas GitHub Pages? A resposta foi: sim.

## A ideia

O GitHub já possui:

-   Armazenamento de arquivos;
    
-   Histórico de versões;
    
-   Autenticação;
    
-   API;
    
-   Hospedagem estática.
    

Então por que não usar isso como banco de dados?

## O fluxo

A arquitetura ficou assim: Admin React → GitHub API → Commit automático → Markdown → GitHub Pages
