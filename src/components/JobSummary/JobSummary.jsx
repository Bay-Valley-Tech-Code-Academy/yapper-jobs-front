import React from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  Stack,
  IconButton,
  Icon,
  Divider,
  useMediaQuery,
} from "@chakra-ui/react";
import { FaRegBookmark, FaRegClock, FaMapMarkerAlt } from "react-icons/fa";

function JobSummary() {
  const [isLargerThanSmall] = useMediaQuery("(min-width: 30em)");

  if (!isLargerThanSmall) {
    return null; // Render nothing if the screen size is smaller than 30em
  }
  return (
    <>
      <Box height="100%" ml="3%">
        <Stack direction="column" mb="2">
          <Heading size="md">Full Stack Developer</Heading>
          <Text fontSize="sm" color="gray.600">
            Google
          </Text>
          <Stack direction="row" justify="space-between" align="center">
            <IconButton
              icon={<Icon as={FaRegBookmark} />}
              aria-label="Save Job"
              // onClick={onSaveClick}
            />
            <Text fontSize="sm">1d ago</Text>
          </Stack>
        </Stack>
        <Stack direction="row" spacing="4" align="center" mb="2">
          <Stack direction="row" spacing="1">
            <Icon as={FaMapMarkerAlt} />
            <Text fontSize="sm">Modesto, CA</Text>
          </Stack>
          {/* {isFullTime && ( */}
          <Text fontSize="sm" fontWeight="bold">
            Full-time
          </Text>
          {/* )} */}
        </Stack>
        <Text fontSize="sm" mb="4" overflowY="scroll" maxHeight="200px">
          Another locum tenens opportunity has arrived in California! Our client
          is looking for a nurse practitioner specializing in
          hematology/oncology to begin coverage in early August. Hours include
          8a - 5p shifts from Mondays - Fridays. The selected locum will be
          handling new patient consults, follow ups, and general hem/onc cases.
          There is a chance for an extension with this opportunity. This
          facility uses Epic. Want to learn more? Apply today! Barton Associates
          specializes in providing the healthcare industry with best-in-class
          staffing services throughout the United States. Since its inception,
          Barton has prided itself on building exceptional relationships with
          both its clients and providers, all of which originates from their
          world-class training program and strong commitment to their employees.
          Healthcare staffing is a nearly. Astound Business Solutions is
          currently searching for an Account Executive for our Central Valley,
          CA territory which covers the geographical areas of Stockton, Lathrop,
          Manteca, Modesto and Ripon. This position is responsible for promoting
          and selling fiber services to business customers throughout a specific
          region via cold calling, networking, mailing and door-to-door
          canvassing. Also responsible for presenting and selling the full line
          of Astound Broadband Powered by Wave products including voice, video
          and data services.
        </Text>
        <Stack direction="row" justify="flex-start" spacing="4">
          <Button
            colorScheme="purple"
            variant="solid"
            // onClick={onApplyClick}
          >
            Apply Now
          </Button>
          <Button colorScheme="gray" variant="outline">
            Save
          </Button>
        </Stack>
        <Divider mt={4} />
        <Text mb={4} mt={4}>
          Industry: Technology
        </Text>
        <Heading mb={4}>About the company</Heading>
        <Text ml={4}>
          We're Proud to Offer a Comprehensive Benefits Package Including:
          <ul>
            <li>401k retirement plan, with employer match</li>
            <li>
              Insurance options including: medical, dental, vision, life and STD
              insurance
            </li>
            <li>
              Paid Time Off/Vacation: Starting at 80 hours per year, and
              increases based on tenure with the organization
            </li>
            <li>Floating Holiday: 40 hours per year</li>
            <li>Paid Holidays: 7 days per year</li>
            <li>
              Paid Sick Leave: Astound allows a number of paid sick hours per
              calendar year and varies based on state and/or local laws
            </li>
            <li>Tuition reimbursement program</li>
            <li> Employee discount program</li>
          </ul>
        </Text>
      </Box>
    </>
  );
}

export default JobSummary;
