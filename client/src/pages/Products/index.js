import { Box, Grid, Flex, Button } from '@chakra-ui/react'
import React from 'react'
import { useInfiniteQuery } from 'react-query'
import { fetchProductList } from '../../api'
import Card from '../../components/Card'

export default function Products() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProductList,
    getNextPageParam: (lastPage, pages) => {
      const morePagesExist = lastPage?.length === 12;

      if (!morePagesExist) return
      return pages.length + 1
    }
  })

  return status === 'loading' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>An error has occured: {error.message}</p>
  ) : (
    <>
      <Grid templateColumns="repeat(5,1fr)" gap={100}>
        {
          data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {
                group.map((item) => (
                  <Box w="100%" key={item._id}>
                    <Card item={ item } />
                  </Box>
                ))
              }
            </React.Fragment>
          ))
        }
      </Grid>
      <Flex mt="10" justifyContent="center">
        <Button
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
          isDisabled={!hasNextPage || isFetchingNextPage}
        >
          { hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </Button>
      </Flex>
    </>
  )
}
