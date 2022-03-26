import adapter from "../index.js";

const expectException = (callback) => {
    try {
        callback();
        throw new Error("unexpected exception");
    } catch (error) {
        if (error.message === "unexpected exception") {
            throw error;
        }
    }
};
/**
 * Test simple
 */
adapter();

/**
 * Test single static site
 */
adapter({
    spec: "test/single.yaml",
});

/**
 * Test no static site
 */
expectException(() =>
    adapter({
        spec: "test/invalid.yaml",
    })
);

/**
 * Test multiple static sites
 */
adapter({
    spec: "test/multiple.yaml",
});

/**
 * Test multiple static sites with name
 */
adapter({
    spec: "test/multiple.yaml",
    name: "ipsum",
});

/**
 * Test unknown name.
 */
expectException(() => {
    adapter({
        spec: "test/multiple.yaml",
        name: "doesnt exist",
    });
});

/**
 * Test invalid configuration
 */
expectException(() =>
    adapter({
        spec: "test/multiple.yaml",
        fallback: "fail.html",
    })
);

console.log("Test passed!");
