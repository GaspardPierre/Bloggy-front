import { renderHook } from "@testing-library/react-hooks";
import { useSelector } from "react-redux";
import useCardFilter from "./useCardFilter";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

const mockCards = [
  { id: 1, type: "A" },
  { id: 2, type: "B" },
  { id: 3, type: "A" },
];

describe("useCardFilter", () => {
  beforeEach(() => {
    useSelector.mockImplementation(() => mockCards);
  });

  afterEach(() => {
    useSelector.mockClear();
  });

  it("should filter cards by type", () => {
    const { result } = renderHook(() => useCardFilter(mockCards, "A"));

    expect(result.current).toEqual([
      { id: 1, type: "A" },
      { id: 3, type: "A" },
    ]);
  });

  it("should return an empty array when there are no matching cards", () => {
    const { result } = renderHook(() => useCardFilter(mockCards, "C"));

    expect(result.current).toEqual([]);
  });
});
