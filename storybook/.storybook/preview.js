import "../../bootstrap/_functions.scss";
// import "../../bootstrap/_variables.scss";
// import "../../bootstrap/_mixins.scss";
import "./docs.css"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
