export const base64ToFile = async (
  base64: string,
  fileName: string
): Promise<File> => {
  const response = await fetch(base64);

  const blob = await response.blob();

  return new File([blob], fileName, {
    type: blob.type,
  });
};