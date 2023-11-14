import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Person } from "./Person";
// ver4
// import { useInfiniteQuery } from "@tanstack/react-query";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery(
    "sw-people",
    // ver4
    // ["sw-people"],
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
      // hasNextPage는 이 함수가 undefined를 반환하는지에 따라 달라진다.
      // lastPage.next가 거짓인 경우 undefined를 반환
    }
    // useInfiniteQuery의 모든 것이 pageParam에 달려 있다
    // pageParam은 fetchNextPage가 어떻게 보일지 결정하고 다음 페이지가 있는지 결정한다.
    // fetchNextPage를 실행하면 next프로퍼티가 무엇인지에 따라 마지막 페이지에 도착한 다음 pageParam을 사용하게 된다.
  );

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div>Error {error.toString()}</div>;
  // InfiniteScroll을 작성할 때 사용할 수 있는 data,fetchNextPage, hasNextPage 완료
  return (
    <>
      {isFetching && <div className="loading">Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          // useInfiniteQuery가 해결될 때까지 정의되지 않았다고 반환하는 문제
          // how to solve?
          // 1. isLoading -> 캐시된 데이터가 없을 때 데이터를 가져온다
          // 2. IsFetching -> ux
          return pageData.results.map((person) => {
            return (
              <Person
                key={person.name}
                name={person.name}
                hairColor={person.hair_color}
                eyeColor={person.eye_color}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
