# svelte-adapter-static-digitalocean

Adapter for Svelte apps that extends the official [@sveltejs/adapter-static](https://github.com/sveltejs/kit/tree/master/packages/adapter-static) and does the following to support [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform) out-of-the-box.

The adapter will also look for an [App Spec](https://docs.digitalocean.com/products/app-platform/concepts/app-spec/) file and adapt the configuration accordingly.

If `static_sites` is provided in the specifications, the adapter will use the first entry. If you want to use a different one, you will need to provide a `name` value to the adapter configuration. It will use the value of `error_document` for the fallback.

If no specification is found or provided, the `fallback` falls back to `404.html` - which is the default for DigitalOcean App Platform.

## Configuration

run `npm install svelte-adapter-static-digitalocean`.

Then add the adapter to your `svelte.config.js`:

```js
import adapter from 'svelte-adapter-static-digitalocean';

export default {
    kit: {
        ...
        adapter: adapter({
            // default options are shown
            pages: 'build',
            assets: 'build',
            fallback: '404.html',
            precompress: false,
            strict: true,
            spec: '.do/spec.yaml',
            name: ''
        })
    }
};
```

...and add the prerender option to your root layout (`src/routes/+layout.js|ts`):

```js
// This can be false if you're using a fallback (i.e. SPA mode)
export const prerender = true;
```

> Please check out the [@sveltejs/adapter-static](https://github.com/sveltejs/kit/tree/master/packages/adapter-static) readme for more options.

## Issues / Bugs
Please report issues in the [here](https://github.com/torstendittmann/svelte-adapter-static-digitalocean/issues).
