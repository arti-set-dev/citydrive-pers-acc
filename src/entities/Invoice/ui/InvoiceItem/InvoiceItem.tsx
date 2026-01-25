import { getHStack } from '@/shared/lib/stack/flex/getHStack';
import { Card } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';
import { Invoice } from '../../model/types/invoice';
import { AppLink } from '@/shared/ui/AppLink/AppLink';

interface InvoiceItemProps {
  invoice: Invoice;
}

const stack = getHStack({
  gap: 16,
  justify: 'space-between',
});

export const InvoiceItem = ({ invoice }: InvoiceItemProps) => {
  const onDownload = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const [{ pdf }, { InvoiceDocument }, { saveAs }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('@/entities/Invoice'),
        import('file-saver'),
      ]);

      const blob = await pdf(<InvoiceDocument payload={invoice} />).toBlob();
      saveAs(blob, `${invoice.title}.pdf`);
    } catch (error) {
      console.error('Ошибка при скачивании PDF:', error);
    }
  };
  return (
    <Card
      p={16}
      variant="bg-outline"
      className={stack.className}
      style={stack.style}
      r={16}
    >
      <Text weight="medium" size={28}>
        {invoice.title}
      </Text>
      <AppLink to="#" variant="brand" onClick={onDownload}>
        Скачать отчёт
      </AppLink>
    </Card>
  );
};
