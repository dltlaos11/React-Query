import { useQuery } from 'react-query';

import type { Treatment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
// 전역 오류 핸들러 지정
// import { useCustomToast } from '../../app/hooks/useCustomToast';

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

export function useTreatments(): Treatment[] {
  // 모든 Toast에 스타이링을 추가하기 때문에 그러면 매번 스타일링을 추가할 필요 없다
  // const toast = useCustomToast(); // onError 콜백에 사용할 수 있는 toast 함수

  const fallback = [];
  const { data = fallback } = useQuery(
    queryKeys.treatments,
    getTreatments,
    //   , {
    //   onError: (error) => {
    //     // 만약 err가 Js Error 클래스의 인스턴스라면
    //     const title = error instanceof Error ? error.message : 'error on Server';
    //     toast({ title, status: 'error' });
    //   },
    // }
  );

  return data;
}
