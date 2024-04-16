export const convertToDate = (date: string) => {
    const convertedDate = new Date(Number(date));
    return convertedDate.toLocaleDateString("en-US");
};
