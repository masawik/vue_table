import { IOrganizationData } from '@/entities/Organization/model/organizations';
import { ITableRowData } from '@/shared/components';

export const convertOrganizationDataToTableRowData =
  (data: IOrganizationData[]): ITableRowData[] => {
    return data.map(od => (
      {
        rowId: od.id,
        data: { ...od }
      }
    ));
  };
