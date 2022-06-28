import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/uploader/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.name);

let data =
  "iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAA" +
  "CA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAAsTAAALEwEAmpwYAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0" +
  "YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly" +
  "93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAg" +
  "ICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZm" +
  "Y6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAADuUlEQVQ4EbVU" +
  "TUtcZxR+7ufkXp1SZ4iZRE1EDVQRnTAhowsZMFm40I2rNqUIIev8hvoPQroQXBTqwiAWcd0EglEhiZNajVZrQGXAWAzaZpzMnZn7lXPeeIe5Da" +
  "Wb9Ax33vOec8/znI/3vVI6nfbxP4v8b/iSJIGfzyGfkPi+D13XUalUBL6qqmIvy5+8WuX/r2RCkUzAoIuLi2hqaoLrutjb28P6+josyxJkiqJA" +
  "07SQXiqVwHaOZYx/itLc3Px9YIxEIlheXsbExATGxsYwMjIiwEdHRwXA/Pw8EokEcrkcDg4OYJomVlZWMDU1JSqfmZlBR0cHbNsOtVoNCHjlTF" +
  "iSySQMwxAVxONxQbi0tIRMJoPe3l5MT0+jtbUVg4ODYGImY18qlcL4+DhisZjoggCjv1C7uOyenh7Mzs5iY2ND6FQpdnd3sba2JloSjUYxPDyM" +
  "/v5+TE5OYn9/X9jZtrOzg+3t7WqyAUmoEu419/+HBw9E+eVymbJqAJP39fWBCR3HEU+hUMDQ0JCYGc8um81iYGAAjY2N8DwvwBdraCY8tHhDA1" +
  "Y3N9Hd3S2yvH37O7RcbsF7AuUsD9+8wdOFBTx/8QJtbW1C5/nMzc3R0D2UyxXk83lRXcAk1V5GCT5sSUGDbeHxy9/EO98M9OOXzT9wfHISxKC1" +
  "vR0GHfOtrS2g/SouWwU0Xkggu7qO9PUkJFULnbIQyTm6ewu2hF+vnOIIUQwdGlg8f4QF6wvMWBq+pAkaskSnx4FFVUf0CNpcC797KizXQ4oAHh" +
  "VdXJJ81F7j6kwUynPHlXDPdFB2fRj+KVK0KvT2rbp3uKYryJU11Cke8qqMuOoioeeJ1MPDYxM36m1cNSq4GdFx58RAWvbx8TrXnK4IgR16Em5G" +
  "K4iqHi5GHHxLgcSDn97WgZPoND+GGZRpPYH85cgiiRQl1ltXxmFFQ5PuopP8TrW5ZyRcWp7AbmkeZefg5+N6PPnbRJdpw/YlfB0vQiPQZwVdZN" +
  "tFZEVK6D1VTnccJlXzuqTjvOZiq6Rhj2KqLSJsofOHgIl8+t0/qsfDioxmSUWGjrRFzhYi/5Oynrdl3KXHIZDXtF6hil8R6I9FBV/RvDLnXKxS" +
  "bAdVYhNeINXBMwmXWCTQGG2Y+Jj+dFrfEmiMAtmeowpo9ojTvkD+A/L1UJUMmiVfkuz6WTyZhFRJAgP33j3bsM5k/Fng68UP21hYJyyxZwLWuS" +
  "2cKMfUSm3rhD0g4E2g197fwMZ+Bgt8rNe2iP2BhL5dgfFzrx8AfECEDdx45a0AAAAASUVORK5CYII=";
const buff = Buffer.from(data, "base64");

const imageData = buff;

for (const e of componentSetup.examples) {
  e.data.fetch_data.data = imageData;
}

export const UploaderTemplate = Template.bind({});
UploaderTemplate.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);
