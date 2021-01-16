import React from "react";
import {
  Box,
  BoxProps,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import DatePicker from "src/components/DatePicker";
import { Table, TableRow, TableHead, TableData } from "src/components/Table";
import { useGroupContext } from "../CreateGroup";

type StepProps = {
  isInvalid: boolean;
};

type LabelProps = {
  id: string;
};

const StepLabel: React.FC<LabelProps & BoxProps> = ({
  id,
  children,
  ...rest
}) => {
  return (
    <FormLabel
      // mb={[4, 6, 6, 6]}
      // fontFamily="Noto Sans KR"
      // fontSize={["lg", "xl", "2xl", "3xl"]}
      // fontWeight="bold"
      // textAlign="center"
      // m={{
      //   xs: "0 0rem 1.5rem 0rem",
      //   sm: "0 0rem 1.5rem 0rem",
      //   md: "0 5rem 1.5rem 5rem",
      //   lg: "0 0 1.5rem 0",
      //   xl: "0 0 1.5rem 0",
      // }}
      // pl={["2rem", "2rem", "1rem", "0"]}
      // pr={["2rem", "2rem", "1rem", "0"]}
      htmlFor={id}
    >
      {children}
    </FormLabel>
  );
};

/**
 * User input for giving the group a name
 */
export const GroupNameInput: React.FC<StepProps> = ({ isInvalid }) => {
  const { state, dispatch } = useGroupContext();

  return (
    <>
      <StepLabel id="name">
        Make your exchange stand out with a creative name.
      </StepLabel>
      <Input
        isInvalid={isInvalid}
        errorBorderColor="red.500"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          dispatch!({ type: "UPDATE_NAME", name: e.target.value });
        }}
        id="name"
        aria-label="Group name"
        w="100%"
        maxWidth="25rem"
        textAlign="center"
        size="md"
        placeholder="Group Name"
        value={state?.name}
      />
    </>
  );
};

/**
 * User input for choosing a gift selection cut-off date
 */
export const ExchangeDateInput: React.FC = () => {
  const { state, dispatch } = useGroupContext();

  return (
    <>
      <StepLabel id="date" textAlign="center">
        Choose a date that all gifts should be chosen by.
      </StepLabel>
      <DatePicker
        id="date"
        selectedDate={state.votingEndDate}
        onChange={(date: Date) => {
          dispatch!({ type: "UPDATE_DATE", date });
        }}
      />
    </>
  );
};

/**
 * User input for setting a price range for gift suggestions in the group
 */

const invalidChars = ["-", "+", "e"];

export const PriceLimitInput: React.FC<StepProps> = ({ isInvalid }) => {
  const { state, dispatch } = useGroupContext();

  const handlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: priceToUpdate, value } = e.target;

    const type =
      priceToUpdate === "minPrice" ? "UPDATE_MIN_PRICE" : "UPDATE_MAX_PRICE";

    dispatch!({
      type,
      [priceToUpdate]: parseInt(value),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    console.log("handling paste");
    const str = e.clipboardData.getData("text/plain");
    const newStr = str.replace(/[e+-.]/g, "");
    if (str !== newStr) {
      e.preventDefault();
    }
  };

  return (
    <fieldset>
      <Box as="legend" textAlign="center" w="100%">
        <Text
          mb={[4, 6, 6, 6]}
          textAlign="center"
          fontFamily="Noto Sans KR"
          fontSize={["lg", "xl", "2xl", "3xl"]}
          fontWeight="bold"
          m={{
            xs: "0 0rem 1.5rem 0rem",
            sm: "0 0rem 1.5rem 0rem",
            md: "0 5rem 1.5rem 5rem",
            lg: "0 0 1.5rem 0",
            xl: "0 0 1.5rem 0",
          }}
        >
          Choose an optional spending limit for each gift.
        </Text>
      </Box>
      <Box d="flex" justifyContent="center" flexWrap="wrap">
        <Box flexBasis="8rem" m="0 1rem">
          <FormLabel htmlFor="minPrice">Minimum Price</FormLabel>
          <InputGroup>
            <InputLeftAddon
              children="$"
              color="gunmentalIce"
              fontSize="1.2em"
            />
            <Input
              isInvalid={isInvalid}
              overflow="hidden"
              errorBorderColor="red.500"
              value={state.spendingLimit?.minPrice || ""}
              id="minPrice"
              name="minPrice"
              onChange={handlChange}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              type="number"
              placeholder="--"
            />
          </InputGroup>
        </Box>

        <Box flexBasis="8rem" m="0 1rem">
          <FormLabel htmlFor="maxPrice">Maximum Price</FormLabel>
          <InputGroup>
            <InputLeftAddon
              children="$"
              color="gunmentalIce"
              fontSize="1.2em"
            />
            <Input
              isInvalid={isInvalid}
              errorBorderColor="red.500"
              overflow="hidden"
              id="maxPrice"
              name="maxPrice"
              value={state.spendingLimit?.maxPrice || ""}
              onChange={handlChange}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              type="number"
              placeholder="--"
            />
          </InputGroup>
        </Box>
      </Box>
    </fieldset>
  );
};

/**
 * Enables user to review previous input selections
 */
export const ConfirmInputs: React.FC = () => {
  const { state } = useGroupContext();

  return (
    <>
      <Text
        mb={[4, 6, 6, 6]}
        textAlign="center"
        fontFamily="Noto Sans KR"
        fontSize={["lg", "xl", "2xl", "3xl"]}
        fontWeight="bold"
        m={{
          xs: "0 0rem 1.5rem 0rem",
          sm: "0 0rem 1.5rem 0rem",
          md: "0 5rem 1.5rem 5rem",
          lg: "0 0 1.5rem 0",
          xl: "0 0 1.5rem 0",
        }}
      >
        Make sure your group looks ready to go.
      </Text>
      <Table>
        <TableRow>
          <TableHead>Group name</TableHead>
          <TableData>{state.name}</TableData>
        </TableRow>

        <TableRow>
          <TableHead>Last day to vote</TableHead>
          <TableData>{format(state.votingEndDate, "MMMM dd, yyyy")}</TableData>
        </TableRow>

        {state.spendingLimit !== null && (
          <>
            <TableRow>
              <TableHead>Minimum gift price</TableHead>
              <TableData>
                {state?.spendingLimit.minPrice
                  ? `${state.spendingLimit.minPrice}`
                  : "--"}
              </TableData>
            </TableRow>

            <TableRow>
              <TableHead>Maximum gift price</TableHead>
              <TableData>
                {state?.spendingLimit.maxPrice
                  ? `${state.spendingLimit.maxPrice}`
                  : "--"}
              </TableData>
            </TableRow>
          </>
        )}
      </Table>
    </>
  );
};
