import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import { version } from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/table/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    version
  );

export const BasicTable = Template.bind({});

BasicTable.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);
export const BasicTableWithClick = Template.bind({});

BasicTableWithClick.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "BasicTableWithClick") ||
    (undefined as any)
);
export const BasicTableWithMoreSearchAndSelect = Template.bind({});

BasicTableWithMoreSearchAndSelect.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "BasicTableWithMoreSearchAndSelect"
  ) || (undefined as any)
);
export const BasicTableWithSearchOnNestedField = Template.bind({});

BasicTableWithSearchOnNestedField.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "BasicTableWithSearchOnNestedField"
  ) || (undefined as any)
);
export const BasicTableWithSearchOnAllFields = Template.bind({});

BasicTableWithSearchOnAllFields.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "BasicTableWithSearchOnAllFields"
  ) || (undefined as any)
);
export const BasicTableWithDate = Template.bind({});

BasicTableWithDate.args =
  setStorybookData(
    componentSetup.name,
    componentSetup.examples.find((f) => f.name === "BasicTableWithDate") ||
      (undefined as any)
  ) || (undefined as any);
export const BasicTableWithActions = Template.bind({});

BasicTableWithActions.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "BasicTableWithActions") ||
    (undefined as any)
);
export const BasicTableWithActionsAndSelect = Template.bind({});

BasicTableWithActionsAndSelect.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "BasicTableWithActionsAndSelect"
  ) || (undefined as any)
);
export const BasicTableWithActionsConfirmAndForm = Template.bind({});

BasicTableWithActionsConfirmAndForm.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "BasicTableWithActionsConfirmAndForm"
  ) || (undefined as any)
);

export const BasicTableWithTruncateAndCopy = Template.bind({});

BasicTableWithTruncateAndCopy.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "BasicTableWithTruncateAndCopy"
  ) || (undefined as any)
);
