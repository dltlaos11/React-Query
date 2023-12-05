import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "react-query";
// ver4
// import { useInfiniteQuery } from "@tanstack/react-query";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery(
    "sw-species",
    // ver4
    // ["sw-species"],
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    // useInfiniteQuery의 pageParam사용해서 fetchUrl실행
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
      // lastPage의 다음페이지를 불러와 새 페이지 데이터가 있을 때마다 pageParam에 지정
    }
  );

  if (isLoading) return <div className="loading">Loading...</div>;
  // 캐시된 데이터가 없어 새 데이터를 가져올 때
  if (isError) return <div>Error {error.toString()}</div>;

  return (
    <>
      {
        isFetching && <div className="loading">Loading...</div>
        // loadMore 함수
        // fetchNextPage가 되고 fetchNextPage는 useInfiniteQuery의 영향을 받아
        // 어떤 쿼리 함수든 pageParam 값을 쓰게 되고 pageParam값은 데이터가 추가되면 갱신
        // hasMore 함수
        // InfiniteScroll 컴포넌트가 계속 데이터를 불러올지를 결정
        // useInfiniteQuery의 hasNextPage 프로퍼티 영향을 받음 pageParam이 정의되지 않아
        // 거짓이 되는 경우나 다음 프로퍼티가 없는 경우를 정의

        // useQuery 함수
        // 쿼리 함수의 결과를 그대로 출력
        // useInfiniteQuery 함수
        // 쿼리 함수의 data 프로퍼티에 pages를 사용, pageParam에 필요한 데이터 배열이 존재
      }
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          // useInfiniteQuery가 해결될 때까지 정의되지 않았다고 반환하는 문제
          // how to solve?
          // 1. isLoading -> 캐시된 데이터가 없을 때 데이터를 가져온다
          // 2. IsFetching -> ux
          return pageData.results.map((species) => {
            return (
              <Species
                key={species.name}
                name={species.name}
                language={species.language}
                averageLifespan={species.average_lifespan}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
