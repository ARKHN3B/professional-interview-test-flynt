// Libs
import { gql } from "apollo-server";

import { queries } from "./queries";
import { mutations } from "./mutations";
import { outputs } from "./types/outputs";
import { inputs } from "./types/inputs";

export { resolvers } from "./resolvers";

export const schema = gql`
    ${queries}
    ${mutations}
    ${outputs}
    ${inputs}
`;
