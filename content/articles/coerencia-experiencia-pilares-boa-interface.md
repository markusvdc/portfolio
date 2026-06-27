---
title: "A coerência da experiência é um dos pilares de uma boa interface"
slug: "coerencia-experiencia-pilares-boa-interface"
date: "2026-06-27T08:51"
updatedAt: "2026-06-27T08:51"
readingTime: 8
summary: "Usuários não aprendem telas, aprendem regras. Neste artigo compartilho uma reflexão sobre como pequenas quebras de consistência afetam a experiência e por que páginas e modais devem ser escolhidos pelo contexto da interação, e não apenas pela implementação."
---

Esses dias percebi um detalhe no VS Code que me fez refletir sobre a forma como projetamos interfaces. Quase tudo dentro do editor abre da mesma maneira: arquivos. Você clica em um arquivo, ele ocupa o editor. Abre outro, ele vira uma nova aba. **O fluxo é consistente.** Mas quando abri as Configurações, a experiência mudou completamente. Em vez de uma página ocupando o editor, surgiu uma interface centralizada, quase como um grande modal. Não é um problema técnico. Funciona perfeitamente. O problema é outro: **quebra a linguagem que a própria aplicação ensinou.** Foi aí que pensei em uma regra extremamente simples. **Se a experiência pede uma página, então faça uma página.** Parece óbvio, mas acho que esquecemos disso com frequência.

## O usuário aprende regras, não telas

Quando usamos um software, **não decoramos cada tela individualmente**. Nosso cérebro aprende padrões. Se tudo abre como uma página, passamos a esperar que tudo continue abrindo como uma página. Quando uma única tela resolve funcionar de outra forma, acontece um pequeno atrito cognitivo. É quase imperceptível, mas ele existe. Não porque a interface seja ruim. Mas porque **ela deixou de ser coerente.**

## O papel do modal

Na minha visão, **um modal representa uma interrupção curta.**

-   Confirmar uma exclusão;
    
-   Renomear um arquivo;
    
-   Escolher uma opção;
    
-   Fazer login.
    

Você entra. Resolve. Sai. **O contexto principal continua exatamente o mesmo.** Agora pense em texto institucional. Sabe quando você está na home, clica em "Sobre a empresa" e, em vez de ir para uma página, abre um modal com um monte de texto? Você começa a ler, rola, tenta entender a história, os valores, o posicionamento. **Isso não parece uma interrupção. Parece um novo contexto.** E **novos contextos**, na minha opinião, merecem páginas.

## React mudou o jogo

Durante muitos anos fazia sentido evitar mudanças de página. Cada navegação significava uma nova requisição, recarregamento completo da aplicação e perda de estado. Hoje isso mudou. Com React, Vite e outras bibliotecas modernas, **navegar entre páginas praticamente não possui custo perceptível para o usuário.** Hoje, inclusive, até aplicações back-end podem ser serverless, reduzindo ainda mais o impacto de mudanças de rota e carregamentos. Se a tecnologia deixou de ser a limitação, talvez possamos voltar a tomar decisões baseadas na experiência. **Não na implementação.**

## Minha regra

Hoje tenho usado uma pergunta muito simples quando projeto uma interface:

> O usuário sente que entrou em outro lugar?

Se a resposta for sim, **provavelmente aquilo deveria ser uma página.** Se a resposta for não, e a interação apenas interrompe momentaneamente o fluxo principal, **um modal costuma fazer mais sentido.** Percebi que essa pergunta me ajuda muito mais do que pensar primeiro em componentes. No fim das contas, **páginas e modais não são apenas elementos de interface.** Eles precisam se encaixar dentro de um fluxo coerente, onde cada parte contribui para a composição da experiência como um todo. E manter essa continuidade talvez seja **uma das formas mais simples de construir produtos que parecem naturais de usar.**
