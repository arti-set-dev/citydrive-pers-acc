import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { Invoice } from '../../model/types/invoice';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/fonts/Roboto-Regular.ttf', fontWeight: 400 },
    { src: '/fonts/Roboto-Bold.ttf', fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Roboto', fontSize: 10, color: '#333' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    alignItems: 'center',
  },
  logoBox: { flexDirection: 'column' },
  brand: { fontSize: 20, fontWeight: 700, color: '#2C3E50' },
  brandSub: {
    fontSize: 8,
    border: '1px solid #000',
    padding: 2,
    textAlign: 'center',
    marginTop: 2,
  },

  invoiceInfo: { marginBottom: 20 },
  title: { fontSize: 16, fontWeight: 700, marginBottom: 5 },
  date: { fontSize: 10, marginBottom: 15 },

  requisites: { marginBottom: 20, lineHeight: 1.5 },

  table: { display: 'flex', width: 'auto', marginBottom: 20 },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
    minHeight: 25,
    alignItems: 'center',
  },
  tableHeader: { backgroundColor: '#F0F0F0', fontWeight: 700 },
  colNo: { width: '10%', textAlign: 'center' },
  colDesc: { width: '50%', paddingLeft: 5 },
  colQty: { width: '10%', textAlign: 'center' },
  colPrice: { width: '15%', textAlign: 'right' },
  colSum: { width: '15%', textAlign: 'right', paddingRight: 5 },

  totals: { marginLeft: 'auto', width: '40%' },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  totalBold: { fontWeight: 700, fontSize: 12, color: '#27AE60', marginTop: 10 },

  footer: { marginTop: 40, fontSize: 9, lineHeight: 1.4 },
  signature: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  signLine: {
    borderBottom: '1px solid #000',
    width: 150,
    textAlign: 'center',
    fontSize: 8,
  },
});

export const InvoiceDocument = ({ payload }: { payload: Invoice }) => {
  const { from, to } = payload.period;
  const dateRange =
    from && to
      ? `с ${new Date(from).toLocaleDateString('ru-RU')} по ${new Date(to).toLocaleDateString('ru-RU')}`
      : '';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <Text style={styles.brand}>СИТИДРАЙВ</Text>
            <Text style={styles.brandSub}>ДЛЯ БИЗНЕСА</Text>
          </View>
          <Text style={{ color: '#999' }}>{payload.bank}</Text>
        </View>

        <View style={styles.invoiceInfo}>
          <Text style={styles.title}>{payload.title}</Text>
          <Text style={styles.date}>
            от {new Date().toLocaleDateString('ru-RU')} г.
          </Text>
        </View>

        <View style={styles.requisites}>
          <Text>Рек: {payload.legalEntity}</Text>
          <Text>ИНН: {payload.INN}</Text>
          <Text>БИК: {payload.BIC}</Text>
          <Text>Банк: {payload.bank}</Text>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.colNo}>№</Text>
            <Text style={styles.colDesc}>Наименование</Text>
            <Text style={styles.colQty}>Колич..</Text>
            <Text style={styles.colPrice}>Цена</Text>
            <Text style={styles.colSum}>Сумма</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.colNo}>1</Text>
            <Text style={styles.colDesc}>
              Пополнение баланса за период {dateRange}
            </Text>
            <Text style={styles.colQty}>1</Text>
            <Text style={styles.colPrice}>{payload.amount} ₽</Text>
            <Text style={styles.colSum}>{payload.amount} ₽</Text>
          </View>
        </View>

        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text>Итоговая сумма:</Text>
            <Text>{payload.amount} ₽</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Без налога (НДС):</Text>
            <Text>{payload.amount} ₽</Text>
          </View>
          <View style={[styles.totalRow, styles.totalBold]}>
            <Text>Итого к оплате:</Text>
            <Text>{payload.amount} ₽</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>
            Оплатите счёт в течение трёх рабочих дней через банк с р/с
            плательщика.
          </Text>
          <Text>Деньги автоматически поступают на ваш баланс.</Text>
        </View>

        <View style={styles.signature}>
          <View>
            <Text>Генеральный директор</Text>
            <View style={[styles.signLine, { marginTop: 20 }]}>
              <Text>Войтов К.В.</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
