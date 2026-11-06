declare const process: {
  env: {
    KEYWISE_API_PATH?: string;
  };
};

type CSSModuleClasses = { readonly [key: string]: string };

declare module '*.module.css' {
  const classes: CSSModuleClasses;
  export = classes;
}

declare module '*.css' {
  const css: string;
  export default css;
}
