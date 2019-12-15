interface IClassNames {
  [key: string]: boolean;
}

export function classnames(classes: IClassNames): string {
  return Object.keys(classes)
    .filter((key: string): boolean => classes[key])
    .reduce((accu: string, curr: string): string => `${accu} ${curr}`, '');
}
