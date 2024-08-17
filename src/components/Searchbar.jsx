import React, { useEffect, useRef, useState } from "react";
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
import useApiStore from "../store/api-store";
import useSavedJobsStore from '../store/saved-jobs-store';

function Searchbar(params) {
  const filterJobs = useApiStore(state => state.filterJobs);
  const {fetchJobPostings} = useSavedJobsStore();
  const searchRef = useRef();
  const setSearchQuery = params.setSearchQuery;

  const [isLargerThanSmall] = useMediaQuery("(min-width: 30em)");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    console.log(selectedFilters);
  }, [selectedFilters])

  useEffect(() => {
    if(!(!params.searchQuery.keywords)) {
      searchRef.current.value = params.searchQuery.keywords;
    }
  }, [])

  const handleSearch = () => {
    fetchJobPostings({keywords: searchRef.current.value, startIndex: params.startIndex, perPage: params.perPage});
    setSearchQuery({...params.searchQuery, keywords: searchRef.current.value});
    //filterJobs(searchRef.current.value);
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
        searchQuery={params.searchQuery}
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
