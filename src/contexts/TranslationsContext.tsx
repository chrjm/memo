import { createContext } from "react";

export const TranslationsContext = createContext<{
  translations: { [key: string]: { [key: string]: string } };
  setTranslations: React.Dispatch<
    React.SetStateAction<{ [key: string]: { [key: string]: string } }>
  >;
}>({} as any);
