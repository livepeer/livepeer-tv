function useIsHost(): boolean {
  let isHost = false;
  if (typeof window !== "undefined") {
    isHost = localStorage.getItem("isHost") === "true";
  }
  return isHost;
}

export default useIsHost;
