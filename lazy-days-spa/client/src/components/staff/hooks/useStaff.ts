import { Dispatch, SetStateAction, useState } from 'react';
import { useQuery } from 'react-query';

import type { Staff } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { filterByTreatment } from '../utils';
// import { useQuery } from '@chakra-ui/react';

// for when we need a query function for useQuery
async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff');
  return data;
}

interface UseStaff {
  staff: Staff[];
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

export function useStaff(): UseStaff {
  const fallback = [];
  const [filter, setFilter] = useState('all');

  // TODO: get data from server via useQuery
  const { data: staff = fallback } = useQuery(queryKeys.staff, getStaff); // 키, 쿼리함수
  // 구조 분해 프로퍼티의 이름을 data에서 staff로 바꿔서, 반환 객체에 staff를 반환할 수 있도록 만듦

  return { staff, filter, setFilter };
}
