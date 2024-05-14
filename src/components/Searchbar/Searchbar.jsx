import React, { useRef, useState } from "react";
import {
  InputGroup,
  InputLeftElement,
  Input,
  MenuButton,
  Menu,
  MenuList,
  Flex,
  Box,
  Button,
  Heading,
  Text,
  IconButton,
  MenuOptionGroup,
  MenuDivider,
  MenuItemOption,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  SearchIcon,
  ChevronDownIcon,
  TriangleDownIcon,
} from "@chakra-ui/icons";

function Searchbar() {
  const [filter, setFilter] = useState("All");
  const [salaryRange, setSalaryRange] = useState([0, 100000]); // Initial salary range
  const searchRef = useRef();

  const [isLargerThanSmall] = useMediaQuery("(min-width: 30em)");

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleSalaryChange = (newRange) => {
    setSalaryRange(newRange);
  };

  const handleSearch = () => {
    //Apply search function
    console.log("Searching...");
  };
  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        mx="auto"
        mb="4"
        px="4"
      >
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
        <Menu closeOnSelect={false}>
          {({ isOpen }) => (
            <>
              <MenuButton
                isActive={isOpen}
                as={Button}
                rightIcon={isLargerThanSmall ? <ChevronDownIcon /> : ""}
                variant="outline"
                colorScheme="purple"
                // w={3}
              >
                {isLargerThanSmall ? "Filter" : <TriangleDownIcon />}
              </MenuButton>
              <MenuList>
                <Flex flexWrap="wrap">
                  <MenuOptionGroup title="Experience Level" type="checkbox">
                    <MenuItemOption
                      value="entry-level"
                      //   onClick={() => handleFilterChange("Entry Level")}
                    >
                      Entry-Level
                    </MenuItemOption>
                    <MenuItemOption
                      value="mid-level"
                      //   onClick={() => handleFilterChange("Mid Level")}
                    >
                      Mid-Level
                    </MenuItemOption>
                    <MenuItemOption
                      value="senior-level"
                      //   onClick={() => handleFilterChange("Senior Level")}
                    >
                      Senior-Level
                    </MenuItemOption>
                  </MenuOptionGroup>
                  <MenuDivider />
                  <MenuOptionGroup title="Employment Type" type="checkbox">
                    <MenuItemOption
                      value="contract"
                      //   onClick={() => handleFilterChange("Contract")}
                    >
                      Contract
                    </MenuItemOption>
                    <MenuItemOption
                      value="part-time"
                      //   onClick={() => handleFilterChange("Part-Time")}
                    >
                      Part-Time
                    </MenuItemOption>
                    <MenuItemOption
                      value="full-time"
                      // onClick={() => handleFilterChange("Full-Time")}
                    >
                      Full-Time
                    </MenuItemOption>
                  </MenuOptionGroup>
                  <MenuOptionGroup title="Company Size" type="checkbox">
                    <MenuItemOption
                      value="startup"
                      //   onClick={() => handleFilterChange("Startup")}
                    >
                      Startup
                    </MenuItemOption>
                    <MenuItemOption
                      value="small"
                      //   onClick={() => handleFilterChange("Small")}
                    >
                      Small (10-50)
                    </MenuItemOption>
                    <MenuItemOption
                      value="medium"
                      // onClick={() => handleFilterChange("Medium")}
                    >
                      Medium (50-150)
                    </MenuItemOption>
                    <MenuItemOption
                      value="Large"
                      // onClick={() => handleFilterChange("Large")}
                    >
                      Large (150 or more)
                    </MenuItemOption>
                  </MenuOptionGroup>
                  <MenuOptionGroup title="Location" type="checkbox">
                    <MenuItemOption
                      value="modesto"
                      //   onClick={() => handleFilterChange("Modesto")}
                    >
                      Modesto
                    </MenuItemOption>
                    <MenuItemOption
                      value="stockton"
                      //   onClick={() => handleFilterChange("Stockton")}
                    >
                      Stockton
                    </MenuItemOption>
                    <MenuItemOption
                      value="merced"
                      // onClick={() => handleFilterChange("Merced")}
                    >
                      Merced
                    </MenuItemOption>
                    <MenuItemOption
                      value="turlock"
                      // onClick={() => handleFilterChange("Turlock")}
                    >
                      Turlock
                    </MenuItemOption>
                  </MenuOptionGroup>
                </Flex>
                {/* Salary Range Slider */}
                <Flex justifyContent="center">
                  <Box width="50%" ml={2}>
                    <Heading size="sm">Salary Range</Heading>
                    <Flex alignItems="center">
                      <Text fontSize="sm" mr="2">
                        $0
                      </Text>
                      <Slider
                        flex="1"
                        aria-label="salary range slider"
                        defaultValue={salaryRange}
                        onChange={handleSalaryChange}
                        min={0}
                        max={300000} // Example maximum salary range
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                      <Text fontSize="sm" ml="2">
                        ${salaryRange}
                      </Text>
                    </Flex>
                  </Box>
                </Flex>
                <Box>
                  <Flex alignItems="center">
                    <MenuOptionGroup title="Benefits" type="checkbox">
                      <MenuItemOption
                        value="vacation-;eave"
                        //   onClick={() => handleFilterChange("Vacation Leave")}
                      >
                        Vacation Leave
                      </MenuItemOption>
                      <MenuItemOption
                        value="401k-match"
                        //   onClick={() => handleFilterChange("401k Match")}
                      >
                        401k Match
                      </MenuItemOption>
                      <MenuItemOption
                        value="company-stocks"
                        // onClick={() => handleFilterChange("Company Stocks")}
                      >
                        Company Stocks
                      </MenuItemOption>
                      <MenuItemOption
                        value="parental-leave"
                        // onClick={() => handleFilterChange("Parental Leave")}
                      >
                        Parental Leave
                      </MenuItemOption>
                    </MenuOptionGroup>
                  </Flex>
                </Box>
              </MenuList>
            </>
          )}
        </Menu>
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
    </>
  );
}

export default Searchbar;
