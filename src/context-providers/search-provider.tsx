import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export type SearchState = {
  searchValue: string;
  setSearchValueCall: (value: string) => void;
  dateInValue: string;
  setDateInValueCall: (value: string) => void;
  dateOutValue: string;
  setDateOutValueCall: (value: string) => void;
};

const SearchStateContext = createContext({} as SearchState);

interface SearchProviderInterface {
  children: React.ReactNode;
}

export const SearchProvider: React.FC<SearchProviderInterface> = ({
  children,
}) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [dateInValue, setDateInValue] = useState<string>('');
  const [dateOutValue, setDateOutValue] = useState<string>('');

  const setSearchValueCall = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const setDateInValueCall = useCallback((value: string) => {
    setDateInValue(value);
  }, []);

  const setDateOutValueCall = useCallback((value: string) => {
    setDateOutValue(value);
  }, []);

  const searchState = useMemo(
    () => ({
      searchValue,
      setSearchValueCall,
      dateInValue,
      setDateInValueCall,
      dateOutValue,
      setDateOutValueCall,
    }),
    [
      searchValue,
      setSearchValue,
      dateInValue,
      setDateInValue,
      dateOutValue,
      setDateOutValue,
    ]
  );

  return (
    <SearchStateContext.Provider value={searchState}>
      {children}
    </SearchStateContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchStateContext);
