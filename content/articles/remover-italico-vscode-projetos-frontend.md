---
title: "Como remover texto em itálico no VSCODE para projetos Front-end"
slug: "remover-italico-vscode-projetos-frontend"
date: "2026-06-19"
readingTime: "6 min de leitura"
summary: "Se o texto em itálico no VSCODE dificulta a leitura do seu código, este guia é para você. Aprenda a desativar itálicos para os principais elementos do Front-end usando uma configuração pronta para uso, testada com HTML, CSS, SCSS, SASS, JavaScript, TypeScript, React, PHP e WordPress."
---

Se você usa um tema estilizado no VSCODE, provavelmente já percebeu comentários, parâmetros, classes ou tipos aparecendo em itálico. Sei que muitos desenvolvedores gostam desse visual, mas depois de anos programando percebi que prefiro tudo sem itálico. Na minha opinião, o código fica mais limpo e, principalmente, mais fácil de ler, especialmente em projetos maiores.

É uma pequena mudança, mas que melhorou bastante minha experiência no dia a dia. A parte complicada é que não existe uma única configuração que desative itálico em todos os lugares. Alguns elementos são estilizados usando **TextMate Tokens**, outros utilizam **Semantic Tokens**, e os temas ainda podem aplicar regras próprias por cima disso.

Depois de alguns testes, cheguei à configuração abaixo. Ela é focada em desenvolvimento Front-end e remove a maior parte dos estilos em itálico que encontro diariamente. Foi testada com: **HTML, CSS, SCSS, SASS, JavaScript, TypeScript, React, PHP e WordPress**.

Como adicionar: abra a paleta de comandos com **ctrl + shift + p**, pesquise por **Preferences: Open Settings (JSON)** para abrir o arquivo **settings.json**. Depois, basta adicionar a seguinte configuração:

[https://gist.github.com/markusvdc/c5647e5b480922a7d36672f6902e709a](https://gist.github.com/markusvdc/c5647e5b480922a7d36672f6902e709a)

Pronto. Se você trabalha principalmente com tecnologias Front-end, essa configuração deve remover a maior parte dos estilos em itálico do seu editor. E, se você é como eu e acha que código fica mais fácil de ler quando não parece ter sido escrito em um convite de casamento, provavelmente vai gostar do resultado.
