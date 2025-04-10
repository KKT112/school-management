import { createContext, useContext } from "react";
import { useTeacherCtrl } from "./ctrl";

type TContextProps = ReturnType<typeof useTeacherCtrl>;

const TecaherContext = createContext<TContextProps | undefined>(undefined);

interface IProviderProps {
  children: React.ReactNode;
}

export default function TeacherContextProvider({children}:IProviderProps) {
  return (
    
    <TecaherContext.Provider value={ {...useTeacherCtrl()}}>
     {children}
    </TecaherContext.Provider>
  )

}

// eslint-disable-next-line react-refresh/only-export-components
export const useContextProvider = () => {
  const cntx = useContext(TecaherContext);

  if (!cntx) {
    throw new Error("Context is not defined");
  }

  return cntx;
};
