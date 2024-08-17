import React from 'react'
import {
    InputGroup,
    InputLeftElement,
    Input,
    useMediaQuery,
  } from '@chakra-ui/react';
  import { SearchIcon } from '@chakra-ui/icons';

function SearchInput({isLargerThanSmall, searchRef, searchQuery}) {
  return (
    <InputGroup flex="1">
    {isLargerThanSmall ? (
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
    ) : (
      ""
    )}
    <Input type="text" ref={searchRef} placeholder="Search..." />
  </InputGroup>
  )
}

export default SearchInput
