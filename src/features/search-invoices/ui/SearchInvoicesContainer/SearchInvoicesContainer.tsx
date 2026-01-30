import { useState } from 'react';
import { InvoiceList } from '@/entities/Invoice';
import { useDebounce } from '@/shared/hooks/useDebounce/useDebounce';
import { SearchInvoicesForm } from '../SearchInvoicesForm/SearchInvoicesForm';

interface SearchInvoicesContainerProps {
  targetIds: string[];
}

export const SearchInvoicesContainer = ({
  targetIds,
}: SearchInvoicesContainerProps) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  return (
    <>
      <SearchInvoicesForm value={search} onChange={setSearch} />
      <InvoiceList targetIds={targetIds} search={debouncedSearch} />
    </>
  );
};
