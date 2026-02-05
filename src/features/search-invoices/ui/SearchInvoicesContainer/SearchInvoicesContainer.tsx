import { useState } from 'react';
import { InvoiceList } from '@/entities/Invoice';
import { useDebounce } from '@/shared/hooks/useDebounce/useDebounce';
import { SearchInvoicesForm } from '../SearchInvoicesForm/SearchInvoicesForm';

interface SearchInvoicesContainerProps {
  targetIds?: string[];
  companyId?: string;
}

export const SearchInvoicesContainer = ({
  targetIds,
  companyId,
}: SearchInvoicesContainerProps) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  return (
    <>
      <SearchInvoicesForm
        value={search}
        onChange={setSearch}
        data-testid="SearchInvoices"
      />
      <InvoiceList
        targetIds={targetIds}
        companyId={companyId}
        search={debouncedSearch}
      />
    </>
  );
};
