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
		title: 'How to remove italic text in VS Code for Front-end projects',
		slug: 'remove-italic-vscode-front-end',
		date: '2026-06-19',
		readingTime: '2 min read',
		summary: 'If italic text in VS Code makes your code harder to read, this guide is for you. Learn how to disable italics for common Front-end tokens using a ready-to-use configuration tested with HTML, CSS, SCSS, SASS, JavaScript, TypeScript, React, PHP and WordPress.',
		content: [
			"If you use a stylish VS Code theme, you've probably noticed comments, parameters, classes, or types showing up in italics. I know a lot of developers like this look, but after years of coding I realized I prefer everything without italics. In my opinion, the code becomes cleaner and, more importantly, easier to read, especially in larger projects.",
			"It's a small change, but it noticeably improved my day-to-day experience. The tricky part is that there isn't a single setting that disables italics everywhere. Some elements are styled using TextMate Tokens, others use Semantic Tokens, and themes can apply their own rules on top of that.",
			"After some testing, I ended up with the configuration below. It's focused on Front-end development and removes most italic styles I encounter on a daily basis. It has been tested with: HTML, CSS, SCSS, SASS, JavaScript, TypeScript, React, PHP and WordPress.",
			"How to Add It, open the Command Palette “Ctrl + Shift + P”, search for “Preferences: Open Settings (JSON)” this will open your settings.json file. Now simply add the following configuration:",
			'<a href="https://gist.github.com/markusvdc/c5647e5b480922a7d36672f6902e709a" target="_blank" rel="noopener noreferrer">https://gist.github.com/markusvdc/c5647e5b480922a7d36672f6902e709a</a>',
			"That's it. If you mainly work with Front-end technologies, this configuration should remove most italic styles from your editor. And if you're like me and think code is easier to read when it doesn't look like it's written on a wedding invitation, you'll probably like the result."
		]
	},
	{
		title: 'Learning ImageMagick for image conversion and optimization',
		slug: 'learning-imagemagick-images-conversion-optimization',
		date: '2026-06-18',
		readingTime: '3 min read',
		summary: 'A simple introduction to ImageMagick, a free and open source tool for converting and optimizing images from the command line. Learn how to install it, convert PNG to WEBP, reduce file size and process multiple images at once with just a few simple commands every day.',
		content: [
			"I've been using ImageMagick to convert and optimize images directly from the command line, and one of the things I like most about it is how simple it is. ImageMagick is a free and open source tool capable of editing, converting and processing images in hundreds of formats. It has been around for many years, is extremely mature and works on Windows, Linux and macOS.",
			"I first started using it for a very common task: converting PNG files to WEBP. Instead of opening an editor, exporting the image, choosing options and repeating the process for every file, I can do everything with a single command.",
			'The installation is straightforward. Just access the official website: <a href="https://imagemagick.org/" target="_blank" rel="noopener noreferrer">https://imagemagick.org/</a> go to the download section and download the recommended installer. The file name is usually something like: ImageMagick-7.x.x-Q16-HDRI-x64-dll.exe. During installation, there\'s one option worth paying attention to: "Add application directory to your system PATH".',
			"This option allows you to use the magick command from any terminal window. It's a small detail, but it makes the experience much better. After installation, open the Command Prompt or any terminal you prefer and run: “magick -version” If you see something like: “Version: ImageMagick 7.1.2” everything is working correctly. From there, the interesting part begins.",
			'Imagine you have an image called: “foto.png” to convert it to WEBP “magick foto.png foto.webp”, that\'s it. No extra parameters are required and the conversion happens almost instantly. If your goal is to reduce the file size, you can adjust the quality level: “magick foto.png -quality 80 foto.webp”, the -quality parameter controls compression. In general, lower values produce smaller files, while higher values preserve more image quality.',
			'For many cases, values between 70 and 85 offer a good balance between size and visual quality. What surprised me the most is how practical this becomes when dealing with multiple images. Suppose you have an entire folder full of PNG files and want to convert them all to WEBP while applying compression. You can do: “magick mogrify -format webp -quality 80 *.png”, the command processes every PNG file in the current folder automatically. This is where ImageMagick starts to shine.',
			'Tasks that would normally take several minutes — or even hours if there are many files — become something you execute once and forget about.',
			"And image conversion is only a small part of what it can do. ImageMagick also supports resizing, cropping, rotating, adding borders, adjusting colors, creating thumbnails, applying effects and automating complete image workflows through scripts. Because everything happens through the terminal, it's easy to integrate it with build processes, deploy scripts or any other automation you already use.",
			"There are many modern tools for image optimization today, but I like how ImageMagick follows a different philosophy: simple commands, lots of flexibility and the ability to process thousands of files without needing a graphical interface. For anyone who works with websites, blogs or any project that deals with images regularly, it's one of those tools worth keeping installed."
		]
	},
	{
		title: 'Learning React, Vite and TypeScript with the help of Codex',
		slug: 'learning-react-vite-help-codex',
		date: '2026-06-18',
		readingTime: '4 min read',
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
		title: 'How Topaz Photo AI surprised me with image enhancement',
		slug: 'topaz-photo-surprised-image-enhancement',
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
