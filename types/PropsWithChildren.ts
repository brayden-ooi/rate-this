import { ComponentChildren } from "preact";

type PropsWithChildren<T = Record<string, unknown>> = T & {
  children: ComponentChildren;
};

export default PropsWithChildren;
