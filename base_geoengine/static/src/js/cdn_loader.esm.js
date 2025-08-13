/** @odoo-module **/

/* global document */
/* global console */

/**
 * CDN Library Loader for Geoengine
 * Loads OpenLayers, Chroma.js, and Geostats from CDN
 */

let librariesLoaded = false;

export async function loadCDNLibraries() {
    if (librariesLoaded) return;

    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) {
                resolve();
                return;
            }
            const script = document.createElement("script");
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    };

    const loadCSS = (href) => {
        if (document.querySelector(`link[href="${href}"]`)) return;
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
    };

    try {
        // Load OpenLayers CSS
        loadCSS("https://cdn.jsdelivr.net/npm/ol@v10.6.0/ol.css");

        // Load libraries
        await loadScript("https://cdn.jsdelivr.net/npm/ol@v10.6.0/dist/ol.js");
        await loadScript("https://cdn.jsdelivr.net/npm/chroma-js@1.4.1/chroma.min.js");
        await loadScript(
            "https://cdn.jsdelivr.net/npm/geostats@2.1.0/lib/geostats.min.js"
        );

        // Verify libraries are loaded
        if (typeof ol === "undefined") {
            throw new Error("OpenLayers library not loaded from CDN");
        }
        if (typeof chroma === "undefined") {
            throw new Error("Chroma.js library not loaded from CDN");
        }
        if (typeof geostats === "undefined") {
            throw new Error("Geostats library not loaded from CDN");
        }

        librariesLoaded = true;
    } catch (error) {
        console.error("Failed to load CDN libraries:", error);
        throw error;
    }
}
