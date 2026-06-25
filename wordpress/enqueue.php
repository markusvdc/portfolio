<?php

function markus_vite_asset_manifest(): array {
	$manifest_path = get_theme_file_path('dist/.vite/manifest.json');

	if (!file_exists($manifest_path)) {
		return [];
	}

	$manifest = json_decode((string) file_get_contents($manifest_path), true);

	return is_array($manifest) ? $manifest : [];
}

function markus_vite_enqueue_entry(string $entry, string $handle): void {
	$manifest = markus_vite_asset_manifest();

	if (!isset($manifest[$entry])) {
		return;
	}

	$asset_uri = trailingslashit(get_theme_file_uri('dist'));
	$asset = $manifest[$entry];

	if (!empty($asset['css']) && is_array($asset['css'])) {
		foreach ($asset['css'] as $index => $css_file) {
			wp_enqueue_style(
				"{$handle}-{$index}",
				$asset_uri . $css_file,
				[],
				null
			);
		}
	}

	wp_enqueue_script(
		$handle,
		$asset_uri . $asset['file'],
		[],
		null,
		true
	);
	wp_script_add_data($handle, 'type', 'module');
}

function markus_enqueue_site_assets(): void {
	if (is_admin()) {
		return;
	}

	markus_vite_enqueue_entry('index.html', 'markus-site');
}
add_action('wp_enqueue_scripts', 'markus_enqueue_site_assets');

function markus_enqueue_admin_assets(): void {
	markus_vite_enqueue_entry('admin.html', 'markus-admin');
}
add_action('admin_enqueue_scripts', 'markus_enqueue_admin_assets');
