import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type SearchState = {
  search: string;
  setSearchValueCall: (value: string) => void;
  dateIn: string;
  setDateInValueCall: (value: string) => void;
  dateOut: string;
  setDateOutValueCall: (value: string) => void;
  guests: string;
  setGuestsValueCall: (value: string) => void;
};

const SearchStateContext = createContext({} as SearchState);

interface SearchProviderInterface {
  children: React.ReactNode;
}

enum LocalStorageFilterKeys {
  SEARCH = 'search',
  DATE_IN = 'dateIn',
  DATE_OUT = 'dateOut',
  GUESTS = 'guests',
}

export const SearchProvider: React.FC<SearchProviderInterface> = ({
  children,
}) => {
  const [search, setSearch] = useState<string>('');
  const [dateIn, setDateIn] = useState<string>('');
  const [dateOut, setDateOut] = useState<string>('');
  const [guests, setGuests] = useState<string>('');

  useEffect(() => {
    setSearch(localStorage.getItem(LocalStorageFilterKeys.SEARCH) || '');
    setDateIn(localStorage.getItem(LocalStorageFilterKeys.DATE_IN) || '');
    setDateOut(localStorage.getItem(LocalStorageFilterKeys.DATE_OUT) || '');
    setGuests(localStorage.getItem(LocalStorageFilterKeys.GUESTS) || '');
  }, []);

  const setSearchValueCall = useCallback((value: string) => {
    setSearch(value);
    localStorage.setItem(LocalStorageFilterKeys.SEARCH, value);
  }, []);

  const setDateInValueCall = useCallback((value: string) => {
    setDateIn(value);
    localStorage.setItem(LocalStorageFilterKeys.DATE_IN, value);
  }, []);

  const setDateOutValueCall = useCallback((value: string) => {
    setDateOut(value);
    localStorage.setItem(LocalStorageFilterKeys.DATE_OUT, value);
  }, []);

  const setGuestsValueCall = useCallback((value: string) => {
    setGuests(value);
    localStorage.setItem(LocalStorageFilterKeys.GUESTS, value);
  }, []);

  const searchState = useMemo(
    () => ({
      search,
      setSearchValueCall,
      dateIn,
      setDateInValueCall,
      dateOut,
      setDateOutValueCall,
      guests,
      setGuestsValueCall,
    }),
    [
      search,
      setSearch,
      dateIn,
      setDateIn,
      dateOut,
      setDateOut,
      guests,
      setGuests,
    ]
  );

  return (
    <SearchStateContext.Provider value={searchState}>
      {children}
    </SearchStateContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchStateContext);
