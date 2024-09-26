export const stripSubnet = (ip: string) => {
  const parts = ip.split("/");
  return parts[0];
};
