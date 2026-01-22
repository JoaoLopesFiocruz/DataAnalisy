import axios from "axios";

export async function auth(): Promise<boolean> {
  const token = sessionStorage.getItem("token");

  if (!token) return false;

  try {
    await axios.put(
      "http://localhost:3000/users/ValidToken",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return true;
  } catch {
    return false;
  }
}
