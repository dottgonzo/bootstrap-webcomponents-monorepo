import { Story, Meta } from "@storybook/html";
import { webComponentBind } from "./utils/webComponentUtils";

const meta: Meta = {
  title: "Charts/Chartjs",
  argTypes: {
    id: { control: { disable: true } },
    data: { control: { type: "object" } },
    chartClick: { action: "chartClick" },
  },
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "chartjs");

export const ChartTemplate = Template.bind({});
ChartTemplate.args = {
  id: "ChartTemplate",
  data: {
    type: "line",
    data: {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: [0, 10, 5, 2, 20, 30, 45],
        },
      ],
    },
    options: {},
  },
};
