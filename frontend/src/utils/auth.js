export const parseJwt = (token) => {
  if (!token) return null;
  try {
    const base64Payload = token.split(".")[1];
    const payload = atob(base64Payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(payload);
  } catch {
    return null;
  }
};

export const getCurrentUserId = () => {
  const token = localStorage.getItem("token");
  const data = parseJwt(token);
  return data?.id || null;
};
