export type Article = {
	title: string
	slug: string
	date: string
	readingTime: string
	summary: string
	content: string[]
}

export const articles: Article[] = [
	{
		title: 'Como remover texto em itálico no VSCODE para projetos Front-end',
		slug: 'remover-italico-vscode-projetos-frontend',
		date: '2026-06-19',
		readingTime: '6 min de leitura',
		summary: 'Se o texto em itálico no VSCODE dificulta a leitura do seu código, este guia é para você. Aprenda a desativar itálicos para os principais elementos do Front-end usando uma configuração pronta para uso, testada com HTML, CSS, SCSS, SASS, JavaScript, TypeScript, React, PHP e WordPress.',
		content: [
			'Se você usa um tema estilizado no VSCODE, provavelmente já percebeu comentários, parâmetros, classes ou tipos aparecendo em itálico. Sei que muitos desenvolvedores gostam desse visual, mas depois de anos programando percebi que prefiro tudo sem itálico. Na minha opinião, o código fica mais limpo e, principalmente, mais fácil de ler, especialmente em projetos maiores.',
			'É uma pequena mudança, mas que melhorou bastante minha experiência no dia a dia. A parte complicada é que não existe uma única configuração que desative itálico em todos os lugares. Alguns elementos são estilizados usando <strong>TextMate Tokens</strong>, outros utilizam <strong>Semantic Tokens</strong>, e os temas ainda podem aplicar regras próprias por cima disso.',
			'Depois de alguns testes, cheguei à configuração abaixo. Ela é focada em desenvolvimento Front-end e remove a maior parte dos estilos em itálico que encontro diariamente. Foi testada com: <strong>HTML, CSS, SCSS, SASS, JavaScript, TypeScript, React, PHP e WordPress</strong>.',
			'Como adicionar: abra a paleta de comandos com <strong>ctrl + shift + p</strong>, pesquise por <strong>Preferences: Open Settings (JSON)</strong> para abrir o arquivo <strong>settings.json</strong>. Depois, basta adicionar a seguinte configuração:',
			'<a href="https://gist.github.com/markusvdc/c5647e5b480922a7d36672f6902e709a" target="_blank" rel="noopener noreferrer">https://gist.github.com/markusvdc/c5647e5b480922a7d36672f6902e709a</a>',
			'Pronto. Se você trabalha principalmente com tecnologias Front-end, essa configuração deve remover a maior parte dos estilos em itálico do seu editor. E, se você é como eu e acha que código fica mais fácil de ler quando não parece ter sido escrito em um convite de casamento, provavelmente vai gostar do resultado.'
		]
	},
	{
		title: 'Aprendendo ImageMagick para conversão e otimização de imagens',
		slug: 'aprendendo-imagemagick-conversao-otimizacao-imagens',
		date: '2026-06-18',
		readingTime: '6 min de leitura',
		summary: 'Uma introdução simples ao ImageMagick, uma ferramenta gratuita e de código aberto para converter e otimizar imagens pela linha de comando. Aprenda a instalar, converter PNG para WEBP, reduzir o tamanho dos arquivos e processar várias imagens ao mesmo tempo com alguns comandos simples.',
		content: [
			'Tenho usado o ImageMagick para converter e otimizar imagens diretamente pela linha de comando e uma das coisas que mais gosto nele é a simplicidade. O ImageMagick é uma ferramenta gratuita e de código aberto capaz de editar, converter e processar imagens em centenas de formatos. Existe há muitos anos, é extremamente maduro e funciona no Windows, Linux e macOS.',
			'Comecei a utilizá-lo para uma tarefa muito comum - converter arquivos PNG para WEBP. Em vez de abrir um editor, exportar a imagem, escolher opções e repetir o processo para cada arquivo, consigo fazer tudo com um único comando.',
			'A instalação é simples. Basta acessar o site oficial <a href="https://imagemagick.org/" target="_blank" rel="noopener noreferrer">https://imagemagick.org/</a>, ir até a seção de downloads e baixar o instalador recomendado. O nome do arquivo geralmente é algo como <strong>ImageMagick-7.x.x-Q16-HDRI-x64-dll.exe</strong>. Durante a instalação, existe uma opção que merece atenção <strong>Add application directory to your system PATH<strong>.',
			'Essa opção permite utilizar o comando <strong>magick</strong> em qualquer janela do terminal. É um detalhe pequeno, mas que melhora bastante a experiência. Após a instalação, abra o Prompt de Comando ou o terminal de sua preferência e execute <strong>magick -version</strong>. Se aparecer algo como <strong>Version: ImageMagick 7.1.2</strong>, significa que tudo está funcionando corretamente. A partir daí começa a parte interessante.',
			'Imagine que você tenha uma imagem chamada <strong>foto.png</strong> e queira convertê-la para WEBP. Basta executar <strong>magick foto.png foto.webp</strong>. Pronto. Nenhum parâmetro adicional é necessário e a conversão acontece quase instantaneamente. Se o objetivo for reduzir o tamanho do arquivo, você pode ajustar o nível de qualidade <strong>magick foto.png -quality 80 foto.webp</strong>. O parâmetro <strong>-quality</strong> controla a compressão. Em geral, valores menores produzem arquivos menores, enquanto valores maiores preservam mais qualidade.',
			'Na maioria dos casos, valores entre 70 e 85 oferecem um bom equilíbrio entre tamanho e qualidade visual. O que mais me surpreendeu foi a praticidade quando se trabalha com várias imagens. Imagine uma pasta cheia de arquivos PNG e a necessidade de convertê-los todos para WEBP aplicando compressão. Você pode usar <strong>magick mogrify -format webp -quality 80 *.png</strong>. O comando processa automaticamente todos os arquivos PNG da pasta atual. É nesse momento que o ImageMagick realmente se destaca.',
			'Tarefas que normalmente levariam vários minutos — ou até horas, dependendo da quantidade de arquivos — passam a ser executadas uma única vez e esquecidas.',
			'E a conversão de imagens é apenas uma pequena parte do que ele pode fazer. O ImageMagick também permite redimensionar, cortar, rotacionar, adicionar bordas, ajustar cores, criar miniaturas, aplicar efeitos e automatizar fluxos completos de processamento de imagens por meio de scripts. Como tudo acontece pelo terminal, é fácil integrá-lo a processos de build, scripts de deploy ou qualquer outra automação que você já utilize.',
			'Hoje existem muitas ferramentas modernas para otimização de imagens, mas gosto da filosofia do ImageMagick - comandos simples, muita flexibilidade e a capacidade de processar milhares de arquivos sem precisar de uma interface gráfica. Para quem trabalha com sites, blogs ou qualquer projeto que lide com imagens com frequência, é uma daquelas ferramentas que vale a pena manter instalada.'
		]
	},
	{
		title: 'Aprendendo React, Vite e TypeScript com a ajuda do Codex',
		slug: 'aprendendo-react-vite-ajuda-codex',
		date: '2026-06-18',
		readingTime: '8 min de leitura',
		summary: 'Minha experiência aprendendo React, Vite e TypeScript tem sido muito mais produtiva do que eu imaginava. Com a ajuda do Codex, consigo criar projetos reais, entender cada etapa do processo e dedicar mais tempo a melhorar o código em vez de ficar preso procurando bugs.',
		content: [
			'Estou aprendendo <strong>React, Vite e TypeScript</strong> enquanto reconstruo meu próprio site. Em vez de seguir o caminho tradicional — estudar a documentação primeiro, fazer cursos e só depois tentar criar algo — decidi aprender construindo.',
			'E, até agora, esta tem sido <strong>uma das experiências de aprendizado mais produtivas que já tive</strong>.',
			'<strong>Grande parte disso se deve ao Codex</strong>. Posso descrever o que quero construir, pedir uma estrutura inicial e acompanhar passo a passo como cada parte do projeto é montada. Rotas, componentes, tipos, organização de arquivos e estilos deixam de ser conceitos isolados e passam a fazer sentido dentro de um projeto real.',
			'O mais interessante é que continuo tendo <strong>controle sobre as decisões</strong>. O Codex pode sugerir uma implementação, mas sou eu quem decide se a estrutura faz sentido, se o nome de um componente é adequado ou se a solução combina com a ideia que tenho para o projeto. Minha experiência com outras tecnologias ajuda bastante nesse processo. Muitas vezes consigo identificar possíveis melhorias, sugerir mudanças e receber um retorno imediato para entender por que uma abordagem é melhor do que outra.',
			'Uma das coisas que mais me surpreendeu é que <strong>encontro menos erros do que imaginava</strong>.',
			'Nos métodos tradicionais de aprendizado, especialmente ao aprender uma tecnologia nova, é comum gastar muito tempo resolvendo problemas de configuração, corrigindo imports ou lidando com pequenos erros de sintaxe. Isso faz parte do processo, mas também pode ser cansativo. Às vezes você passa tanto tempo procurando a origem de um erro que sobra pouca energia para pensar no projeto em si.',
			'Com o Codex, tenho encontrado menos desses obstáculos. Como a estrutura inicial geralmente já está pronta ou muito próxima do ideal, consigo dedicar <strong>mais tempo a entender como as coisas funcionam e a melhorar o projeto</strong>.',
			'Isso não significa aprender menos. Ainda preciso compreender o código, questionar decisões e testar alternativas. A diferença é que gasto menos tempo procurando bugs e mais tempo pensando em <strong>arquitetura, semântica, experiência do usuário</strong> e nos pequenos detalhes que fazem diferença.',
			'Talvez cometer erros seja importante em alguns momentos. Alguns erros ensinam lições valiosas e fazem parte do processo. Mas, para mim, aprender dessa forma tem sido muito mais produtivo. Tenho a sensação de estar <strong>construindo algo real desde o primeiro dia</strong>, e isso torna a experiência de aprendizado mais interessante e motivadora.',
			'Ainda estou longe de dominar React, Vite ou TypeScript. Mas, pela primeira vez em muito tempo, sinto que estou <strong>aprendendo no mesmo ritmo em que estou criando</strong>.'
		]
	},
	{
		title: 'Como o Topaz Photo AI me surpreendeu com aprimoramento de imagens',
		slug: 'como-topazphoto-surpreendeu-aprimoramento-imagens',
		date: '2026-06-18',
		readingTime: '6 min de leitura',
		summary: 'Nunca imaginei encontrar um aplicativo para Windows capaz de manipular imagens com IA de forma tão impressionante. O que começou como uma simples ferramenta de upscale rapidamente se tornou uma das aplicações de IA mais interessantes que usei recentemente, mudando a forma como penso sobre edição de imagens.',
		content: [
			'Tenho experimentado ferramentas de IA há bastante tempo, mas a maior parte das minhas experiências sempre esteve limitada a plataformas web. Geradores de imagens, chatbots e editores online se tornaram parte da minha rotina, então naturalmente imaginei que as ferramentas de imagem mais avançadas continuariam vivendo dentro do navegador.',
			'Foi por isso que o <strong>Topaz Photo AI me surpreendeu tanto</strong>.',
			'Encontrar um aplicativo dedicado para Windows, totalmente focado em aprimoramento de imagens, foi uma experiência diferente. A maioria das ferramentas de IA que uso são sites, então abrir um aplicativo nativo e ver do que ele era capaz me deu a sensação de que a IA está, aos poucos, <strong>se tornando parte do próprio sistema operacional</strong> e não apenas mais uma aba do navegador.',
			'<strong>A funcionalidade que mais utilizo é, sem dúvida, o Upscale</strong>. No começo, achei que ele simplesmente aumentaria a resolução da imagem. E, tecnicamente, é exatamente isso que acontece. Mas o resultado muitas vezes parece ir muito além disso.',
			'Em muitos casos, a imagem não apenas fica maior, <strong>ela fica melhor</strong>. Os detalhes parecem mais limpos, as bordas ficam mais definidas e, de alguma forma, a própria arte parece aprimorada. Sei que a IA não está recuperando magicamente informações que nunca existiram, mas sinceramente é essa a sensação. É como se a imagem sempre tivesse sido assim e eu estivesse vendo sua melhor versão pela primeira vez.',
			'Como costuma acontecer, a IA acabou me entregando <strong>mais do que eu esperava</strong>.',
			'Outro recurso que uso bastante é o Remove. O conceito é simples: você seleciona um objeto ou uma parte específica da imagem e a IA reconstrói a área ausente como se aquele elemento nunca tivesse existido. Ainda acho isso fascinante.',
			'Alguns anos atrás, remover objetos de uma imagem poderia levar bastante tempo e exigir uma boa dose de habilidade. <strong>Hoje, simplesmente aponto para algo e digo Remova isso</strong>. E, na maioria das vezes, o resultado é surpreendentemente bom.',
			'É claro que nem toda imagem fica perfeita e, às vezes, a reconstrução não é exatamente como imaginei. Mas, ainda assim, fico impressionado com <strong>a naturalidade do processo</strong>.',
			'O curioso é que sinto que ainda explorei muito pouco do software. O Topaz Photo AI oferece diversos outros recursos que parecem bem mais especializados, e tenho bastante curiosidade para descobrir em quais situações cada um deles é mais útil. De vez em quando abro o programa, testo alguma novidade e acabo me surpreendendo mais uma vez.',
			'Talvez seja isso que mais gosto na IA. Raramente começo a usar uma ferramenta esperando que ela mude minha forma de trabalhar. Normalmente imagino que ela vai me economizar alguns minutos aqui e ali.',
			'Então descubro algo como o Topaz Photo AI e percebo que a tecnologia não está apenas tornando as tarefas mais rápidas. <strong>Ela está mudando aquilo que acredito ser possível</strong>.'
		]
	}
]
