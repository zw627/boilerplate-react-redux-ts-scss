import mockdate from "mockdate";

import player, {
  initializeState,
  initialState,
} from "Store/scoreboard/player/slice";
import { PlayerObject } from "Store/scoreboard/player/types";

mockdate.set(1576071902);
const fakeDate = "1/19/1970";

describe("scoreboard/player", () => {
  const fakeId = "7e5b5ed0-8022-4147-a34e-3afdbae2d631";
  const fakeName = "W.";
  const fakePlayerList = [
    {
      id: fakeId,
      name: fakeName,
      score: 0,
      created: fakeDate,
      updated: fakeDate,
      isSelected: false,
    },
  ];

  it("should handle the initial state", () => {
    expect(player(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle player/add", () => {
    const handleAddPlayer = (
      name: string,
      newPlayerList: PlayerObject[] | []
    ): void => {
      const action = {
        type: "player/add",
        payload: {
          id: fakeId,
          name,
          date: fakeDate,
        },
      };
      const oldState = initializeState([]);
      const newState = initializeState(newPlayerList);
      expect(player(oldState, action)).toEqual(newState);
    };
    // Add
    handleAddPlayer(fakeName, fakePlayerList);
    // Invalid name
    handleAddPlayer(" ", []);
  });

  it("should handle player/remove", () => {
    const hanldeRemovePlayer = (
      inputId: string,
      newPlayerList: PlayerObject[] | []
    ): void => {
      const action = {
        type: "player/remove",
        payload: {
          id: inputId,
        },
      };
      const oldState = initializeState(fakePlayerList);
      const newState = initializeState(newPlayerList);
      expect(player(oldState, action)).toEqual(newState);
    };
    // Remove
    hanldeRemovePlayer(fakeId, []);
    // Invalid id
    hanldeRemovePlayer("241-1432", fakePlayerList);
  });

  it("should handle player/update", () => {
    const hanldeUpdatePlayer = (
      oldScore: number,
      delta: number,
      newScore: number
    ): void => {
      const action = {
        type: "player/update",
        payload: {
          id: fakeId,
          delta,
          date: fakeDate,
        },
      };
      const oldState = initializeState([
        { ...fakePlayerList[0], score: oldScore },
      ]);
      const newState = {
        ...oldState,
        playerList: [{ ...oldState.playerList[0], score: newScore }],
      };
      expect(player(oldState, action)).toEqual(newState);
    };
    // Increase
    hanldeUpdatePlayer(23, 1, 24);
    // Descrease
    hanldeUpdatePlayer(23, -1, 22);
    // Max value 9999
    hanldeUpdatePlayer(9999, 1, 9999);
    // Min value 0
    hanldeUpdatePlayer(0, -1, 0);
  });

  it("should handle player/select", () => {
    const handleSelectPlayer = (
      inputId: string,
      isSelectedOld: boolean,
      isSelectedNew: boolean
    ): void => {
      const action = {
        type: "player/select",
        payload: {
          id: inputId,
        },
      };
      const oldState = initializeState([
        { ...fakePlayerList[0], isSelected: isSelectedOld },
      ]);
      const newState = initializeState([
        { ...fakePlayerList[0], isSelected: isSelectedNew },
      ]);
      expect(player(oldState, action)).toEqual(newState);
    };
    // Input id, isSelected should change from false to true
    handleSelectPlayer(fakeId, false, true);
    // If selected, unselect
    handleSelectPlayer(fakeId, true, false);
    // Input invalid id, no actions
    handleSelectPlayer("241-1432", false, false);
  });
});
