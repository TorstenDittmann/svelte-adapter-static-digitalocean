import adapter from "@sveltejs/adapter-static";
import YAML from "yaml";
import { readFileSync, existsSync } from "fs";

/** @type {import('@sveltejs/adapter-static')} */
export default function ({
    pages = "build",
    assets = pages,
    fallback = "404.html",
    precompress = false,
    strict = true,
    spec = ".do/spec.yaml",
    name = "",
} = {}) {
    if (existsSync(spec)) {
        const file = readFileSync(spec, "utf8");
        const config = YAML.parse(file);

        /**
         * Throw error if specification is invalid.
         */
        if (!"static_sites" in config) {
            throw new Error("static_sites not found in " + spec);
        }
        if (
            !(
                Array.isArray(config.static_sites) &&
                config.static_sites.length !== 0
            )
        ) {
            throw new Error("static_sites is invalid in " + spec);
        }

        /**
         * Pick first service or determined by name.
         */
        const service = name
            ? config.static_sites.find((s) => s.name === name)
            : config.static_sites[0];

        if (!service) {
            throw new Error("Service not found in specification.");
        }
        /**
         * Set fallback file.
         */
        if (service?.error_document) {
            fallback = service.error_document;
        } else if (fallback !== "404.html") {
            throw new Error(
                "You cannot specify fallback and spec at the same time."
            );
        }
    }

    return {
        ...adapter({
            pages,
            assets,
            fallback,
            strict,
            precompress,
        }),
        name: "svelte-adatpter-static-digitalocean",
    };
}
