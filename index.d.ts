import { Adapter } from '@sveltejs/kit';

interface AdapterOptions {
	pages?: string;
	assets?: string;
	fallback?: string;
	precompress?: boolean;
	spec?: string;
	name?: string;
}

declare function plugin(options?: AdapterOptions): Adapter;

export = plugin;
