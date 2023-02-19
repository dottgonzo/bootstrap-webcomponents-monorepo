import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import { storybookArgs, componentSetup } from "../../packages/table/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.repoName);

export const BasicTable = Template.bind({});

BasicTable.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);
export const BasicTableWithClick = Template.bind({});

BasicTableWithClick.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "BasicTableWithClick")
);
export const BasicTableWithMoreSearchAndSelect = Template.bind({});

BasicTableWithMoreSearchAndSelect.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "BasicTableWithMoreSearchAndSelect"
  )
);
export const BasicTableWithSearchOnNestedField = Template.bind({});

BasicTableWithSearchOnNestedField.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "BasicTableWithSearchOnNestedField"
  )
);
export const BasicTableWithSearchOnAllFields = Template.bind({});

BasicTableWithSearchOnAllFields.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "BasicTableWithSearchOnAllFields"
  )
);
export const BasicTableWithDate = Template.bind({});

BasicTableWithDate.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "BasicTableWithDate")
);
export const BasicTableWithActions = Template.bind({});

BasicTableWithActions.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "BasicTableWithActions")
);
export const BasicTableWithActionsAndSelect = Template.bind({});

BasicTableWithActionsAndSelect.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "BasicTableWithActionsAndSelect"
  )
);
export const BasicTableWithActionsConfirmAndForm = Template.bind({});

BasicTableWithActionsConfirmAndForm.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "BasicTableWithActionsConfirmAndForm"
  )
);

export const BasicTableWithTruncateAndCopy = Template.bind({});

BasicTableWithTruncateAndCopy.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "BasicTableWithTruncateAndCopy"
  )
);
