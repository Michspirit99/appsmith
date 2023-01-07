import { unsafeFunctionForEval } from "utils/DynamicBindingUtils";
import interceptAndOverrideHttpRequest from "../HTTPRequestOverride";
import { resetJSLibraries } from "../../common/JSLibrary";
import setupDOM from "../SetupDOM";
import initTimeoutFns from "../fns/timeout";
import { EvalWorkerSyncRequest } from "../types";
import userLogs from "../fns/console";
import { addPlatformFunctionsToEvalContext } from "@appsmith/workers/Evaluation/Actions";
import { initWindowProxy } from "../fns/windowProxy";

export default function() {
  const libraries = resetJSLibraries();
  ///// Adding extra libraries separately
  libraries.forEach((library) => {
    // @ts-expect-error: Types are not available
    self[library.accessor] = library.lib;
  });

  ///// Remove all unsafe functions
  unsafeFunctionForEval.forEach((func) => {
    // @ts-expect-error: Types are not available
    self[func] = undefined;
  });
  userLogs.overrideConsoleAPI();
  initTimeoutFns();
  interceptAndOverrideHttpRequest();
  setupDOM();
  initWindowProxy();
  addPlatformFunctionsToEvalContext(self);
  return true;
}

export function setEvaluationVersion(request: EvalWorkerSyncRequest) {
  const { data } = request;
  const { version } = data;
  self.evaluationVersion = version || 1;
  // TODO: Move this to setup
  resetJSLibraries();
  return true;
}
