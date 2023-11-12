import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "sw-people",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
      // hasNextPage는 이함수가 undefined를 반환하는지에 따라 달라진다.
      // lastPage.next가 거짓인 경우 undefined를 반환
    }
    // useInfiniteQuery의 모든 것이 pageParam에 달려 있다
    // pageParam은 fetchNextPage가 어떻게 보일지 결정하고 다음 페이지가 있는지 결정한다.
    // fetchNextPage를 실행하면 next프로퍼티가 무엇인지에 따라 마지막 페이지에 도착한 다음 pageParam을 사용하게 된다.
  );
  // InfiniteScroll을 작성할 때 사용할 수 있는 data,fetchNextPage, hasNextPage 완료
  return <InfiniteScroll />;
}
