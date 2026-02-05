export async function handleError(e) {
    if (e instanceof Error) {
        console.error("Internal error:", e.message);
    }
    else {
        console.error("Unknown error:", e);
    }
    return {
        data: null,
        Message: "Internal server error",
        Status: 500,
        Sucess: false,
    };
}
export default handleError;
//# sourceMappingURL=error.js.map