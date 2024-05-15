import React, { useState } from "react";
import {
  MenuButton,
  Menu,
  MenuList,
  Flex,
  Box,
  Button,
  Heading,
  Text,
  MenuOptionGroup,
  MenuItemOption,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Wrap,
  MenuItem,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  SmallCloseIcon,
  TriangleDownIcon,
} from "@chakra-ui/icons";
import {
  certificationOptions,
  benefitOptions,
  locationOptions,
  experienceOptions,
  employmentOptions,
  companySizeOptions,
  industryOptions,
} from "../options";

function FilterMenu({
  isLargerThanSmall,
  selectedFilters,
  setSelectedFilters,
  onFilterClick,
}) {
  const [salaryRange, setSalaryRange] = useState([150000]); // Initial salary range

  const handleFilterClick = (value, group) => {
    const updatedFilters = { ...selectedFilters };
    if (!updatedFilters[group]) {
      updatedFilters[group] = [value];
    } else {
      if (!updatedFilters[group].includes(value)) {
        updatedFilters[group].push(value);
      } else {
        updatedFilters[group] = updatedFilters[group].filter(
          (item) => item !== value
        );
      }
    }
    onFilterClick(updatedFilters);
  };

  const handleSalaryChange = (newRange) => {
    setSalaryRange(newRange);
    setSelectedFilters({ ...selectedFilters, Salary: newRange });
  };

  return (
    <>
      <Menu closeOnSelect={false} isLazy>
        {({ isOpen }) => (
          <>
            <MenuButton
              isActive={isOpen}
              as={Button}
              rightIcon={isLargerThanSmall ? <ChevronDownIcon /> : ""}
              variant="outline"
              colorScheme="purple"
            >
              {isLargerThanSmall ? "Filter" : <TriangleDownIcon />}
            </MenuButton>
            <MenuList mr={8}>
              <Wrap spacing="4px">
                <Flex
                  flexWrap="wrap"
                  direction={isLargerThanSmall ? "row" : "column"}
                >
                    {/* Clears the filters selected */}
                  <MenuItem onClick={() => setSelectedFilters({})}>
                    Clear <SmallCloseIcon />
                  </MenuItem>
                  {/* Experience Level */}
                  <MenuOptionGroup title="Experience Level" type="checkbox">
                    {experienceOptions.map((option) => (
                      <MenuItemOption
                        key={`experience${option.id}`}
                        value={option.value}
                        onClick={() =>
                          handleFilterClick(option.label, "Experience")
                        }
                      >
                        {option.label}
                      </MenuItemOption>
                    ))}
                  </MenuOptionGroup>
                </Flex>
                <Flex direction={isLargerThanSmall ? "row" : "column"}>
                  {/* Employment Type */}
                  <MenuOptionGroup title="Employment Type" type="checkbox">
                    {employmentOptions.map((option) => (
                      <MenuItemOption
                        key={`employment${option.id}`}
                        value={option.value}
                        onClick={() =>
                          handleFilterClick(option.label, "Employment")
                        }
                      >
                        {option.label}
                      </MenuItemOption>
                    ))}
                  </MenuOptionGroup>
                  {/* Company Size */}
                  <MenuOptionGroup title="Company Size" type="checkbox">
                    {companySizeOptions.map((option) => (
                      <MenuItemOption
                        key={`size${option.id}`}
                        value={option.value}
                        onClick={() =>
                          handleFilterClick(option.label, "Company Size")
                        }
                      >
                        {option.label}
                      </MenuItemOption>
                    ))}
                  </MenuOptionGroup>
                  {/* Location */}
                  <MenuOptionGroup title="Location" type="checkbox">
                    {locationOptions.map((option) => (
                      <MenuItemOption
                        key={`location${option.id}`}
                        value={option.value}
                        onClick={() =>
                          handleFilterClick(option.label, "Location")
                        }
                      >
                        {option.label}
                      </MenuItemOption>
                    ))}
                  </MenuOptionGroup>
                  {/* Benefits */}
                  <MenuOptionGroup title="Benefits" type="checkbox">
                    {benefitOptions.map((option) => (
                      <MenuItemOption
                        key={`benefits${option.id}`}
                        value={option.value}
                        onClick={() =>
                          handleFilterClick(option.label, "Benefits")
                        }
                      >
                        {option.label}
                      </MenuItemOption>
                    ))}
                  </MenuOptionGroup>
                  {/* Certifications */}
                  <MenuOptionGroup title="Certifications" type="checkbox">
                    {certificationOptions.map((option) => (
                      <MenuItemOption
                        key={`certifications${option.id}`}
                        value={option.value}
                        onClick={() =>
                          handleFilterClick(option.label, "Certifications")
                        }
                      >
                        {option.label}
                      </MenuItemOption>
                    ))}
                  </MenuOptionGroup>
                </Flex>
              </Wrap>
              {/* Salary Range Slider */}
              <Flex justifyContent="center">
                <Box width="50%" ml={6} bottom={4}>
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
                      max={300000} //Maximum salary range
                      onTouchStart={(e) => e.preventDefault()}
                      onTouchMove={(e) => e.preventDefault()}
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
              {/* Industry */}
              <Wrap spacing="4px">
                <Flex
                  flexWrap="wrap"
                  direction={isLargerThanSmall ? "row" : "column"}
                >
                  {/* Industry options split into two columns */}
                  <Box flex="1">
                    <MenuOptionGroup title="Industry" type="checkbox">
                      {industryOptions
                        .slice(0, Math.ceil(industryOptions.length / 2))
                        .map((option) => (
                          <MenuItemOption
                            key={`industry${option.id}`}
                            value={option.value}
                            onClick={() =>
                              handleFilterClick(option.label, "Industry")
                            }
                          >
                            {option.label}
                          </MenuItemOption>
                        ))}
                    </MenuOptionGroup>
                  </Box>
                  <Box flex="1">
                    <MenuOptionGroup title="Industry" type="checkbox">
                      {industryOptions
                        .slice(Math.ceil(industryOptions.length / 2))
                        .map((option) => (
                          <MenuItemOption
                            key={`industry2${option.id}`}
                            value={option.value}
                            onClick={() =>
                              handleFilterClick(option.label, "Industry")
                            }
                          >
                            {option.label}
                          </MenuItemOption>
                        ))}
                    </MenuOptionGroup>
                  </Box>
                </Flex>
              </Wrap>
            </MenuList>
          </>
        )}
      </Menu>
    </>
  );
}

export default FilterMenu;
