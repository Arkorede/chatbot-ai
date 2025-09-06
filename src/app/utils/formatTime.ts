export const formatTime = (timeStamp: number): string => {
  const date = new Date(timeStamp);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
