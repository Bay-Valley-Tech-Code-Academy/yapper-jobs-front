import React, { useRef, useState } from "react";
import {
  InputGroup,
  InputLeftElement,
  Input,
  Flex,
  Button,
  IconButton,
  useMediaQuery,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import FilterMenu from "./FilterMenu";
import SearchInput from "./SearchInput";

function Searchbar() {
  const searchRef = useRef();

  const [isLargerThanSmall] = useMediaQuery("(min-width: 30em)");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSearch = () => {
    console.log(selectedFilters);
  };

  const handleFilterClick = (filters) => {
    setSelectedFilters(filters);
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      mx="auto"
      mb="4"
      px="4"
    >
      <SearchInput
        isLargerThanSmall={isLargerThanSmall}
        searchRef={searchRef}
      />
      {/* Filter Options */}
      <FilterMenu
        isLargerThanSmall={isLargerThanSmall}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        onFilterClick={handleFilterClick}
      />
      <Flex align="center" ml="2">
        <IconButton
          aria-label="Search"
          icon={<SearchIcon />}
          colorScheme="purple"
          display={["block", "none"]}
          onClick={handleSearch}
        />
        <Button
          onClick={handleSearch}
          colorScheme="purple"
          display={["none", "block"]}
        >
          Search
        </Button>
      </Flex>
    </Flex>
  );
}

export default Searchbar;
