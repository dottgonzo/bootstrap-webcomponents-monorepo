import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/order-list/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, componentSetup.name, {
    style: { margin: "20px auto 20px auto" },
  });

export const OrderList = Template.bind({});

OrderList.args = {
  id: "OrderList",
  payment: {
    orderNumber: "ssss",

    items: [
      {
        id: "sss",
        unitaryPrice: 2,
        taxPercentage: 3,
        name: "testitem",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/6/66/Walgreens_Obama_Merchandise.jpg",
      },
      {
        id: "aaa",
        unitaryPrice: 5,
        taxPercentage: 7,
        name: "testitem2",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/4/49/Fredmeyer_edit_1.jpg",
      },
    ],
  },
};
