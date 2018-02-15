import React from "react"
import Replacement from "./replacement.js"
import list from "./list.js"

const ReplacementList = list("Replacements:", true)(Replacement);
export default ReplacementList;
