import React, { useContext, useReducer, useState } from "react";
import { Button, Stack, Text, Progress, FormLabel, Box } from "@chakra-ui/core";
import myAxios from "src/config/axios";
import {
  GroupNameInput,
  ExchangeDateInput,
  PriceLimitInput,
  ConfirmInputs,
} from "./Steps/Steps";
import InputAlert from "src/components/InputAlert";

enum STEP {
  NAME = 0,
  DATE = 1,
  SPENDING_LIMIT = 2,
  CONFIRM = 3,
}

const FORM_STEP = {
  [STEP.NAME]: {
    name: "name",
    label: "Make your exchange stand out with a creative name.",
  },
  [STEP.DATE]: {
    name: "date",
    label: "Choose a date that all gifts should be chosen by.",
  },
  [STEP.SPENDING_LIMIT]: {
    name: "spendingLimit",
    label: "Add an optional spending limit for gift suggestions.",
  },
  [STEP.CONFIRM]: {
    name: "",
    label: "Are you ready to start your exchange experience?",
  },
};

type CreateGroupNavigatorProps = {
  /** The step the user is in while creating a group */
  currentStep: number;

  /** Click handler when user navigates a step backward */
  handlePrevious: (e: React.MouseEvent) => void;

  /** Click handler when user navigates a step forward */
  handleNext: (e: React.MouseEvent) => void;
};

type SpendingLimit = {
  minPrice: number;
  maxPrice: number;
};

type GroupContext = {
  name: string;
  votingEndDate: Date;
  spendingLimit: SpendingLimit | null;
};

type Action =
  | { type: "CLEAR_SPENDING_LIMIT" }
  | { type: "UPDATE_NAME"; name: string }
  | { type: "UPDATE_DATE"; date: Date }
  | { type: "UPDATE_MIN_PRICE"; minPrice: number }
  | { type: "UPDATE_MAX_PRICE"; maxPrice: number };

const GroupStateContext = React.createContext<GroupContext>({} as GroupContext);
const GroupDispatchContext = React.createContext<Function | undefined>(
  undefined
);

const useGroupStateContext = () => useContext(GroupStateContext);
const useGroupDispatchContext = () => useContext(GroupDispatchContext);
const useGroupContext = () => {
  const state = useGroupStateContext();
  const dispatch = useGroupDispatchContext();

  return { state, dispatch };
};

function groupReducer(state: GroupContext, action: Action): GroupContext {
  switch (action.type) {
    case "UPDATE_NAME":
      return {
        ...state,
        name: action.name,
      };
    case "UPDATE_DATE":
      return {
        ...state,
        votingEndDate: action.date,
      };
    case "UPDATE_MIN_PRICE":
      return {
        ...state,
        spendingLimit: {
          ...(state.spendingLimit as SpendingLimit),
          minPrice: action.minPrice,
        },
      };
    case "UPDATE_MAX_PRICE":
      return {
        ...state,
        spendingLimit: {
          ...(state.spendingLimit as SpendingLimit),
          maxPrice: action.maxPrice,
        },
      };
    case "CLEAR_SPENDING_LIMIT":
      return {
        ...state,
        spendingLimit: null,
      };
    default:
      return {
        ...state,
      };
  }
}

const initialState: GroupContext = {
  name: "",
  votingEndDate: new Date(),
  spendingLimit: null,
};

/**
 * Enables a user to move backward and forward in the group
 * creation form process
 */
const CreateGroupNavigator: React.FC<CreateGroupNavigatorProps> = ({
  currentStep,
  handlePrevious,
  handleNext,
}) => {
  return (
    <Stack isInline mt="1.5rem" justify="space-between">
      {currentStep !== STEP.NAME && (
        <Button
          variant="link"
          isDisabled={currentStep === 0}
          onClick={handlePrevious}
          leftIcon="arrow-back"
        >
          Back
        </Button>
      )}

      {currentStep === STEP.SPENDING_LIMIT && (
        <Button
          position="relative"
          variant="link"
          variantColor="black"
          rightIcon="arrow-forward"
          onClick={handleNext}
        >
          Skip
        </Button>
      )}
    </Stack>
  );
};

const CreateGroup = () => {
  const [step, setStep] = useState<STEP>(STEP.NAME);
  const [group, dispatch] = useReducer(groupReducer, initialState);
  const [errors, setErrors] = useState("");

  const handleConfirmStep = () => {
    if (step === STEP.SPENDING_LIMIT) {
      // They will only hit the continue button when the spending limit is not null
      if (group.spendingLimit!.minPrice > group.spendingLimit!.maxPrice) {
        setErrors(
          "The minimum gift price must be less than the maximum gift price."
        );
        return;
      }
    } else if (step === STEP.NAME) {
      if (group.name === "") {
        setErrors("Your group must have a name.");
        return;
      }
    }

    setErrors("");
    setStep((prevStep) => ++prevStep);
  };

  const handleSkipStep = () => {
    setStep((prev) => ++prev);
    setErrors("");
    if (step === STEP["SPENDING_LIMIT"]) {
      dispatch({ type: "CLEAR_SPENDING_LIMIT" });
    }
  };

  const handlePreviousStep = () => {
    setErrors("");
    setStep((prev) => --prev);
  };

  return (
    <GroupStateContext.Provider value={group}>
      <GroupDispatchContext.Provider value={dispatch}>
        <Progress
          value={(step / (Object.keys(FORM_STEP).length - 1)) * 100}
          color="green"
          hasStripe
          mb="2rem"
          size="sm"
          position="absolute"
          left="0"
          width="100%"
        />

        <Box
          pl={[".5rem", "2rem", "1rem", "0"]}
          pr={[".5rem", "2rem", "1rem", "0"]}
        >
          <CreateGroupNavigator
            currentStep={step}
            handlePrevious={handlePreviousStep}
            handleNext={handleSkipStep}
          />

          <Stack as="section" align="center" mt="2rem">
            {step === STEP.NAME && <GroupNameInput isInvalid={errors !== ""} />}

            {step === STEP.DATE && <ExchangeDateInput />}

            {step === STEP.SPENDING_LIMIT && (
              <PriceLimitInput isInvalid={errors !== ""} />
            )}

            {step === STEP.CONFIRM && <ConfirmInputs />}

            {errors && <InputAlert mt=".5rem" message={errors} />}

            {step !== STEP.CONFIRM ? (
              <Button
                mt="2rem"
                variantColor="blueIce"
                onClick={handleConfirmStep}
              >
                Continue
              </Button>
            ) : (
              <Button
                mt="2rem"
                variantColor="green"
                onClick={() =>
                  myAxios.post("/group", {
                    groupName: group.name,
                    voteEndDt: group.votingEndDate,
                    spendingLimit: {
                      minPrice: group.spendingLimit?.minPrice || null,
                      maxPrice: group.spendingLimit?.maxPrice || null,
                    },
                  })
                }
              >
                Finish!
              </Button>
            )}
          </Stack>
        </Box>
      </GroupDispatchContext.Provider>
    </GroupStateContext.Provider>
  );
};

export { useGroupContext, useGroupStateContext, useGroupDispatchContext };

export default CreateGroup;
