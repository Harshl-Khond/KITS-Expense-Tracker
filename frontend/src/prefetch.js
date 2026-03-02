import { api } from "./api";

// Simple prefetch cache to avoid duplicate requests
const prefetchedUrls = new Set();

/**
 * Prefetch an API endpoint when user hovers over a nav link.
 * Data goes into browser/axios cache, so when the page actually
 * loads and makes the same request, it's much faster.
 */
export function prefetchApi(url) {
    if (prefetchedUrls.has(url)) return; // already prefetched
    prefetchedUrls.add(url);

    // Fire and forget — don't await
    api.get(url).catch(() => { });

    // Allow re-prefetch after 30 seconds
    setTimeout(() => prefetchedUrls.delete(url), 30000);
}

/**
 * Returns an onMouseEnter handler that prefetches the API data
 * needed by a given route.
 */
export function getPrefetchHandler(path) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const email = user?.email;

    const routeApiMap = {
        "/admin-dashboard": ["/get-summary"],
        "/admin-expenses": ["/admin/get-all-expenses"],
        "/fund-dashboard": ["/get-all-funds", "/get-summary"],
        "/employee-dashboard": [`/get-employee-summary/${email}`],
        "/my-expenses": [`/get-expenses/${email}`],
    };

    return () => {
        const apis = routeApiMap[path];
        if (apis) {
            apis.forEach((url) => prefetchApi(url));
        }
    };
}
