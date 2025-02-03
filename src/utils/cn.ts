function cn(...classNames: any[]) {
  return classNames.filter((e) => e).join(" ");
}
export default cn;
