/**
 * Author: Menahil
 * Date: 17-03-2022
 * Purpose: This file contains the action creators for api middleware
 */
import { createAction } from "@reduxjs/toolkit";
export const apiCallBegan = createAction("api/CallBegan");
export const apiCallFailed = createAction("api/CallFailed");
