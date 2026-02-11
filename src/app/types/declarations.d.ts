declare module '*.svg' {
  import React from 'react';
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

type RootState = import('../store/store').RootState;
type AppDispatch = import('../store/store').AppDispatch;

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

declare module 'auth/LoginPage' {
  import { ComponentType } from 'react';
  const Component: ComponentType<object>;
  export default Component;
}

declare module 'auth/RegistrationPage' {
  import { ComponentType } from 'react';
  const Component: ComponentType<object>;
  export default Component;
}

declare module 'auth/ForgotPasswordPage' {
  import { ComponentType } from 'react';
  const Component: ComponentType<object>;
  export default Component;
}

declare module 'auth/ResetPasswordPage' {
  import { ComponentType } from 'react';
  const Component: ComponentType<object>;
  export default Component;
}
