import { useState } from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@/shared/ui/Button/Button';
import { VStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';
import {
  useCreateDepartmentMutation,
  useCreateEmployeeMutation,
  useUpdateDepartmentMutation,
  useCreateAuthDataMutation,
} from '../api/importApi';

interface ExcelRow {
  ФИО: string;
  Email: string;
  Телефон: string;
  Должность: string;
  Отдел: string;
  Лимит: number;
}

export const ImportDataAboutCompanyButton = ({
  companyId,
}: {
  companyId?: string;
}) => {
  const [createDept] = useCreateDepartmentMutation();
  const [updateDept] = useUpdateDepartmentMutation();
  const [createEmp] = useCreateEmployeeMutation();
  const [createAuth] = useCreateAuthDataMutation();

  const [fileData, setFileData] = useState<ExcelRow[] | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const data = XLSX.utils.sheet_to_json<ExcelRow>(wb.Sheets[wsname]);

      if (data.length > 0 && data[0]['ФИО'] && data[0]['Email']) {
        setFileData(data);
      } else {
        alert(
          'Ошибка: Неверная структура Excel. Проверьте заголовки (ФИО, Email, Отдел и т.д.)',
        );
      }
    };
    reader.readAsBinaryString(file);
  };

  const startImport = async () => {
    if (!fileData || !companyId) return;
    setIsImporting(true);

    try {
      const uniqueDeptNames = [
        ...new Set(fileData.map((item) => item['Отдел'])),
      ].filter(Boolean);
      const deptMap: Record<string, string> = {};
      const employeesByDept: Record<string, string[]> = {};

      for (const name of uniqueDeptNames) {
        const res = await createDept({
          name,
          companyId,
          limit: 1000000,
          spent: 0,
          employeesIds: [],
        }).unwrap();
        deptMap[name] = res.id;
        employeesByDept[res.id] = [];
      }

      for (const row of fileData) {
        const password = Math.random().toString(36).slice(-8);
        const deptId = deptMap[row['Отдел']] || null;

        await createAuth({
          email: row['Email'],
          password,
        }).unwrap();

        const newEmp = await createEmp({
          name: row['ФИО'],
          email: row['Email'],
          phone: String(row['Телефон']),
          position: row['Должность'],
          limit: row['Лимит'] || 0,
          balance: row['Лимит'] || 0,
          role: 'user',
          companyId,
          departmentId: deptId,
          status: 'active',
          spent: 0,
          experimentalFeatures: false,
          notifications: {
            newEmployees: false,
          },
        }).unwrap();

        if (deptId) {
          employeesByDept[deptId].push(newEmp.id);
        }
      }

      for (const deptId in employeesByDept) {
        await updateDept({
          id: deptId,
          employeesIds: employeesByDept[deptId],
        }).unwrap();
      }

      window.location.reload();
    } catch (err) {
      console.error('Import failed:', err);
      alert('Произошла ошибка при импорте. Проверьте консоль.');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <VStack gap={8}>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFile}
        id="import-excel"
        hidden
      />
      <Button variant="clear" offset={0} disabled={isImporting}>
        <Card
          as="label"
          htmlFor="import-excel"
          p={0}
          style={{ cursor: 'pointer' }}
        >
          <Text as="span" align="center">
            {fileData ? 'Файл готов к отправке' : 'Импортировать базу'}
          </Text>
        </Card>
      </Button>

      {fileData && (
        <Button onClick={startImport} disabled={isImporting}>
          {isImporting ? 'Загрузка...' : 'ОК'}
        </Button>
      )}
    </VStack>
  );
};
