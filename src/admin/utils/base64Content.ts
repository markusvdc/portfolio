export function encodeBase64Content(content: string) {
	const bytes = new TextEncoder().encode(content)
	let binaryContent = ''

	bytes.forEach((byte) => {
		binaryContent += String.fromCharCode(byte)
	})

	return btoa(binaryContent)
}

export function decodeBase64Content(content: string) {
	const binaryContent = atob(content.replace(/\n/g, ''))
	const bytes = Uint8Array.from(binaryContent, (character) => character.charCodeAt(0))

	return new TextDecoder().decode(bytes)
}
