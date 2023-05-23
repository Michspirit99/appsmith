import type { EnvTypes } from "./RampTypes";
import type { SupportedRampsType } from "./RampTypes";
import {
  CUSTOM_ROLES,
  INVITE_USER_TO_APP,
  RAMP_FOR_ROLES,
  RAMP_NAME,
} from "./RampsControlList";
import { getAppsmithConfigs } from "@appsmith/configs";
import store from "store";

export const PRODUCT_RAMPS_LIST: { [key: string]: SupportedRampsType } = {
  [RAMP_NAME.INVITE_USER_TO_APP]: INVITE_USER_TO_APP,
  [RAMP_NAME.CUSTOM_ROLES]: CUSTOM_ROLES,
};

export const RAMP_LINK_TO = "https://appsmith.com/pricing";

export const getUserRoleInWorkspace = () => {
  const state = store.getState();
  const { currentUser } = state?.ui?.users;
  const isSuperUser = currentUser?.isSuperUser;
  if (isSuperUser) return RAMP_FOR_ROLES.SUPER_USER;
  const workspaceUsers = state?.ui?.workspaces?.workspaceUsers;
  if (workspaceUsers?.length) {
    const workspaceUser = workspaceUsers.find(
      (user: any) => user?.username === currentUser?.username,
    );
    if (workspaceUser?.roles?.length) {
      const [role] = workspaceUser.roles[0]?.name?.split("-");
      if (role) {
        return role.trim();
      }
    }
  }
};

export const showProductRamps = (rampName: string) => {
  const { cloudHosting } = getAppsmithConfigs();
  const role = getUserRoleInWorkspace();
  const env: EnvTypes = cloudHosting ? "CLOUD_HOSTED" : "SELF_HOSTED";
  if (rampName in PRODUCT_RAMPS_LIST) {
    const rampConfig = PRODUCT_RAMPS_LIST[rampName][env];
    return rampConfig[role];
  }
  return false;
};
