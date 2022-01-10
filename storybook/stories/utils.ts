import { ArgTypes } from "@storybook/html";

export function fromMetaArgsTypesToScheme(argsTypes: ArgTypes) {
  return {
    attributes: {},
    events: {},
    cssVariables: {},
  };
}

export function fromMetaArgsTypesToAttributes(argsTypes: ArgTypes) {
  return fromMetaArgsTypesToScheme(argsTypes).attributes;
}

export function fromMetaArgsTypesToAttributesTable(argsTypes: ArgTypes) {
  const attributes = fromMetaArgsTypesToAttributes(argsTypes);
  const rows = [];
  const header = [];
  return {
    rows,
    header,
  };
}

export function fromMetaArgsTypesToHtmlTable(argsTypes: ArgTypes) {
  const table = fromMetaArgsTypesToAttributesTable(argsTypes);

  return "<streamingtablebootstrap-webcomponent></streamingtablebootstrap-webcomponent>";
}
