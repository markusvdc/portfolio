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
		title: 'Learning React, Vite and TypeScript with the help of Codex',
		slug: 'learning-react-vite-typescript-with-codex',
		date: '2026-06-18',
		readingTime: '3 min read',
		summary: 'My experience learning React, Vite and TypeScript has been much more productive than I expected. With the help of Codex, I can build real projects, understand each step of the process and spend more time improving the code instead of getting stuck searching for bugs.',
		content: [
			"I'm learning React, Vite and TypeScript while rebuilding my own website. Instead of following the traditional path — studying the documentation first, taking courses and only then trying to build something — I decided to learn by creating.",
			"And so far, this has been one of the most productive learning experiences I've ever had.",
			"A big part of that is thanks to Codex. I can describe what I want to build, ask for an initial structure and follow step by step how each part of the project is put together. Routes, components, types, file organization and styles stop being isolated concepts and start making sense inside a real project.",
			"The most interesting part is that I still have control over the decisions. Codex can suggest an implementation, but I'm the one who decides whether the structure makes sense, whether a component name is appropriate or whether the solution matches the idea I have for the project. My experience with other technologies helps a lot in this process. Many times I can identify possible improvements, suggest changes and receive immediate feedback to understand why one approach is better than another.",
			"One of the things that surprised me the most is that I run into fewer errors than I expected.",
			"In traditional learning methods, especially when learning a new technology, it's common to spend a lot of time solving configuration issues, fixing imports or dealing with small syntax mistakes. That's part of the learning process, but it can also be exhausting. Sometimes you spend so much time searching for the source of an error that there's little energy left to think about the project itself.",
			"With Codex, I've experienced fewer of these obstacles. Since the initial structure is usually ready or very close to ideal, I can spend more time understanding how things work and improving the project.",
			"That doesn't mean learning less. I still need to understand the code, question decisions and test alternatives. The difference is that I spend less time searching for bugs and more time thinking about architecture, semantics, user experience and the small details that make a difference.",
			"Maybe making mistakes is important at times. Some mistakes teach valuable lessons and are part of the process. But for me, learning this way has been much more productive. I have the feeling that I'm building something real from day one, and that makes the learning experience more interesting and motivating.",
			"I'm still far from mastering React, Vite or TypeScript. But for the first time in a long time, I feel like I'm learning at the same pace that I'm creating."
		]
	},
	{
		title: 'How Topaz Photo AI surprised me as a Windows app',
		slug: 'how-topaz-photo-ai-surprised-me-as-a-windows-app',
		date: '2026-06-18',
		readingTime: '3 min read',
		summary: 'I never expected to find a Windows application capable of manipulating images with AI in such an impressive way. What started as a simple upscale tool quickly became one of the most interesting AI applications I have used recently, changing the way I think about image editing.',
		content: [
			"I've been experimenting with AI tools for quite some time now, but most of my experiences have been limited to web platforms. Image generators, chatbots and online editors have become part of my daily routine, so I naturally assumed that the most advanced AI image tools would continue to live inside the browser.",
			"That's why Topaz Photo AI surprised me so much.",
			"Finding a dedicated Windows application focused entirely on image enhancement felt different. Most AI tools I use are websites, so opening a native desktop application and seeing what it could do gave me the impression that AI is slowly becoming part of the operating system itself, not just another tab in my browser.",
			"The feature I use the most is definitely Upscale. At first, I thought it would simply increase the image resolution. And technically, that's exactly what it does. But the result often feels like much more than that.",
			"Many times the image doesn't just become larger; it becomes better. Details look cleaner, edges feel sharper and, somehow, the artwork itself seems improved. I know the AI isn't magically recovering information that never existed, but that's honestly how it feels. It's as if the image had always looked this good and I was only now seeing its best version.",
			"As usual, AI ends up giving me more than I expected.",
			"Another feature I use a lot is Remove. The concept is simple: you select an object or a specific part of the image, and the AI reconstructs the missing area as if that element had never existed in the first place. I still find this fascinating.",
			"A few years ago, removing objects from an image could take a long time and require a fair amount of skill. Today, I simply point to something and say: 'Remove this.' And most of the time, the result is surprisingly good.",
			"Of course, not every image is perfect and sometimes the reconstruction isn't exactly what I imagined. But even then, I'm impressed by how natural the process feels.",
			"What's funny is that I still feel like I've barely explored the software. Topaz Photo AI offers several other features that seem much more specialized, and I'm very curious to discover when each one is most useful. Every now and then I open the program, try something new and end up surprised once again.",
			"Maybe that's what I enjoy the most about AI. I rarely start using a tool expecting it to change the way I work. Usually, I think it will save me a few minutes here and there.",
			"Then I discover something like Topaz Photo AI and realize that the technology isn't just making tasks faster. It's changing what I believe is possible."
		]
	}
]
