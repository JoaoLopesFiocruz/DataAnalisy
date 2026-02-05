import type { MethodResponse } from "../Types/MethodResponse.js";

export async function handleError(
  e: unknown
): Promise<MethodResponse<null>> {
  if (e instanceof Error) {
    console.error("Internal error:", e.message);
  } else {
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