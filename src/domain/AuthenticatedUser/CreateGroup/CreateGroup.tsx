import React, { useState } from "react";
import {
  Button,
  Stack,
  Input,
  Text,
  Progress,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/core";
import DateInputs from "src/components/DateInputs";
import Card from "src/components/Card";

enum STEP {
  NAME = 0,
  DATE = 1,
  SPENDING_LIMIT = 2,
  CONFIRM = 3,
}

type SpendingLimit = {
  minPrice: string;
  maxPrice: string;
};

type Group = {
  [STEP.NAME]: string;
  [STEP.DATE]: string;
  [STEP.SPENDING_LIMIT]: SpendingLimit;
};

type InputProps = {
  value?: any;
  onChange: (value: string, groupProperty: keyof Group) => void;
};

interface Date {
  day: string;
  month: string;
  year: string;
}
/**
 * User input for giving the group a name
 */
const GroupNameInput: React.FC<InputProps> = ({ onChange, value }) => {
  return (
    <Input
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value, STEP.NAME)
      }
      aria-label="Group name"
      w="100%"
      maxWidth="25rem"
      textAlign="center"
      size="md"
      placeholder="Group Name"
      value={value}
    />
  );
};

/**
 * User input for choosing a date in which gifts should
 * be chosen by
 */
const ExchangeDateSelection: React.FC<InputProps> = ({ onChange }) => {
  return (
    <DateInputs
      yearsFromNow={2}
      onDateSelection={(date: Date) =>
        onChange(`${date.year}-${date.month}-${date.day}`, STEP.DATE)
      }
    />
  );
};

/**
 * User input for setting a price floor and price ceiling
 * for gifts to be purchased for each participant
 */
const PriceLimitInput: React.FC<InputProps> = ({
  onChange,
  value: currValue,
}) => {
  const handlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: priceToUpdate, value: newValue } = e.target;
    const updatedPriceLimit = {
      ...currValue,
      [priceToUpdate]: newValue,
    };

    onChange(updatedPriceLimit, STEP.SPENDING_LIMIT);
  };

  return (
    <>
      <InputGroup>
        <InputLeftAddon children="$" color="gunmentalIce" fontSize="1.2em" />
        <Input
          value={currValue.minPrice}
          name="minPrice"
          onChange={handlChange}
          type="number"
          placeholder="Minimum gift price"
        />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon children="$" color="gunmentalIce" fontSize="1.2em" />
        <Input
          name="maxPrice"
          value={currValue.maxPrice}
          onChange={handlChange}
          type="number"
          placeholder="Maximum gift price"
        />
      </InputGroup>
    </>
  );
};

/**
 * Final screen to verify before submitting
 */
const Confirm: React.FC<InputProps> = ({ value: group }) => {
  return (
    <Card w="max-content">
      <Text>Name: {group[STEP.NAME]}</Text>
      <Text>DATE: {group[STEP.DATE]}</Text>
      {group[STEP.SPENDING_LIMIT] && <Text>Spending limit: TBD</Text>}
    </Card>
  );
};

interface CreateGroupStep {
  label: string;
  input: React.FC<InputProps>;
}

interface FormSteps {
  [key: number]: CreateGroupStep;
}

const FORM_STEP: FormSteps = {
  [STEP.NAME]: {
    label: "Make your exchange stand out with a creative name.",
    input: GroupNameInput,
  },
  [STEP.DATE]: {
    label: "Select the day in which gifts should be finalized.",
    input: ExchangeDateSelection,
  },
  [STEP.SPENDING_LIMIT]: {
    label: "Add an optional spending limit for each gift.",
    input: PriceLimitInput,
  },
  [STEP.CONFIRM]: {
    label: "Confirm your group before creating your exchange experience.",
    input: Confirm,
  },
};

const CreateGroup = () => {
  const [step, setStep] = useState<STEP>(STEP.NAME);
  const [group, setGroup] = useState<Group>({
    [STEP.NAME]: "",
    [STEP.DATE]: "",
    [STEP.SPENDING_LIMIT]: { minPrice: "", maxPrice: "" },
  });

  const CurrentInput = FORM_STEP[step].input;

  const handleChange = (value: string, name: keyof Group) => {
    setGroup((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {/* <Heading mb="1.5rem" textAlign="center">
        {group.name || "New Gift Exchange"}
      </Heading> */}
      <Progress
        value={(step / (Object.keys(FORM_STEP).length - 1)) * 100}
        color="green"
        hasStripe
        mb="2rem"
        size="sm"
        // width={["100%", "100%", "90%", "75%"]}
        // ml="auto"
        // mr="auto"
        position="absolute"
        left="0"
        width="100%"
      />

      <Stack isInline mt="1.5rem" justify="space-between">
        {step !== STEP.NAME && (
          <Button
            variant="link"
            isDisabled={step === 0}
            onClick={() => setStep((prev) => --prev)}
            leftIcon="arrow-back"
          >
            Back
          </Button>
        )}

        {step === STEP.SPENDING_LIMIT && (
          <Button
            position="relative"
            variant="link"
            variantColor="black"
            rightIcon="arrow-forward"
            onClick={() => setStep((prev) => ++prev)}
          >
            Skip
          </Button>
        )}
      </Stack>

      <fieldset>
        <Stack as="section" align="center" spacing={5} mt="2rem">
          <legend>
            <Text
              textAlign="center"
              mb={[4, 6, 6, 6]}
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
              {FORM_STEP[step].label}
            </Text>
          </legend>

          <CurrentInput
            onChange={handleChange}
            value={step === STEP.CONFIRM ? group : group[step]}
          />

          {step !== STEP.CONFIRM ? (
            <Stack isInline justify="center" mt="2rem">
              <Button
                variantColor={
                  step !== STEP.SPENDING_LIMIT ? "blueIce" : "green"
                }
                isDisabled={
                  group[step] === "" ||
                  (step === STEP.SPENDING_LIMIT &&
                    (group[STEP.SPENDING_LIMIT].minPrice === "" ||
                      group[STEP.SPENDING_LIMIT].maxPrice === ""))
                }
                onClick={() => {
                  step !== STEP.SPENDING_LIMIT
                    ? setStep((prev) => ++prev)
                    : console.log("submitting group: ", group);
                }}
              >
                Continue
              </Button>
            </Stack>
          ) : (
            <Button
              variantColor="green"
              onClick={() => console.log("confirming")}
            >
              Finish!
            </Button>
          )}
        </Stack>
      </fieldset>
    </>
  );
};

export default CreateGroup;
