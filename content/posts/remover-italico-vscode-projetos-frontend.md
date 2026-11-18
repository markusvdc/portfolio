---
title: "Como remover os estilos em itálico no VSCODE e FRONT-END"
slug: "remover-italico-vscode-projetos-frontend"
date: "2026-06-18T22:15"
updatedAt: "2026-10-06T08:04"
readingTime: 6
summary: "O texto em itálico no VSCODE dificulta a leitura do código? Veja como desativar esse estilo nos principais elementos FRONT-END. A configuração pronta foi testada com HTML, CSS, SCSS, SASS, JavaScript, TypeScript, React, PHP e WordPress, para aplicar sem ajustes extras e manter o editor mais confortável para ler."
---

Se você usa um tema estilizado no VSCODE, talvez já tenha percebido comentários, parâmetros, classes ou tipos aparecendo em itálico. Muitos desenvolvedores gostam desse visual, mas, depois de anos programando, percebi que prefiro o código sem esse estilo. Para mim, remover o itálico deixa a leitura do código mais confortável em projetos maiores e extensos.

É uma mudança pequena, mas que melhorou minha experiência no dia a dia. O ajuste exige atenção porque não há uma única configuração para todos os casos: alguns elementos usam TextMate Tokens, outros usam Semantic Tokens, e os temas podem aplicar regras próprias. Por isso, às vezes é preciso combinar opções para chegar ao resultado que desejo.

## Por que o itálico aparece no código

O editor aplica estilos por meio de regras de destaque sintático e semântico. TextMate Tokens classificam trechos conforme a gramática da linguagem, enquanto Semantic Tokens usam informações fornecidas pela extensão. O tema define a aparência de cada categoria e pode exibir certos trechos em itálico por padrão.

Por isso, remover o estilo de uma categoria pode não afetar outra. Comentários, parâmetros e tipos podem receber regras diferentes, mesmo no mesmo arquivo. A configuração que reuni combina ajustes para cobrir os casos mais comuns do meu fluxo de trabalho com projetos de FRONT-END.

## Configuração para remover itálico do código

Depois de alguns testes, preparei uma configuração voltada ao desenvolvimento FRONT-END. Ela remove a maior parte dos estilos em itálico que encontro no editor. Testei os ajustes com HTML, CSS, SASS, JavaScript, TypeScript, React, PHP e WordPress em projetos que uso no trabalho diário.

Para adicioná-la, abra a paleta de comandos com <code>Ctrl + Shift + P</code> e pesquise por <code>Preferences: Open Settings (JSON)</code>. O editor abrirá o arquivo <code>settings.json</code>, onde você pode inserir as regras junto das preferências que já usa no editor.

## Aplicar as regras no editor do VSCODE

Você pode copiar a configuração completa neste link: <a href="https://gist.github.com/markusvdc/c5647e5b480922a7d36672f6902e709a" target="_blank" rel="noopener noreferrer">configuração para remover itálico no VSCODE</a>. Depois de inserir as regras, salve o arquivo e confira comentários, parâmetros, classes e tipos no projeto. A aparência pode variar conforme o tema e as extensões que você instalou.

Se algum trecho continuar em itálico, verifique se o tema ou uma extensão aplica outra regra àquela categoria. Confirme também se as opções foram inseridas corretamente no JSON, respeitando vírgulas e aspas. Regras sobrepostas podem exigir ajustes nos seletores definidos pelo tema ativo do editor.

## Uma leitura mais confortável do código

Para quem trabalha principalmente com tecnologias FRONT-END, essa configuração deve remover boa parte do itálico do editor. No meu caso, o resultado deixa o código mais limpo e confortável para ler por períodos longos. Como a preferência é pessoal, compare o resultado com o tema que você usa.

Gosto de pensar que o código fica menos parecido com um convite de casamento e mais fácil de acompanhar. Se você também prefere uma aparência sem itálico, experimente as regras e ajuste o que não combinar com seu tema. Uma mudança simples pode tornar a leitura do código mais agradável na rotina diária.
